<template>
  <board-cell-card title="设备FTT变化趋势">
    <div id="score-history-chart"></div>
  </board-cell-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { ECharts, EChartsOption } from 'echarts'
import { apiGetFttHistory } from '@/apis'
import ScoreModel from '../score.mode'

import { BoardCellCard } from '@/components'

@Component({
  components: {
    BoardCellCard
  }
})
export default class ScoreHistoryPanel extends Vue {
  @Prop() private query!: any

  @Watch('query')
  async watchQuery(value: any) {
    if (typeof value === undefined) {
      this.resetChart()
      return
    }
    this.state.query = {
      ...this.state.query,
      ...value
    }
    await this.updateList()
    this.drawChart()
  }

  myChart!: ECharts

  chartContainer!: HTMLElement

  list: ScoreModel[] = []

  state = {
    query: {
      deviceId: 'PS-NIO-0233523a-655945c2',
      startTime: 1631030400000,
      endTime: 1631894400000
    }
  }

  get nameMap() {
    let map = new Map([
      ['overallScore', '总'],
      ['mechanicalScore', '机械'],
      ['bayboltScore', '加解锁']
    ])
    return map
  }

  get series() {
    let series: any[] = []
    this.nameMap.forEach((name, key) => {
      const data = this.list.map((item) => [
        item.timestamp,
        ((item[key as keyof ScoreModel] as number) * 100).toPrecision(3)
      ])
      series.push({
        name,
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        data
      })
    })
    return series
  }

  async mounted() {
    this.chartContainer = document.getElementById(
      'score-history-chart'
    ) as HTMLElement
    this.myChart = this.$echarts.init(this.chartContainer)

    if (this.query) {
      this.state.query = {
        ...this.query
      }
    } else return

    await this.updateList()
    this.drawChart()
  }

  async updateList() {
    return apiGetFttHistory(this.state.query).then((res) => {
      if (!res) return
      if (!Array.isArray(res.list)) {
        this.resetChart()
        return
      }
      this.list = res.list
    })
  }

  resetChart() {
    this.list = []
    this.myChart.clear()
  }

  drawChart() {
    if (this.list.length < 1) {
      this.myChart.clear()
      return
    }
    let option: EChartsOption = {
      color: ['#FF6D1D', '#2C73FF', '#91A2BC'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '5%',
        left: 0,
        right: '5%',
        bottom: 0,
        containLabel: true
      },
      xAxis: {
        type: 'time',
        boundaryGap: false,
        interval: 3600
      },
      yAxis: {
        type: 'value',
        min: (value: any) => Math.min(Math.floor(value.min / 5) * 5, 80),
        max: (value: any) => Math.max(value.max, 100),
        splitNumber: 4,
        splitLine: {
          lineStyle: {
            color: '#E8EEF2'
          }
        },
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: [...this.series]
    }
    this.myChart.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
#score-history-chart {
  height: 100%;
  width: 100%;
}
</style>
