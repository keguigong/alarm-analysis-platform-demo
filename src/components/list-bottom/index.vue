<template>
  <div class="list-bottom">
    <p class="list-bottom_total">
      <template v-if="!hideTotal">
        <slot name="left" v-bind="{ totalResults: state.totalResults }">
          <span>共{{ state.totalResults }}条</span>
        </slot>
      </template>
    </p>
    <pagination
      v-if="!hidePagination"
      v-model="state"
      @change="handlePageChange"
    />
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import Pagination from '../pagination/index.vue'

@Component({
  name: 'list-bottom',
  components: {
    Pagination
  }
})
export default class ListBottom extends Vue {
  @Prop() private totalResults!: number

  @Prop() private pageNo!: number

  @Prop() private pageSize!: number

  @Prop() private value!: {
    pageNo: number
    pageSize: number
    totalResults: number
  }

  @Prop() private hidePagination!: boolean

  @Prop({ default: true }) private hideTotal!: boolean

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
  handlePageChange() {
    this.emitInput()
    let { pageNo, pageSize, totalResults } = this.state
    return { pageNo, pageSize, totalResults }
  }

  mounted() {
    if (this.value) {
      this.watchValue(this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
$color-secondary: var(--wel-text-secondary-color);

.list-bottom {
  padding: 0.5em 1em 0 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .list-bottom_total {
    color: $color-secondary;
    margin: 0;
  }
}
</style>
