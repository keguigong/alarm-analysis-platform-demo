<template>
  <content-view flex="true" class="diagnosis-page">
    <page-header title="故障诊断及LOG解析">
      <template #right>
        <!-- <search-bar /> -->
      </template>
    </page-header>
    <div class="page-content">
      <div class="left-column">
        <alarm-list-panel
          class="alarm-list-panel"
          @select="handleAlarmSelect"
        />
      </div>
      <panel-seperator />
      <div class="right-column">
        <manual-diagnosis-panel
          class="panel manual-diagnosis-panel"
          :query="manualDiagnosisQuery"
        />
        <panel-seperator />
        <sensor-record-panel
          class="panel sensor-record-panel"
          :params="sensorParams"
        />
        <panel-seperator />
        <high-speed-record-panel
          class="panel hight-speed-record-panel"
          :params="highSpeedParams"
        />
      </div>
    </div>
  </content-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PageHeader, BoardCellCard, PanelSeperator } from '@/components'
import { ContentView, SearchBar } from '@/components'
import AlarmDiagnosisModel from './alarm-diagnosis.model'

import AlarmListPanel from './alarm-list-panel/index.vue'
import ManualDiagnosisPanel from './manual-diagnosis-panel/index.vue'
import SensorRecordPanel from './sensor-record-panel/index.vue'
import HighSpeedRecordPanel from './high-speed-record-panel/index.vue'

@Component({
  components: {
    PageHeader,
    ContentView,
    BoardCellCard,
    PanelSeperator,
    SearchBar,
    AlarmListPanel,
    ManualDiagnosisPanel,
    SensorRecordPanel,
    HighSpeedRecordPanel
  }
})
export default class DiagnosisPage extends Vue {
  state = {
    selectedAlarm: undefined as AlarmDiagnosisModel | undefined
  }

  get manualDiagnosisQuery() {
    let { selectedAlarm } = this.state
    if (typeof selectedAlarm !== 'undefined') {
      let {
        deviceId,
        alarmTypeId,
        alarmDescription,
        alarmRaiseTime,
        manualDiagonosis,
        automaticDiagnosis
      } = selectedAlarm
      return {
        deviceId,
        alarmTypeId,
        alarmDescription,
        alarmRaiseTime,
        manualDiagonosis,
        automaticDiagnosis
      }
    }
    return undefined
  }

  get sensorParams() {
    let { selectedAlarm } = this.state
    if (typeof selectedAlarm !== 'undefined') {
      let { deviceId, alarmTypeId, alarmRaiseTime, alarmId } = selectedAlarm
      return {
        query: {
          deviceId,
          alarmId,
          alarmRaiseTime
        },
        alarmTypeId
      }
    }
    return undefined
  }

  get highSpeedParams() {
    let { selectedAlarm } = this.state
    if (typeof selectedAlarm !== 'undefined') {
      let { deviceId, serviceStartTime, serviceEndTime, alarmRaiseTime } =
        selectedAlarm
      return {
        query: {
          deviceId,
          serviceStartTime,
          serviceStopTime: serviceEndTime
        },
        alarmRaiseTime
      }
    }
    return undefined
  }

  handleAlarmSelect(value?: AlarmDiagnosisModel) {
    this.state.selectedAlarm = value
  }
}
</script>

<style lang="scss" scoped>
$color-background: var(--wel-background-color);

.diagnosis-page {
  background-color: $color-background;
}

.page-content {
  flex: 1;
  display: flex;
  min-height: 0;

  .panel {
    flex: 1;
  }

  .left-column {
    flex: 2;
  }

  .right-column {
    flex: 1;
    display: flex;
    flex-direction: column;

    .hight-speed-record-panel,
    .sensor-record-panel {
      flex: 2;
    }
  }

  .alarm-list-panel {
    height: 100%;
    width: 100%;
  }
}
</style>
