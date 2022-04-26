<template>
  <div
    ref="simple-select"
    :class="['select', state.isFocused ? 'is-focus' : '']"
    v-click-outside="handleBlur"
  >
    <template>
      <input
        class="select-input"
        type="text"
        v-if="!isMultiple"
        readonly
        :value="selectedOptions.label"
        :placeholder="placeholder"
        @click.stop="handleInputClick"
        @focus="handleFocus"
      />
      <input
        class="select-input"
        type="text"
        readonly
        v-else
        :placeholder="isMultiple ? '' : placeholder"
        @click.stop="handleInputClick"
        @focus="handleFocus"
      />
    </template>

    <template v-if="isMultiple && selectedOptions">
      <div class="select-multiple-items" v-if="selectedOptions.length">
        <div class="selected-item">
          {{ selectedOptions[0].label }}
        </div>
        <div class="selected-item" v-if="selectedOptions.length > 1">
          +{{ selectedOptions.length - 1 }}
        </div>
      </div>
    </template>

    <template>
      <div
        class="select-dropdown"
        :style="{ width: dropdownWidth + 'px' }"
        v-if="state.isOpened"
      >
        <div class="option-search dropdown-section" v-if="hasSearch">
          <search-bar
            v-model="state.searchText"
            placeholder="搜索选项"
            @search="handleSearch"
            @change="handleChange"
          />
        </div>

        <!-- 搜索界面 -->
        <template v-if="state.searchText">
          <div class="searching-options">
            <div
              :class="['option', isSelected(item) ? 'option--selected' : '']"
              v-for="(item, index) in searchedOptions"
              :key="index"
              @click.stop="handleOptionClick(item, index)"
            >
              <span>{{ item.label }}</span>
            </div>
          </div>
        </template>

        <!-- 正常显示界面 -->
        <template v-else>
          <!-- 已选择 -->
          <div class="selected-options dropdown-section" v-if="isMultiple">
            <p class="section-title">已选择</p>
            <div
              class="option option--selected"
              v-for="(item, index) in selectedOptions"
              :key="index"
              @click.stop="handleOptionClick(item, index)"
            >
              <span>{{ item.label }}</span>
            </div>
          </div>
          <!-- 所有选项 -->
          <div class="unselected-options dropdown-section">
            <p class="section-title">所有选项</p>
            <div
              :class="['option', isSelected(item) ? 'option--selected' : '']"
              v-for="(item, index) in options"
              :key="index"
              @click.stop="handleOptionClick(item, index)"
            >
              <span>{{ item.label }}</span>
            </div>
          </div>
        </template>

        <slot name="dropdown-bottom">
          <div class="dropdown-section">
            <p class="section-title">共{{ searchedOptions.length }}条</p>
          </div>
        </slot>

        <div class="dropdown-section confirm-area" v-if="isMultiple">
          <button
            :disabled="!selectedOptions.length"
            class="button"
            @click="confirmSelect"
          >
            确认
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { directiveUtil } from '@/utils'
import OptionModel from './option.model'
import SearchBar from '@/components/search-bar/index.vue'

@Component({
  name: 'simple-select',
  components: {
    SearchBar
  },
  directives: {
    'click-outside': directiveUtil.clickOutside
  }
})
export default class SimpleSelect extends Vue {
  @Prop({ default: '请选择...' }) private placeholder!: string

  @Prop() private value!: string

  @Prop() private disabled!: boolean

  @Prop({ default: false }) private isMultiple!: boolean

  @Prop({ default: true }) private collapseTags!: boolean

  @Prop({
    default: () => [
      {
        label: '选项1',
        value: 'option1'
      },
      {
        label: '选项2',
        value: 'option2'
      }
    ]
  })
  private options!: OptionModel[]

  @Prop({ default: false }) private hasSearch!: boolean

  @Prop({ default: true }) private localMatch!: boolean

  @Prop({ default: () => [] }) private searchOptions!: OptionModel[]

