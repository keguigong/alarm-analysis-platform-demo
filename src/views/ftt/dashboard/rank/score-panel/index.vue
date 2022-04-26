<template>
  <board-cell-card class="score-view" :hasAction="true" title="FTT TOP列表">
    <template #header-right>
      <simple-datepicker
        :value="dateValue"
        isRange="true"
        :hasWeekNum="true"
        :startOfWeek="state.startOfWeek"
        :weekNum="state.week"
        @change="handleDateChange"
      />
    </template>

    <template #action>
      <div class="action-area">
        <search-bar v-model="state.query.match" @search="handleSearch" />
      </div>
    </template>

    <template>
      <div class="score-view_content">
        <score-list
          class="content-list"
          :list="list"
          :startIndex="(pageOptions.pageNo - 1) * pageOptions.pageSize"
          :activeIndex="state.selectedIndex"
          @select="handleSelect"
        />
        <list-bottom @change="handlePageChange" :value="pageOptions" />
      </div>
    </template>
  </board-cell-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { apiGetFttScore } from '@/apis'
import { dateUtil } from '@/utils'
import ScoreModel from '../score.mode'

import {
  BoardCellCard,
  ListBottom,
  SimpleDatepicker,
  SearchBar
} from '@/components'
import ScoreList from './score-list.vue'

@Component({
  components: {
    BoardCellCard,
    ListBottom,
    ScoreList,
    SimpleDatepicker,
    SearchBar
  }
})
export default class ScorePanel extends Vue {
  @Emit('select')
  handleSelect(value?: ScoreModel) {
    let { startTime, endTime } = this.state.query
    return {
      value,
      startTime,
      endTime
    }
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

  list: ScoreModel[] = []

  state = {
    totalResults: 0,
    selectedDevice: undefined as ScoreModel | undefined,
    selectedIndex: -1,
    query: {
      startTime: undefined as number | undefined,
      endTime: undefined as number | undefined,
      pageNo: 1,
      pageSize: 10,
      sortBy: '',
      match: ''
    },
    startOfWeek: 6,
    week: undefined as any | undefined
  }

  get dateValue() {
    const { startTime, endTime } = this.state.query
    return [new Date(startTime as number), new Date(endTime as number)]
  }

  async mounted() {
    // 选择最近的一周
    const { startOfWeek } = this.state
    this.state.week = dateUtil.getLastWeek(new Date(), startOfWeek)
    const { week } = this.state
    const lastWeek = dateUtil.getWeekRange(week.week, week.year, startOfWeek)
    if (typeof lastWeek === 'undefined') return
    this.state.query.startTime = lastWeek[0]
    this.state.query.endTime = lastWeek[1] + 24 * 60 * 60 * 1000 - 1

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

  selectFistItem() {
    if (this.list.length) {
      this.state.selectedDevice = this.list[0]
      this.state.selectedIndex = 0
    } else {
      this.state.selectedDevice = undefined
      this.state.selectedIndex = -1
    }
    this.handleSelect(this.state.selectedDevice)
  }

  async updateList() {
    return apiGetFttScore(this.state.query).then((res) => {
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

.score-view {
  .score-view_content {
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
