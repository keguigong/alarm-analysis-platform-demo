<template>
  <board-cell-card class="alarm-count-panel" title="告警次数及原因统计">
    <div class="alarm-count-panel-content">
      <alarm-count-list class="alarm-count-list" :list="state.list" />
      <list-bottom :value="pagination" @change="handlePageChange" />
    </div>
  </board-cell-card>
</template>

<script lang="ts">
import { apiGetAlarmRaiseCount } from '@/apis'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import AlarmCountModel from '../alarm-count.model'

import { BoardCellCard, ListBottom } from '@/components'
import AlarmCountList from './alarm-count-list.vue'

@Component({
  components: {
    BoardCellCard,
    ListBottom,
    AlarmCountList
  }
})
export default class AlarmCountPanel extends Vue {
  @Prop() private query!: any

  @Watch('query')
  async watchQuery(value: any) {
    if (typeof value === 'undefined') {
      this.resetList()
      return
    }
    this.state.query = {
      ...this.state.query,
      ...value,
      pageNo: 1
    }
    await this.updateList()
  }

  state = {
    list: [] as AlarmCountModel[],
    totalResults: 0,
    query: {
      deviceId: '',
      startTime: 0,
      endTime: 0,
      pageNo: 1,
      pageSize: 10,
      sortBy: ''
    }
  }

  get pagination() {
    const {
      totalResults,
      query: { pageNo, pageSize }
    } = this.state
    return {
      totalResults,
      pageNo,
      pageSize
    }
  }

  async mounted() {
    if (this.query) {
      this.state.query = {
        ...this.state.query,
        ...this.query
      }
    } else return
    await this.updateList()
  }

  async updateList() {
    return apiGetAlarmRaiseCount(this.state.query).then((res) => {
      if (!res) return
      if (!Array.isArray(res.list)) {
        this.resetList()
        return
      }
      this.state.totalResults = res.totalResults
      this.state.list = res.list
    })
  }

  async handlePageChange(value: any) {
    let { pageNo, pageSize } = value
    console.log(value)
    this.state.query = {
      ...this.state.query,
      pageNo,
      pageSize
    }
    await this.updateList()
  }

  resetList() {
    this.state.totalResults = 0
    this.state.list = []
  }
}
</script>

<style lang="scss" scoped>
.alarm-count-panel {
  .alarm-count-panel-content {
    height: 100%;
    display: flex;
    flex-direction: column;

    .alarm-count-list {
      flex: 1;
      min-height: 0;
    }
  }
}
</style>
