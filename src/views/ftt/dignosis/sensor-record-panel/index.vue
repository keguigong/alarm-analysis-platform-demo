<template>
  <board-cell-card title="传感器数据">
    <template #header>
      <tabs
        hideBar="true"
        align="left"
        :list="state.tabList"
        v-model="state.tabIndex"
        @select="handleTabSelect"
      />
    </template>
    <template #header-right>
      <div v-if="sensorOptions.length">
        <select-input
          class="chart-filter sensor-select"
          :options="sensorOptions"
          :hasSearch="true"
          :isMultiple="true"
          v-model="state.selectedSensors"
          @change="handleSensorChange"
        />
      </div>
    </template>

    <div id="sensor-record-chart"></div>
  </board-cell-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import {
  apiGetHighSpeedSensorOptions,
  apiGetHighSpeedSensorRecord,
  apiGetSensorOptions,
  apiGetSensorRecord
} from '@/apis'
import { formatLocaleDate } from '@/utils'
import { ECharts } from 'echarts'
import RecordModel from '../record.model'

import { SelectInput } from '@/components'
import { BoardCellCard, Tabs } from '@/components'

@Component({
  components: {
    BoardCellCard,
    SelectInput,
    Tabs
  }
})
export default class SensorRecordPanel extends Vue {
  @Prop() private params!: any

  @Watch('params')
  async watchParams(value: any) {
    if (typeof value === 'undefined') {
      this.clearChart()
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

    await this.updateAll()
  }

  myChart!: ECharts

  chartContainer!: HTMLElement

  list: RecordModel[] = []

  state = {
    query: {
      alarmRaiseTime: 1634370180011,
      alarmId: 66971822,
      deviceId: 'PS-NIO-7cf4a9a4-05541493',
      sensorId: 'bl_l_lift_safety_sensor'
    },
    alarmTypeId: 300241,
    selectedSensors: [] as string[],
    sensorOptions: [] as any[],
    tabList: [{ name: 'Log解析' }, { name: '原数据' }],
    tabIndex: 0
  }

  get markLine() {
    return {
      type: 'line',
      markLine: {
        symbol: 'none',
        data: [
          {
            name: '告警产生时间',
            xAxis: this.state.query.alarmRaiseTime,
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
    let { selectedSensors } = this.state
    return selectedSensors.map((sensorId) => {
      const data = this.list.map((item) => [item.timestamp, item[sensorId]])
      return {
        name: this.sensorNameMap.get(sensorId) || sensorId,
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

  get sensorOptions() {
    return this.state.sensorOptions.map((item) => ({
      label: item.sensorDescription || item.sensorId,
      value: item.sensorId
    }))
  }

  get sensorNameMap() {
    let map = new Map()
    let { sensorOptions } = this
    sensorOptions.forEach((option) => {
      map.set(option.value, option.label)
    })
    return map
  }

  async mounted() {
    this.chartContainer = document.getElementById(
      'sensor-record-chart'
    ) as HTMLElement
    this.myChart = this.$echarts.init(this.chartContainer)

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
    await this.updateAll()
  }

  async updateAll() {
    await this.updateSensorOptions()
    let {
      sensorOptions,
      state: { tabIndex }
    } = this
    if (this.sensorOptions.length < 1) {
      this.state.selectedSensors = []
    } else if (tabIndex === 0 || !this.state.selectedSensors.length) {
      this.state.selectedSensors = [sensorOptions[0].value.toString()]
    }

    if (this.state.selectedSensors.length) {
      await this.updateAndRedraw()
    }
  }

  async updateList() {
    let { tabIndex } = this.state
    let apiGet =
      tabIndex === 0 ? apiGetSensorRecord : apiGetHighSpeedSensorRecord

    return apiGet(this.state.query).then((res) => {
      if (!res) return
      if (!Array.isArray(res.list)) {
        // this.clearChart()
        let { myChart } = this
        this.list = []
        myChart && myChart.clear()
        return
      }
      this.list = res.list
    })
  }

  async updateSensorOptions() {
    let { alarmTypeId, tabIndex } = this.state
    let apiGet =
      tabIndex === 0 ? apiGetSensorOptions : apiGetHighSpeedSensorOptions

    await apiGet({ alarmTypeId }).then((res) => {
      if (!res) return
      if (!Array.isArray(res.list)) {
        this.clearChart()
        return
      }
      this.state.sensorOptions = res.list
    })

    if (tabIndex === 1) {
      await this.updateRecommendedSensorOptions()
    }
  }

  async updateRecommendedSensorOptions() {
    let { alarmTypeId } = this.state
    return apiGetSensorOptions({ alarmTypeId }).then((res) => {
      if (!res) return
      if (!Array.isArray(res.list)) {
        this.clearChart()
        return
      }
      this.state.selectedSensors = res.list.map((item: any) => item.sensorId)
    })
  }

  async updateAndRedraw() {
    let {
      selectedSensors,
      query: { deviceId, alarmId, alarmRaiseTime }
    } = this.state
    this.state.query = {
      deviceId,
      alarmId,
      alarmRaiseTime,
      sensorId: selectedSensors.join(',')
    }
    await this.updateList()
    this.drawChart()
  }

  async handleSensorChange() {
    await this.updateAndRedraw()
  }

  async handleTabSelect() {
    await this.updateAll()
  }

  clearChart() {
    let { myChart } = this
    this.list = []
    this.state.sensorOptions = []
    myChart && myChart.clear()
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
        min: (value: any) => value.max,
        max: (value: any) => value.min,
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
#sensor-record-chart {
  height: 100%;
  width: 100%;
}

.sensor-select {
  align-self: center;
}

.no-data-hint {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
