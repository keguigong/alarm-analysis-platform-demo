<template>
  <div class="simple-pagination">
    <button
      :disabled="state.pageNo <= 1"
      class="page-button"
      @click="goPrevious"
    >
      &#60;
    </button>
    <button class="page-button page-button--active" @click="goCurrent">
      {{ state.pageNo }}
    </button>
    <button
      :disabled="state.pageNo >= totalPages"
      class="page-button"
      @click="goNext"
    >
      &#62;
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'

@Component({
  name: 'simple-pagination'
})
export default class SimplePagination extends Vue {
  @Prop() private value!: {
    pageNo: number
    pageSize: number
    totalResults: number
  }

  state = {
    pageNo: 1,
    pageSize: 10,
    totalResults: 0
  }

  @Watch('value')
  watchValue(value: {
    pageNo: number
    pageSize: number
    totalResults: number
  }) {
    let { pageNo, pageSize, totalResults } = value
    this.state = {
      ...this.state,
      pageNo,
      pageSize,
      totalResults
    }
  }

  @Emit('input')
  emitInput() {
    let { pageNo, pageSize, totalResults } = this.state
    return { pageNo, pageSize, totalResults }
  }

  @Emit('change')
  emitChange() {
    this.emitInput()
    let { pageNo, pageSize, totalResults } = this.state
    return { pageNo, pageSize, totalResults }
  }

  get totalPages() {
    const { pageSize, totalResults } = this.state
    return totalResults % pageSize === 0
      ? Math.floor(totalResults / pageSize)
      : Math.floor(totalResults / pageSize) + 1
  }

  goPrevious() {
    const { pageNo } = this.state
    if (pageNo > 1) {
      this.state.pageNo -= 1
      this.emitChange()
    }
  }

  goCurrent() {
    this.emitChange()
  }

  goNext() {
    const { pageNo } = this.state
    if (pageNo < this.totalPages) {
      this.state.pageNo += 1
      this.emitChange()
    }
  }
}
</script>

<style lang="scss" scoped>
$color-primary: var(--wel-color-primary);
$color-secondary: var(--wel-text-secondary-color);
$color-text: var(--wel-text-color);
$color-hover: var(--wel-background-color);

.simple-pagination {
  font-size: 1.4rem;
  color: $color-secondary;

  .page-button {
    height: 30px;
    min-width: 30px;
    border-radius: 8px;
    border: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: bold;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
    transition: color 0.25s ease-in, background-color 0.25s ease-in,
      opacity 0.25s ease-in;

    &:hover:enabled {
      background-color: $color-primary;
      color: white;
    }

    &:first-child {
      margin-right: 0.2em;
    }

    &:last-child {
      margin-left: 0.2em;
    }

    &:not(:first-child):not(:last-child) {
      margin: 0 0.2em;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  .page-button--active {
    background-color: $color-primary;
    color: white;

    &:hover:enabled {
      opacity: 0.8;
      background-color: $color-primary;
    }
  }
}
</style>
