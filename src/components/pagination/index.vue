<template>
  <div class="simple-pagination">
    <button
      :disabled="state.pageNo <= 1"
      :class="['page-button', state.pageNo <= 1 ? 'page-button--hidden' : '']"
      class="page-button"
      @click="goPrevious"
    >
      &#60;
    </button>

    <template v-if="totalPages < 8">
      <button
        :class="[
          'page-button',
          i === state.pageNo ? ' page-button--active' : ''
        ]"
        v-for="i in totalPages"
        :key="'aaa' + i"
        @click="goTo(i)"
      >
        {{ i }}
      </button>
    </template>

    <template v-else-if="state.pageNo < 4">
      <button
        :class="[
          'page-button',
          i === state.pageNo ? ' page-button--active' : ''
        ]"
        v-for="i in 5"
        :key="'bbb' + i"
        @click="goTo(i)"
      >
        {{ i }}
      </button>
      <button disabled="true" class="page-button">...</button>
      <button class="page-button" @click="goTo(totalPages)">
        {{ totalPages }}
      </button>
    </template>

    <template v-else-if="state.pageNo > totalPages - 4">
      <button class="page-button" @click="goTo(1)">1</button>
      <button disabled="true" class="page-button">...</button>
      <button
        :class="[
          'page-button',
          i + totalPages - 5 === state.pageNo ? ' page-button--active' : ''
        ]"
        v-for="i in 5"
        :key="'ccc' + i"
        @click="goTo(i + totalPages - 5)"
      >
        {{ i + totalPages - 5 }}
      </button>
    </template>

    <template v-else>
      <button class="page-button" @click="goTo(1)">1</button>
      <button disabled="true" class="page-button">...</button>
      <button class="page-button" @click="goTo(state.pageNo - 1)">
        {{ state.pageNo - 1 }}
      </button>
      <button
        class="page-button page-button--active"
        @click="goTo(state.pageNo)"
      >
        {{ state.pageNo }}
      </button>
      <button class="page-button" @click="goTo(state.pageNo + 1)">
        {{ state.pageNo + 1 }}
      </button>
      <button disabled="true" class="page-button">...</button>
      <button class="page-button" @click="goTo(totalPages)">
        {{ totalPages }}
      </button>
    </template>

    <button
      :disabled="state.pageNo >= totalPages"
      :class="[
        'page-button',
        state.pageNo >= totalPages ? 'page-button--hidden' : ''
      ]"
      @click="goNext"
    >
      &#62;
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'

@Component({
  name: 'pagination'
})
export default class Pagination extends Vue {
  @Prop() private value!: any

  state = {
    pageNo: 1,
    pageSize: 10,
    totalResults: 0
  }

  @Watch('value')
  watchValue(value: any) {
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
        ? Math.floor(totalResults / pageSize)
        : 1
      : Math.floor(totalResults / pageSize) + 1
  }

  mounted() {
    if (this.value) {
      let { pageNo, pageSize, totalResults } = this.value
      this.state = {
        ...this.state,
        pageNo,
        pageSize,
        totalResults
      }
    }
  }

  goPrevious() {
    const { pageNo } = this.state
    if (pageNo > 1) {
      this.state.pageNo -= 1
      this.emitChange()
    }
  }

  goTo(value: number) {
    this.state.pageNo = value
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
$primaryColor: var(--wel-color-primary);
$textColor: var(--wel-text-color);
$secondaryColor: var(--wel-text-secondary-color);
$backgroundColor: var(--wel-background-color);
$hoverColor: #9abcff;

.simple-pagination {
  font-size: 1.4rem;
  color: $secondaryColor;

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
      background-color: $hoverColor;
      color: white;
    }

    &:active:enabled {
      background-color: $primaryColor;
      color: white;
    }

    &:first-child {
      margin-right: 0.05em;
    }

    &:last-child {
      margin-left: 0.05em;
    }

    &:not(:first-child):not(:last-child) {
      margin: 0 0.05em;
    }

    &:disabled {
      cursor: auto;
    }
  }

  .page-button--active {
    background-color: $primaryColor;
    color: white;

    &:hover:enabled {
      background-color: $hoverColor;
    }
  }

  .page-button--hidden {
    // display: none;
    opacity: 0;
  }
}
</style>
