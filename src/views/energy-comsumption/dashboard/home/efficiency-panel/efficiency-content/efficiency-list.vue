<template>
  <div class="efficiency-list">
    <list-card
      v-for="(item, index) in list"
      :key="index"
      class="efficiency-item"
      @click.native="handleSelect(item, index)"
    >
      <template>
        <div class="item-index">{{ index + 1 }}</div>
        <div class="item-content">
          <p class="content-title">{{ item.deviceName }}</p>
          <div class="content-row">
            <p class="column-label three-column-item">
              <span>能耗效率: </span>
              <span class="column-value efficiency-value">87</span>
              <span class="column-unit efficiency-value">%</span>
            </p>
            <percentage-bar
              :range="[80, 100]"
              :value="87"
              @change="onColorChange"
            />
          </div>
          <div class="content-row">
            <p class="column-label two-column-item">
              <span>用电量: </span>
              <span class="column-value">16203.9</span>
              <span class="column-unit">度</span>
            </p>
            <p class="column-label content-row-item">
              <span>日均单量: </span>
              <span class="column-value">107.8</span>
              <span class="column-unit">单</span>
            </p>
          </div>
        </div>
      </template>
    </list-card>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

import { ListCard, PercentageBar } from '@/components'

@Component({
  components: {
    ListCard,
    PercentageBar
  }
})
export default class EfficiencyList extends Vue {
  @Prop({
    default: () => [
      {
        deviceId: 'XX-XXX-1234567890',
        deviceName: '名称名称名称名称名称名称名称',
        overallScore: 98.7,
        mechanicalScore: 97.6,
        bayboltScore: 99.8
      },
      {
        deviceId: 'XX-XXX-1234567890',
        deviceName: '名称名称名称名称名称名称名称',
        overallScore: 98.7,
        mechanicalScore: 97.6,
        bayboltScore: 99.8
      },
      {
        deviceId: 'XX-XXX-1234567890',
        deviceName: '名称名称名称名称名称名称名称',
        overallScore: 98.7,
        mechanicalScore: 97.6,
        bayboltScore: 99.8
      },
      {
        deviceId: 'XX-XXX-1234567890',
        deviceName: '名称名称名称名称名称名称名称',
        overallScore: 98.7,
        mechanicalScore: 97.6,
        bayboltScore: 99.8
      },
      {
        deviceId: 'XX-XXX-1234567890',
        deviceName: '名称名称名称名称名称名称名称',
        overallScore: 98.7,
        mechanicalScore: 97.6,
        bayboltScore: 99.8
      },
      {
        deviceId: 'XX-XXX-1234567890',
        deviceName: '名称名称名称名称名称名称名称',
        overallScore: 98.7,
        mechanicalScore: 97.6,
        bayboltScore: 99.8
      },
      {
        deviceId: 'XX-XXX-1234567890',
        deviceName: '名称名称名称名称名称名称名称',
        overallScore: 98.7,
        mechanicalScore: 97.6,
        bayboltScore: 99.8
      },
      {
        deviceId: 'XX-XXX-1234567890',
        deviceName: '名称名称名称名称名称名称名称',
        overallScore: 98.7,
        mechanicalScore: 97.6,
        bayboltScore: 99.8
      },
      {
        deviceId: 'XX-XXX-1234567890',
        deviceName: '名称名称名称名称名称名称名称',
        overallScore: 98.7,
        mechanicalScore: 97.6,
        bayboltScore: 99.8
      },
      {
        deviceId: 'XX-XXX-1234567890',
        deviceName: '名称名称名称名称名称名称名称',
        overallScore: 98.7,
        mechanicalScore: 97.6,
        bayboltScore: 99.8
      }
    ]
  })
  private list!: any[]

  @Emit('select')
  handleSelect(value: any, index: number) {
    return value
  }

  onColorChange(color: undefined | string) {
    // console.log(color)
  }
}
</script>

<style lang="scss" scoped>
$color-border: var(--wel-border-color);
$color-primary: var(--wel-color-primary);
$color-text-secondary: var(--wel-text-secondary-color);
$color-text: var(--wel-text-color);

.efficiency-list {
  overflow-y: auto;
}

.efficiency-item {
  display: flex;
  align-items: center;
  padding: 10px;

  .item-index {
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    border: 1px solid $color-primary;
    border-radius: 8px;
    color: $color-primary;
  }

  .content-row {
    display: flex;
    align-items: center;

    &:not(:first-child) {
      margin-top: 5px;
    }

    .three-column-item {
      flex: 90px 0 0;
    }

    .two-column-item {
      flex: 50% 1 1;
    }
  }

  .item-content {
    padding: 0 4px 0 10px;
    font-size: 1rem;
    flex: 1;

    .content-title,
    .column-label,
    .column-value {
      margin: 0;
    }

    .content-title {
      font-size: 1.2rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .column-label {
      font-size: inherit;
      color: $color-text-secondary;
    }

    .column-value {
      color: $color-text;
      font-size: 1.2rem;
    }

    .efficiency-value {
      font-weight: bold;
    }
  }
}
</style>
