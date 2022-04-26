<template>
  <board-cell-card title="告警类别雷达图">
    <div id="alarm-radar-chart"></div>
  </board-cell-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { ECharts, EChartsOption } from 'echarts'
import AlarmCategoryRaiseCountModel from './alarm-category-raise-count.model'

import { BoardCellCard } from '@/components'
import { apiGetAlarmCategoryRaiseCount } from '@/apis'

@Component({
  components: {
    BoardCellCard
  }
})
export default class AlarmRadarPanel extends Vue {
  @Prop() private query!: any

  @Watch('query')
  async watchQuery(value: any) {
    if (typeof value === 'undefined') {
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

  get radarIndicator() {
    return this.list.map((item) => ({
      text: item.alarmCategory
    }))
  }

  get raiseCount() {
    return this.list.map((item) => item.raiseCount)
  }

  get targetRaiseCount() {
    return this.list.map((item) => item.targetRaiseCount)
  }

  myChart!: ECharts

  chartContainer!: HTMLElement

  list: AlarmCategoryRaiseCountModel[] = []

  state = {
    query: {
      deviceId: 'PS-NIO-0233523a-655945c2',
      startTime: 1631030400000,
      endTime: 1631894400000
    }
  }

  async mounted() {
    this.chartContainer = document.getElementById(
      'alarm-radar-chart'
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
    return apiGetAlarmCategoryRaiseCount(this.state.query).then((res) => {
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
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'line',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      color: ['#2C73FF', '#FF6D1D'],
      legend: {
        orient: 'vertical',
        right: 0,
        bottom: 0,
        data: [
          {
            name: '目标次数',
            icon: 'circle'
          },
          {
            name: '实际次数',
            icon: 'circle'
          }
        ]
      },
      radar: [
        {
          indicator: [...this.radarIndicator],
          center: ['50%', '50%'],
          axisName: {
            color: '#4B525F',
            padding: 0
          },
          splitNumber: 5,
          splitArea: {
            areaStyle: {
              color: ['#FFFFFF', '#2C73FF0D']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#E8EEF2'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#E8EEF2'
            }
          }
        }
      ],
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [...this.raiseCount],
              name: '实际次数',
              label: {
                show: true,
                formatter: (params: any) => params.value
              }
            },
            {
              value: [...this.targetRaiseCount],
              name: '目标次数',
              label: {
                show: true
              },
              areaStyle: {
                color: new this.$echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                  {
                    color: '#FF6D1D00',
                    offset: 0
                  },
                  {
                    color: '#FF6D1D66',
                    offset: 1
                  }
                ])
              }
            }
          ]
        }
      ]
    }
    this.myChart.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
#alarm-radar-chart {
  height: 100%;
  width: 100%;
}
</style>