  @Prop({ default: 200 }) private dropdownWidth!: number

  @Prop({ default: false }) private useOption!: boolean

  @Watch('value')
  watchValue(value: any[] | any) {
    const { isMultiple } = this
    const initValue = value ? value : isMultiple ? [] : ''
    this.selectedValue = isMultiple ? [...initValue] : initValue
  }

  @Watch('selectedValue')
  watchSelectedValue(value: string[] | string) {
    let { isMultiple, options, selectedValue } = this
    if (Array.isArray(options)) {
      if (!isMultiple) {
        let selectedOption = options.find((item) => item.value === value)
        if (typeof selectedOption !== 'undefined') {
          this.selectedOptions = selectedOption
        } else {
          this.selectedOptions = new OptionModel()
        }
      } else {
        if (Array.isArray(value)) {
          selectedValue = selectedValue as string[]
          let tmpselectedOptions: any[] = []
          selectedValue.forEach((item) => {
            let foundOption = options.find((option) => option.value === item)
            if (typeof foundOption === 'undefined') return
            tmpselectedOptions.push(foundOption)
          })
          this.selectedOptions = tmpselectedOptions
        }
      }
    }
  }

  @Watch('options')
  watchOptions() {
    this.watchSelectedValue(this.selectedValue)
  }

  @Emit('input')
  emitInput() {
    const { useOption } = this
    if (useOption) {
      return this.selectedOptions
    } else {
      return this.selectedValue
    }
  }

  @Emit('change')
  emitChange() {
    this.emitInput()
    const { useOption } = this
    if (useOption) {
      return this.selectedOptions
    } else {
      return this.selectedValue
    }
  }

  @Emit('focus')
  handleFocus() {
    const { options } = this
    if (options.length) {
      this.state.isFocused = true
    }
  }

  selectedValue: string[] | string = ''

  selectedOptions: OptionModel[] | OptionModel = new OptionModel()

  get searchedOptions() {
    let {
      localMatch,
      state: { searchText }
    } = this
    if (!searchText) return this.options
    else if (localMatch) {
      return this.options.filter(
        (item) => item.label.match(searchText) || item.value.match(searchText)
      )
    } else {
      return this.searchOptions
    }
  }

  state = {
    isFocused: false,
    isOpened: false,
    searchText: ''
  }

  beforeMount() {
    // const simpleSelect = this.$refs['simple-select'] as Element
    // const left = simpleSelect.getBoundingClientRect().left
    // const top = simpleSelect.getBoundingClientRect().bottom
    this.watchValue(this.value)
  }

  isSelected(option: OptionModel) {
    const { isMultiple, selectedValue } = this
    if (isMultiple && Array.isArray(selectedValue)) {
      return selectedValue.find((item) => item === option.value)
    } else {
      return selectedValue === option.value
    }
  }

  handleBlur() {
    this.watchValue(this.value)
    this.state.isOpened = false
    this.state.isFocused = false
    this.state.searchText = ''
  }

  handleInputClick() {
    const {
      options,
      disabled,
      state: { isOpened }
    } = this
    this.state.isOpened = !disabled && !isOpened
    if (options.length) {
      this.state.isFocused = true
    }
  }

  handleOptionClick(option: OptionModel, index: number) {
    let { isSelected, isMultiple } = this
    if (!isMultiple) {
      this.selectedValue = option.value
      this.confirmSelect()
    } else {
      this.selectedValue = this.selectedValue as string[]
      if (isSelected(option)) {
        this.selectedValue = this.selectedValue.filter(
          (item) => item !== option.value
        )
      } else {
        this.selectedValue.push(option.value)
      }
    }
  }

  confirmSelect() {
    this.state.isOpened = false
    this.state.isFocused = false
    this.state.searchText = ''
    this.emitChange()
  }

  handleChange(value: string) {
    this.state.searchText = value
  }

  @Emit('search')
  handleSearch() {}
}
</script>
