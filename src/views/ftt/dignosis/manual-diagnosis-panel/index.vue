<template>
  <board-cell-card title="人工复核">
    <div class="diagnosis-item">
      <p class="alarm-label">告警名称</p>
      <p class="alarm-value">
        {{ state.alarmDescription }}
      </p>
    </div>
    <div class="diagnosis-item">
      <p class="alarm-label">自动诊断</p>
      <p class="alarm-value">
        {{ state.automaticDiagnosis }}
      </p>
    </div>
    <div class="diagnosis-item">
      <p class="alarm-label">人工诊断</p>
      <select-input
        class="diagnosis-select"
        :options="diagnosisOptions"
        v-model="state.selectedDiagnosis"
        @change="handleChange"
      />
      <button class="confirm-button" @click="submit">提交</button>
    </div>
  </board-cell-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { apiGetDiagnosisOptions, apiPostManualDiagnosis } from '@/apis'

import { SelectInput } from '@/components'
import { BoardCellCard } from '@/components'

@Component({
  components: {
    BoardCellCard,
    SelectInput
  }
})
export default class ManualDiagnosisPanel extends Vue {
  @Prop() private query!: any

  @Watch('query')
  async watchQuery(value: any) {
    if (typeof value === 'undefined') {
      this.resetList()
      return
    }
    let {
      automaticDiagnosis,
      manualDiagnosis,
      alarmDescription,
      alarmTypeId,
      deviceId,
      alarmRaiseTime
    } = this.query
    this.state = {
      ...this.state,
      automaticDiagnosis,
      manualDiagnosis,
      alarmDescription
    }
    this.state.query = {
      ...this.state.query,
      deviceId,
      alarmTypeId,
      alarmRaiseTime
    }
    this.state.selectedDiagnosis = ''

    await this.updateList()
  }

  state = {
    automaticDiagnosis: '',
    manualDiagnosis: '',
    alarmDescription: '',
    query: {
      alarmTypeId: 200000,
      alarmRaiseTime: 0,
      deviceId: ''
    },
    diagnosisOptions: [] as any[],
    selectedDiagnosis: ''
  }

  list: any[] = []

  get diagnosisOptions() {
    return this.list.map((item) => ({
      label: item.diagnosisDescription || item.diagnosisId,
      value: item.diagnosisId
    }))
  }

  async mounted() {
    if (this.query) {
      let {
        automaticDiagnosis,
        manualDiagnosis,
        alarmTypeId,
        deviceId,
        alarmRaiseTime
      } = this.query
      this.state = { ...this.state, automaticDiagnosis, manualDiagnosis }
      this.state.query = {
        ...this.state.query,
        deviceId,
        alarmTypeId,
        alarmRaiseTime
      }
    } else return

    await this.updateList()
  }

  async updateList() {
    return apiGetDiagnosisOptions(this.state.query).then((res) => {
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

  async submit() {
    let { selectedDiagnosis: diagnosisId } = this.state
    let diagnosisDescription = ''
    this.diagnosisOptions.forEach((item) => {
      if (item.value === diagnosisId) {
        diagnosisDescription = item.label
        return
      }
    })
    let { alarmRaiseTime, alarmTypeId, deviceId } = this.state.query
    if (!diagnosisId || !diagnosisDescription) {
      console.warn(`invalid value: diagnosisId=${diagnosisId}`)
      return
    }
    return apiPostManualDiagnosis({
      alarmRaiseTime,
      alarmTypeId,
      deviceId,
      diagnosisId,
      diagnosisDescription
    }).then((res) => {})
  }

  handleChange() {
    this.updateList
  }
}
</script>

<style lang="scss" scoped>
$color-primary: var(--wel-color-primary);
$color-text-secondary: var(--wel-text-secondary-color);

.diagnosis-item {
  display: flex;
  align-items: center;
  height: 36px;

  .alarm-label,
  .alarm-value {
    font-size: 1.2rem;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .alarm-label {
    color: $color-text-secondary;
    flex: 80px 0 0;
  }

  .alarm-value {
    flex: 1;
  }
}

.diagnosis-select {
  flex: 1;
  margin-right: 10px;
}

.confirm-button {
  height: 32px;
  font-size: 1.2rem;
  font-family: inherit;
  font-weight: bold;
  color: white;
  background-color: $color-primary;
  border-width: 0;
  text-align: center;
  border-radius: 8px;
  padding: 0 1.5em;
  cursor: pointer;
  min-width: 0;
}
</style>
