<template>
  <div class="simple-datepicker" v-click-outside="handleBlur">
    <template>
      <button class="styled-button" @click="prevWeek" v-if="state.selectedWeek">
        &#60;
      </button>
      <input
        class="datepicker-input"
        :class="{
          'is-focused': state.isFocused
        }"
        type="text"
        readonly
        :value="displayText"
        :placeholder="placeholder"
        @click.stop="handleInputClick"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <button class="styled-button" @click="nextWeek" v-if="state.selectedWeek">
        &#62;
      </button>
    </template>

    <template v-if="state.isOpened">
      <div class="datepicker-dropdown">
        <day-panel
          :value="value"
          :isRange="isRange"
          :startOfWeek="startOfWeek"
          :hasWeekNum="hasWeekNum"
          :weekNum="state.selectedWeek"
          @change="handleDateChange"
          @weekNum="handleWeekChange"
        />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { dateUtil, directiveUtil } from '@/utils'

import DayPanel from './day-panel.vue'

@Component({
  name: 'simple-datepicker',
  components: {
    DayPanel
  },
  directives: {
    'click-outside': directiveUtil.clickOutside
  }
})
export default class SimpleDatepicker extends Vue {
  @Prop({ default: '请选择日期' }) private placeholder!: string

  @Prop() private value!: Date | Date[]

  @Prop() private disabled!: boolean

  @Prop({ default: false }) private isRange!: boolean

  @Prop() private disabledFrom!: Date

  @Prop({ default: false }) private hasConfirm!: boolean

  @Prop({ default: 0 }) private startOfWeek!: number

  @Prop() private weekNum!: { week: number; year: Date }

  @Prop({ default: false }) private hasWeekNum!: boolean

  @Watch('value')
  watchValue(value: Date | Date[]) {
    if (typeof value === 'undefined') return
    this.state.date = value
  }

  @Watch('weekNum')
  watchWeekNum(value: any) {
    if (typeof value === 'undefined') return
    this.state.selectedWeek = value
  }

  @Emit('input')
  emitInput() {
    return this.state.date
  }

  @Emit('change')
  emitChange() {
    this.emitInput()
    if (!this.hasConfirm) {
      this.state.isOpened = false
    }
    return this.state.date
  }

  @Emit('focus')
  handleFocus() {
    this.state.isFocused = true
  }

  @Emit('blur')
  handleBlur() {
    // this.state.isOpened = false
    this.state.isFocused = false
  }

  state = {
    date: undefined as Date | Date[] | undefined,
    isFocused: false,
    isOpened: false,
    selectedWeek: undefined as { week: number; year: Date } | undefined
  }

  get displayText(): string {
    const { date, selectedWeek } = this.state
    if (typeof date === 'undefined') return ''
    if (!selectedWeek) {
      if (Array.isArray(date) && date.length === 2) {
        return (
          dateUtil.formatDateDay(date[0]) +
          ' - ' +
          dateUtil.formatDateDay(date[1])
        )
      } else {
        return dateUtil.formatDateDay(date as Date)
      }
    } else {
      return dateUtil.formatWeekNum(selectedWeek)
    }
  }

  mounted() {
    this.watchValue(this.value)
    this.watchWeekNum(this.weekNum)
  }

  handleInputClick() {
    const {
      disabled,
      state: { isOpened }
    } = this
    this.state.isOpened = !disabled && !isOpened
    this.state.isFocused = !disabled
  }

  handleDateChange(value: Date | Date[]) {
    this.state.date = value
    this.emitChange()
  }

  handleWeekChange(value: any) {
    this.state.selectedWeek = value
  }

  prevWeek() {
    const {
      startOfWeek,
      state: { selectedWeek }
    } = this
    if (typeof selectedWeek === 'undefined') return
    let { week, year } = selectedWeek
    if (week === 1) {
      week = 53
      year = new Date(year.getFullYear() - 1, 0, 1)
    } else {
      week -= 1
    }
    const range = dateUtil.getWeekRange(week, year, startOfWeek)
    if (typeof range === 'undefined') return
    this.state.date = range.map((item) => new Date(item))
    this.state.selectedWeek = { week, year }
    this.emitChange()
  }

  nextWeek() {
    const {
      startOfWeek,
      state: { selectedWeek }
    } = this
    if (typeof selectedWeek === 'undefined') return
    let { week, year } = selectedWeek
    if (week === 53) {
      week = 1
      year = new Date(year.getFullYear() + 1, 0, 1)
    } else {
      week += 1
    }
    const range = dateUtil.getWeekRange(week, year, startOfWeek)
    if (typeof range === 'undefined') return
    this.state.date = range.map((item) => new Date(item))
    this.state.selectedWeek = { week, year }
    this.emitChange()
  }
}
</script>
