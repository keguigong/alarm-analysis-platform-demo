<template>
  <div class="alarm-count-list">
    <div class="alarm-count-item" v-for="(item, index) in list" :key="index">
      <div class="alarm-count">
        <div class="alarm-count-title">
          <p class="alarm-description-text">{{ item.alarmDescription }}</p>
          <p class="alarm-count-text">{{ item.alarmRaiseCount }}次</p>
        </div>
        <div class="alarm-count-progress">
          <div
            class="progress-foreground"
            v-if="maxAlarmRaiseCount"
            :style="{
              width: (item.alarmRaiseCount / maxAlarmRaiseCount) * 100 + '%'
            }"
          ></div>
        </div>
      </div>
      <div class="alarm-diagnosis">
        <div
          class="alarm-diagnosis-item"
          v-for="(item, index) in item.alarmDiagnosis"
          :key="index"
        >
          <span>{{ item.diagnosisDescription }}</span>
          <span class="dignosis-index-text">{{ index + 1 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import AlarmCountModel from '../alarm-count.model'

@Component
export default class AlarmCountList extends Vue {
  @Prop({
    default: () => [
      {
        alarmTypeId: 100001,
        alarmDescription: '电池从平台区运转至缓存位超时',
        alarmRaiseCount: 18,
        alarmDiagnosis: [
          {
            diagnosisId: 111000,
            diagonosisDescription: '到位传感器实际已触发',
            diagnosisCount: 5
          },
          {
            diagnosisId: 111000,
            diagonosisDescription: '告警前25s均无传感器log记录，电池未出平台区',
            diagnosisCount: 5
          },
          {
            diagnosisId: 111000,
            diagonosisDescription: '电池卡在减速到到位之间或者原因异常',
            diagnosisCount: 5
          }
        ]
      },
      {
        alarmTypeId: 100001,
        alarmDescription: '电池从平台区运转至缓存位超时',
        alarmRaiseCount: 13,
        alarmDiagnosis: [
          {
            diagnosisId: 111000,
            diagonosisDescription: '到位传感器实际已触发',
            diagnosisCount: 5
          },
          {
            diagnosisId: 111000,
            diagonosisDescription: '告警前25s均无传感器log记录，电池未出平台区',
            diagnosisCount: 5
          },
          {
            diagnosisId: 111000,
            diagonosisDescription: '电池卡在减速到到位之间或者原因异常',
            diagnosisCount: 5
          }
        ]
      }
    ]
  })
  private list!: AlarmCountModel[]

  get maxAlarmRaiseCount() {
    let max = 0
    this.list.forEach((elem) => {
      max = Math.max(elem.alarmRaiseCount, max)
    })
    return max * 1.05
  }
}
</script>

<style lang="scss" scoped>
$color-border: var(--wel-border-color);
$color-primary: var(--wel-color-primary);
$color-text-secondary: var(--wel-text-secondary-color);
$color-background: var(--wel-background-color);

.alarm-count-list {
  overflow-y: auto;

  .alarm-count-item {
    display: flex;
    padding: 10px 5px;

    &:first-child {
      padding-top: 0;
    }
  }

  .alarm-count {
    flex: 1;
  }

  .alarm-diagnosis {
    flex: 1;
  }

  // 告警产生次数样式
  .alarm-count-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .alarm-description-text,
    .alarm-count-text {
      font-size: 1.2rem;
      margin: 8px 0;
    }

    .alarm-count-text {
      color: $color-text-secondary;
      border: 1px solid $color-border;
      border-radius: 4px;
      padding: 0 4px;
    }
  }

  .alarm-count-progress,
  .progress-foreground {
    height: 6px;
    border-radius: 3px;
    background-color: $color-background;
  }

  .progress-foreground {
    background-color: $color-primary;
    width: 0;
  }

  // 诊断部分样式
  .alarm-diagnosis {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    margin-left: 2%;

    .alarm-diagnosis-item {
      width: 33%;
      position: relative;
      font-size: 1.2rem;
      border: 1px solid $color-border;
      border-radius: 4px;
      display: flex;
      align-items: center;
      padding: 5px 10px 5px 5px;

      &:not(:first-child) {
        margin-left: 5px;
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .dignosis-index-text {
        display: block;
        position: absolute;
        top: 50%;
        right: 0;
        font-size: 4rem;
        transform: translateY(-50%);
        font-weight: bold;
        color: $color-primary;
        opacity: 0.15;
        z-index: 0;
      }
    }
  }
}
</style>
