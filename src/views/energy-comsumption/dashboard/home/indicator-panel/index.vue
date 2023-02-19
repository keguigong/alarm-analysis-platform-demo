<template>
  <div class="indicator-panel-container">
    <div
      class="indicator-panel"
      v-for="(extactList, i) in groupedList"
      :key="i"
    >
      <div class="indicator" v-for="(item, index) in extactList" :key="index">
        <p class="indicator-title">{{ item.description }}</p>
        <div class="indicator-content">
          <span>
            <b class="value">{{ item.indicator }}</b>
            <span class="unit">{{ item.unit }}</span>
          </span>
          <span v-if="item.avgIndicator">
            <span>
              <b
                class="value"
                :class="{
                  'colored-indicator': state.highlightIndicator.has(
                    item.description
                  )
                }"
                >{{ item.avgIndicator }}</b
              >
              <span
                class="unit avg-indicator"
                :class="{
                  'colored-indicator': state.highlightIndicator.has(
                    item.description
                  )
                }"
                >{{ item.unit }}</span
              >
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { BoardCellCard } from '@/components'

@Component({
  components: {
    BoardCellCard
  }
})
export default class TargetPanel extends Vue {
  @Prop({
    default: () => [
      {
        indicatorId: '',
        description: '名称名称',
        indicator: 500,
        unit: ''
      },
      {
        indicatorId: 'total_service_cnt',
        description: '名称名称',
        indicator: 1078000,
        unit: '单',
        avgIndicator: 2069
      },
      {
        indicatorId: '',
        description: '名称名称',
        indicator: 16203.9,
        unit: '度',
        avgIndicator: 11.9
      },
      {
        indicatorId: '',
        description: '名称名称',
        indicator: 343.8,
        unit: '度',
        avgIndicator: 0.66
      },
      {
        indicatorId: '',
        description: '名称名称',
        indicator: 1.225,
        unit: '',
        avgIndicator: 1.225
      },
      {
        indicatorId: '',
        description: '名称名称',
        indicator: 81.62,
        unit: '%',
        avgIndicator: 81.3
      },
      {
        indicatorId: '',
        description: '名称名称',
        indicator: 5.54,
        unit: '%',
        avgIndicator: 5.54
      },
      {
        indicatorId: '',
        description: '名称名称',
        indicator: 90.57,
        unit: '%',
        avgIndicator: 89.92
      },
      {
        indicatorId: '',
        description: '名称名称',
        indicator: 96.59,
        unit: '%',
        avgIndicator: 89.92
      },
      {
        indicatorId: '',
        description: '名称名称',
        indicator: 100,
        unit: '%',
        avgIndicator: 100
      }
    ]
  })
  private list!: any[]

  @Watch('list')
  watchList(value: any) {
    this.groupList()
  }

  state = {
    highlightIndicator: new Set(['名称名称', '名称名称'])
  }

  groupedList: any[][] = []

  mounted() {
    this.groupList()
  }

  groupList() {
    let groupedList: any[][] = []
    let startIndex = 0
    let groupLen = 5
    let groupCount =
      Math.floor(this.list.length / groupLen) +
      (this.list.length % groupLen === 0 ? 0 : 1)
    // console.log(groupCount)
    for (let i = 0; i < groupCount; i++) {
      let group = this.list.slice(startIndex, startIndex + groupLen)
      groupedList.push(group)
      startIndex += groupLen
    }
    this.groupedList = groupedList
  }
}
</script>

<style lang="scss" scoped>
$borderColor: var(--wel-border-color);
$primaryColor: var(--wel-color-primary);
$backgroundColor: var(--wel-background-color);
$textSecondaryColor: var(--wel-text-secondary-color);
$secondColor: #00646a;

.indicator-panel-container {
  pointer-events: all;
  overflow-x: auto;
  margin-right: 20px;
}

.indicator-panel {
  display: flex;
  flex-wrap: nowrap;

  &:not(:first-child) {
    margin-top: 10px;
  }

  .indicator {
    padding: 5px 10px;
    background-color: white;
    border: 1px solid $borderColor;
    border-radius: 12px;
    flex: calc((100% - 10px * 5) / 5) 1 1;
    min-width: 150px;
    font-size: 13px;
    white-space: nowrap;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 10px;
    }

    .indicator-title {
      font-size: inherit;
      color: $textSecondaryColor;
      line-height: 14px;
      margin: 0;
      margin: 5px 0;
    }

    .indicator-content {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    .unit {
      font-size: 10px;
    }

    .colored-indicator {
      color: $secondColor;
    }

    .avg-indicator {
      position: relative;
    }

    .avg-indicator::after {
      position: absolute;
      content: '站均';
      background-color: $primaryColor;
      color: white;
      border-radius: 3px;
      font-size: 9px;
      font-weight: normal;
      text-align: center;
      padding: 0 2px;
      bottom: calc(100% + 2px);
      right: 0;
    }

    transition: background-color 0.25s ease-in, border-color 0.25s ease-in;
    &:hover {
      background-color: $backgroundColor;
    }
  }
}
</style>
