<template>
  <content-view>
    <select-input
      v-model="state.select"
      @search="handleSearch"
      :options="list"
      :searchOptions="searchList"
      :hasSearch="true"
    />
  </content-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  ContentView,
  Pagination,
  SimpleDatepicker,
  SelectInput
} from '@/components'
import { dateUtil } from '@/utils'
import { apiGetFttScore } from '@/apis'

@Component({
  components: {
    ContentView,
    Pagination,
    SimpleDatepicker,
    SelectInput
  }
})
export default class TestView extends Vue {
  state = {
    startOfWeek: 0,
    week: undefined as any | undefined,
    totalResults: 0,
    select: [],
    query: {
      startTime: undefined as number | undefined,
      endTime: undefined as number | undefined,
      pageNo: 1,
      pageSize: 100,
      sortBy: '',
      match: ''
    }
  }

  list: any[] = []

  searchList: any[] = []

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
  }

  async updateList() {
    return apiGetFttScore(this.state.query).then((res) => {
      if (!res) return
      this.state.totalResults = res.totalResults
      if (!Array.isArray(res.list)) {
        this.list = []
        return
      }
      this.list = res.list.map((item: any) => ({
        label: item.deviceName,
        value: item.deviceId
      }))
    })
  }

  handleSearch(value: any) {
    this.state.query.match = value
    if (!value) return
    apiGetFttScore(this.state.query).then((res) => {
      if (!res) return
      if (!Array.isArray(res.list)) {
        this.searchList = []
        return
      }
      this.searchList = res.list.map((item: any) => ({
        label: item.deviceName,
        value: item.deviceId
      }))
    })
  }
}
</script>
