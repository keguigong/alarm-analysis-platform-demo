<template>
  <div class="search-bar">
    <input
      class="search-bar-input"
      type="text"
      v-model="searchValue"
      :placeholder="placeholder"
      @keyup.enter="onSearch"
      @focus="emitFocus"
      @blur="emitBlur"
    />
    <!-- <button class="styled-button" @click="onSearch">{{ action }}</button> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'

@Component({
  name: 'search-bar'
})
export default class SearchBar extends Vue {
  @Prop({ default: '输入设备ID/设备名称' }) private placeholder!: string

  @Prop({ default: '搜索' }) private action!: string

  @Prop() private value!: string

  private searchValue = ''

  @Watch('value')
  watchValue(value: string) {
    if (this.searchValue !== value) this.searchValue = value
  }

  @Emit('focus')
  emitFocus() {}

  @Emit('blur')
  emitBlur() {}

  @Emit('search')
  emitSearch(value: string) {
    this.emitInput(value)
    return value
  }

  @Emit('input')
  emitInput(value: string) {
    return value
  }

  onSearch(e: any) {
    this.emitSearch(this.searchValue)
  }

  mounted() {
    this.watchValue(this.value)
  }
}
</script>

<style lang="scss" scoped>
$primaryColor: var(--wel-color-primary);
$placeholderColor: var(--wel-text-placeholder);
$textColor: var(--wel-text-color);
$borderColor: var(--wel-border-color);
$shadowColor: var(--wel-color-shadow);
$backgroundColor: #f1f5fa;
$hoverColor: #e4e9f0;

.search-bar {
  flex: 1;
  // max-width: 500px;
  height: 30px;
  font-size: 12px;
  color: $textColor;
  position: relative;

  .search-bar-input {
    height: 100%;
    width: 100%;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    // padding: 0.5em 98px 0.5em 1em;
    padding: 0.5em 1em;
    outline: none;
    transition: border-color 0.25s ease-in, color 0.25s ease-in,
      box-shadow 0.25s ease-in;
    border: 1px solid $borderColor;
    border-radius: 5px;

    &::placeholder {
      color: $placeholderColor;
    }

    &:hover,
    &:focus {
      border-color: $primaryColor;
      color: $textColor;
      box-shadow: 0 0 15px 0 $shadowColor;
    }
  }

  .styled-button {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    height: calc(100% - 0px * 2);
    font-size: inherit;
    font-family: inherit;
    font-weight: bold;
    color: white;
    text-align: center;
    min-width: 60px;
    border-radius: 5px;
    border: none;
    background-color: transparent;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    cursor: pointer;
    transition: background-color 0.25s ease-in;
    background-color: transparent;
    color: $textColor;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;

    &:not(:hover)::before {
      content: '';
      position: absolute;
      width: 10px;
      height: calc(100% - 0px * 2);
      border-left: 1px solid $borderColor;
      left: 0;
      top: 0;
    }

    &:hover,
    &:active {
      background-color: $primaryColor;
      color: white;
    }
  }
}
</style>
