<template>
  <board-cell-card class="chart-container" title="高速录波">
    <template #header-right>
      <div class="chart-filter-container" v-if="state.plcOptions.length">
        <select-input
          class="chart-filter plc-type-select"
          :options="state.typeOptions"
          v-model="state.selectedType"
          @change="handleTypeChange"
        />
        <select-input
          class="chart-filter plc-select"
          :options="plcOptions"
          :isMultiple="true"
          :hasSearch="true"
          v-model="state.selectedPlcs"
          @change="handlePlcChange"
        />
      </div>
    </template>
    <div id="high-speed-record-chart"></div>
  </board-cell-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { apiGetHighSpeedPlcOptions, apiGetHightSpeedRecord } from '@/apis'
import { ECharts } from 'echarts'
import RecordModel from '../record.model'

import { SelectInput } from '@/components'
import { BoardCellCard } from '@/components'
import { formatLocaleDate } from '@/utils'

@Component({
  components: {
    BoardCellCard,
    SelectInput
  }
})
export default class HighSpeedRecordPanel extends Vue {
  @Prop() private params!: any

  @Watch('params')
  async watchParams(value: any) {
    if (typeof value === 'undefined') {
      this.resetList()
      return
    }
    let { query, ...rest } = value
    this.state.query = {
      ...this.state.query,
      ...query
    }
    this.state = {
      ...this.state,
      ...rest
    }
    await this.updateAndRedraw()
  }

  myChart!: ECharts

  chartContainer!: HTMLElement

  list: RecordModel[] = []

  state = {
    alarmRaiseTime: 0,
    query: {
      deviceId: 'PS-NIO-00c90a44-1585490a',
      serviceStartTime: 1638176839193,
      serviceStopTime: 1638176848793,
      plcId: 'gun1,gun2,gun3',
      type: 'torque'
    },
    typeOptions: [
      {
        label: '扭矩',
        value: 'torque'
      },
      {
        label: '位置',
        value: 'position'
      },
      {
        label: '速度',
        value: 'speed'
      }
    ],
    selectedType: 'torque',
    plcOptions: [] as any[],
    selectedPlcs: ['leftdoor18', 'rightdoor19'] as string[]
  }

  get markLine() {
    return {
      type: 'line',
      markLine: {
        symbol: 'none',
        data: [
          {
            name: '告警产生时间',
            xAxis: this.state.alarmRaiseTime,
            label: {
              formatter: (option: any) => formatLocaleDate(option.value)
            },
            lineStyle: {
              color: '#FF9C86'
            }
          }
        ]
      }
    }
  }

  get series() {
    let { selectedPlcs, selectedType } = this.state
    return selectedPlcs.map((plcId) => {
      let plcName = plcId + '_' + selectedType
      const data = this.list.map((item) => [item.timestamp, item[plcName] || 0])
      return {
        name: this.plcNameMap.get(plcName) || plcId,
        type: 'line',
        symbol: 'none',
        step: 'end',
        emphasis: {
          focus: 'series'
        },
        lineStyle: {
          width: 1
        },
        data
      }
    })
  }

  get plcOptions() {
    return this.state.plcOptions.map((item) => ({
      label: item.plcDescription,
      value: item.plcId
    }))
  }

  get plcNameMap() {
    let map = new Map()
    let { typeOptions } = this.state
    typeOptions.forEach((type) => {
      this.plcOptions.forEach((plc) => {
        let plcId = plc.value + '_' + type.value
        let label = plc.label + type.label
        map.set(plcId, label)
      })
    })
    return map
  }

  async mounted() {
    this.chartContainer = document.getElementById(
      'high-speed-record-chart'
    ) as HTMLElement
    this.myChart = this.$echarts.init(this.chartContainer)
    await this.updatePlcOptions()

    if (this.params) {
      let { query, ...rest } = this.params
      this.state.query = {
        ...this.state.query,
        ...query
      }
      this.state = {
        ...this.state,
        ...rest
      }
    } else return
    await this.updateAndRedraw()
  }

  async updateList() {
    return apiGetHightSpeedRecord(this.state.query).then((res) => {
      if (!res) return
      if (!Array.isArray(res.list)) {
        this.resetList()
        return
      }
      this.list = res.list
    })
  }

  resetList() {
    this.list = []
  }

  async updatePlcOptions() {
    return apiGetHighSpeedPlcOptions().then((res) => {
      if (!res) return
      if (!Array.isArray(res.list)) {
        this.state.plcOptions = []
        return
      }
      this.state.plcOptions = res.list
    })
  }

  async updateAndRedraw() {
    let {
      selectedType: type,
      selectedPlcs,
      query: { deviceId, serviceStartTime, serviceStopTime }
    } = this.state
    this.state.query = {
      deviceId,
      serviceStartTime,
      serviceStopTime,
      type,
      plcId: selectedPlcs.join(',')
    }
    await this.updateList()
    this.drawChart()
  }

  handleTypeChange() {
    this.updateAndRedraw()
  }

  handlePlcChange() {
    this.updateAndRedraw()
  }

  drawChart() {
    if (this.list.length < 1) {
      this.myChart.clear()
      return
    }
    let option = {
      color: [
        '#FF6D1D',
        '#2C73FF',
        '#91A2BC',
        '#F4C404',
        '#00C7D9',
        '#001540',
        '#70CC14',
        '#2C2CCC',
        '#AA00FF',
        '#FF5F85'
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          }
        }
      },
      dataZoom: [
        {
          type: 'inside',
          realtime: true
        }
      ],
      grid: {
        top: '20',
        left: 0,
        right: '5%',
        bottom: 0,
        containLabel: true
      },
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        min: (value: any) => value.min,
        max: (value: any) => value.max,
        splitLine: {
          lineStyle: {
            color: '#E8EEF2'
          }
        }
      },
      series: [this.markLine, ...this.series]
    }
    this.myChart.setOption(option, true)
  }
}
</script>

<style lang="scss" scoped>
#high-speed-record-chart {
  height: 100%;
  width: 100%;
}

.chart-container {
  .chart-filter-container {
    display: flex;
  }

  .chart-filter {
    flex: 1;
    margin-left: 10px;

    &.plc-select {
      flex: 2;
    }
  }
}
</style>
