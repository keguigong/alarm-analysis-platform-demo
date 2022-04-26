<template>
  <div class="alarm-list">
    <list-card
      v-for="(item, index) in list"
      :key="index"
      :active="state.activeIndex === index"
      class="alarm-item"
      @click.native="handleSelect(item, index)"
    >
      <template>
        <!-- <div class="alarm-item_index">{{ index + 1 + startIndex }}</div> -->
        <div class="alarm-column alarm-column--title">
          <p class="alarm-label alarm-raise-time">
            {{ item.alarmRaiseTime | formatLocaleDate }}
          </p>
          <p class="alarm-label alarm-label--title">
            {{ item.alarmDescription }}
          </p>
          <p class="alarm-value alarm-value--title">
            {{ item.deviceName }} {{ item.deviceId }}
          </p>
        </div>
        <div class="alarm-column">
          <p class="alarm-label">机器识别结果</p>
          <p class="alarm-value">{{ item.automaticDiagnosis || '-' }}</p>
        </div>
        <div class="alarm-column">
          <p class="alarm-label">人工识别结果</p>
          <p class="alarm-value">{{ item.manualDiagnosis || '-' }}</p>
        </div>
      </template>
    </list-card>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import { formatLocaleDate } from '@/utils'
import AlarmDiagnosisModel from '../alarm-diagnosis.model'

import { ListCard } from '@/components'

@Component({
  components: {
    ListCard
  },
  filters: {
    formatLocaleDate
  }
})
export default class AlarmList extends Vue {
  @Prop() private list!: AlarmDiagnosisModel[]

  @Prop({ default: 0 }) private startIndex!: number

  @Prop() private activeIndex!: number

  @Watch('list')
  watchList() {
    this.state.activeIndex = this.activeIndex
  }

  @Watch('activeIndex')
  watchActiveIndex(value: number) {
    this.state.activeIndex = value
  }

  state = {
    activeIndex: -1
  }

  @Emit('select')
  handleSelect(value: AlarmDiagnosisModel, index: number) {
    this.handleSelectIndexed(value, index)
    this.state.activeIndex = index
    return value
  }

  @Emit('select-indexed')
  handleSelectIndexed(value: AlarmDiagnosisModel, index: number) {
    return { value, index }
  }

  mounted() {
    if (typeof this.activeIndex !== 'undefined') {
      this.state.activeIndex = this.activeIndex
    }
  }
}
</script>

<style lang="scss" scoped>
$color-border: var(--wel-border-color);
$color-primary: var(--wel-color-primary);
$color-text-secondary: var(--wel-text-secondary-color);

.alarm-list {
  overflow-y: auto;
}

.alarm-item {
  display: flex;
  align-items: center;
  padding: 10px;

  .alarm-item_index {
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    border: 1px solid $color-primary;
    border-radius: 8px;
    color: $color-primary;
  }

  .alarm-column {
    text-align: center;
    width: 160px;
    padding: 0 2px;

    .alarm-label,
    .alarm-value {
      font-size: 1rem;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .alarm-label {
      color: $color-text-secondary;

      &.alarm-label--title {
        font-weight: 500;
        font-size: 1.2rem;
        color: inherit;
      }
    }

    .alarm-raise-time {
      color: $color-primary;
      font-weight: bold;
      margin-bottom: 6px;
    }

    .alarm-value {
      margin-top: 6px;
      font-size: 1.2rem;

      &.alarm-value--title {
        font-size: 1rem;
      }
    }

    &.alarm-column--title {
      flex: 1;
      text-align: left;
      padding: 0 10px;
    }
  }
}
</style>
