<template>
  <board-cell-card class="alarm-panel" :hasAction="true" title="故障原因及统计">
    <template #header-right>
      <simple-datepicker
        :value="dateValue"
        isRange="true"
        :startOfWeek="6"
        :hasWeekNum="true"
        @change="handleDateChange"
      />
    </template>

    <template #action>
      <div class="action-area">
        <search-bar v-model="state.query.match" @search="handleSearch" />
      </div>
    </template>

    <template>
      <div class="alarm-panel_content">
        <alarm-list
          class="content-list"
          :list="list"
          :activeIndex="state.selectedIndex"
          @select="handleSelect"
        />
        <list-bottom
          @change="handlePageChange"
          :value="pageOptions"
        ></list-bottom>
      </div>
    </template>
  </board-cell-card>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { apiGetDiagnosis } from '@/apis'
import { dateUtil } from '@/utils'
import AlarmDiagnosisModel from '../alarm-diagnosis.model'

import {
  BoardCellCard,
  ListBottom,
  SimpleDatepicker,
  SearchBar
} from '@/components'
import AlarmList from './alarm-list.vue'

@Component({
  components: {
    BoardCellCard,
    ListBottom,
    AlarmList,
    SimpleDatepicker,
    SearchBar
  }
})
export default class AlarmDiagnosisPanel extends Vue {
  @Emit('select')
  handleSelect(value?: AlarmDiagnosisModel) {
    return value
  }

  list: AlarmDiagnosisModel[] = []

  state = {
    totalResults: 0,
    selectedItem: undefined as AlarmDiagnosisModel | undefined,
    selectedIndex: -1,
    query: {
      pageNo: 1,
      pageSize: 10,
      startTime: undefined as number | undefined,
      endTime: undefined as number | undefined,
      match: ''
    }
  }

  get dateValue() {
    const { startTime, endTime } = this.state.query
    return [new Date(startTime as number), new Date(endTime as number)]
  }

  get pageOptions() {
    let {
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
    // 选择最近一周
    const lastWeek = dateUtil.getLatestWeekUntilEndOfToday()
    this.state.query.startTime = lastWeek[0]
    this.state.query.endTime = lastWeek[1]

    await this.updateList()
    this.selectFistItem()
  }

  selectFistItem() {
    if (this.list.length) {
      this.state.selectedItem = this.list[0]
      this.state.selectedIndex = 0
    } else {
      this.state.selectedItem = undefined
      this.state.selectedIndex = -1
    }
    this.handleSelect(this.state.selectedItem)
  }

  async handleDateChange(dates: Date[]) {
    this.state.query.startTime = dates[0].getTime()
    this.state.query.endTime = dates[1].getTime()
    this.state.query.pageNo = 1
    await this.updateList()
    this.selectFistItem()
  }

  async handleSearch() {
    this.state.query.pageNo = 1
    await this.updateList()
    this.selectFistItem()
  }

  async handlePageChange(value: any) {
    let { pageNo, pageSize } = value
    this.state.query = {
      ...this.state.query,
      pageNo,
      pageSize
    }
    await this.updateList()
    this.selectFistItem()
    return value
  }

  async updateList() {
    return apiGetDiagnosis(this.state.query).then((res) => {
      if (!res) return
      this.state.totalResults = res.totalResults
      if (!Array.isArray(res.list)) {
        this.list = []
        return
      }
      this.list = res.list
    })
  }
}
</script>

<style lang="scss" scoped>
$backgroundColor: var(--wel-background-color);

.alarm-panel {
  .alarm-panel_content {
    height: 100%;
    display: flex;
    flex-direction: column;

    .content-list {
      flex: 1;
    }
  }

  .action-area {
    background-color: $backgroundColor;
    padding: 10px;
  }
}
</style>
