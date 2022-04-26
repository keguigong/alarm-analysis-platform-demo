<template>
  <div class="score-list">
    <list-card
      v-for="(score, index) in list"
      :key="index"
      :active="state.activeIndex === index"
      class="score-item"
      @click.native="handleSelect(score, index)"
    >
      <template>
        <div class="score-item_index">{{ index + 1 + startIndex }}</div>
        <div class="score-column score-column--title">
          <p class="score-label score-label--title">{{ score.deviceName }}</p>
          <p class="score-value score-value--title">{{ score.deviceId }}</p>
        </div>
        <div class="score-column">
          <p class="score-label">总</p>
          <p class="score-value">
            {{ score.overallScore | formatScore }}
            <span class="score-unit">%</span>
          </p>
        </div>
        <div class="score-column">
          <p class="score-label">机械</p>
          <p class="score-value">
            {{ score.mechanicalScore | formatScore }}
            <span class="score-unit">%</span>
          </p>
        </div>
        <div class="score-column">
          <p class="score-label">加解锁</p>
          <p class="score-value">
            {{ score.bayboltScore | formatScore }}
            <span class="score-unit">%</span>
          </p>
        </div>
      </template>
    </list-card>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import ScoreModel from '../score.mode'

import { ListCard } from '@/components'

@Component({
  components: {
    ListCard
  },
  filters: {
    formatScore: (value: number) => (value * 100).toPrecision(3)
  }
})
export default class ScoreItem extends Vue {
  @Prop({
    default: () => [
      {
        deviceId: 'PS-NIO-ffa62be5-0994b37a',
        deviceName: '蔚来换电站 烟台红星美凯龙建材商场',
        overallScore: 98.7,
        mechanicalScore: 97.6,
        bayboltScore: 99.8
      },
      {
        deviceId: 'PS-NIO-ffa62be5-0994b37a',
        deviceName: '蔚来换电站 烟台红星美凯龙建材商场',
        overallScore: 98.7,
        mechanicalScore: 97.6,
        bayboltScore: 99.8
      }
    ]
  })
  private list!: ScoreModel[]

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
  handleSelect(value: ScoreModel, index: number) {
    this.state.activeIndex = index
    return value
  }

  mounted() {
    if (typeof this.activeIndex !== undefined) {
      this.state.activeIndex = this.activeIndex
    }
  }
}
</script>

<style lang="scss" scoped>
$color-border: var(--wel-border-color);
$color-primary: var(--wel-color-primary);
$color-text-secondary: var(--wel-text-secondary-color);

.score-list {
  overflow-y: auto;
}

.score-item {
  display: flex;
  align-items: center;
  padding: 10px;

  .score-item_index {
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    border: 1px solid $color-primary;
    border-radius: 8px;
    color: $color-primary;
  }

  .score-column {
    text-align: center;
    width: 40px;
    padding: 0 2px;

    .score-label,
    .score-value {
      font-size: 1rem;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .score-label {
      color: $color-text-secondary;

      &.score-label--title {
        font-weight: 500;
        font-size: 1.2rem;
        color: inherit;
      }
    }

    .score-value {
      margin-top: 6px;
      font-size: 1.2rem;

      &.score-value--title {
        font-size: 1rem;
      }
    }

    .score-unit {
      position: relative;
      margin-left: -3px;
      font-size: 10px;
    }

    &.score-column--title {
      flex: 1;
      text-align: left;
      padding: 0 10px;
    }
  }
}
</style>
