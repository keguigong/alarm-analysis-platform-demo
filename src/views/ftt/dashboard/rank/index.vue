<template>
  <div class="rank-view">
    <score-panel class="left-column" @select="handleSelect" />
    <panel-seperator />

    <template>
      <div class="right-column">
        <template>
          <div class="right-top-row">
            <alarm-radar-panel class="alarm-radar-panel" :query="query" />
            <panel-seperator />
            <score-history-panel class="ftt-history-panel" :query="query" />
          </div>
          <panel-seperator />
          <div class="right-bottom-row">
            <alarm-count-panel class="alarm-count-panel" :query="query" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ScoreModel from './score.mode'

import { BoardCellCard, PanelSeperator } from '@/components'
import ScorePanel from './score-panel/index.vue'
import AlarmRadarPanel from './alarm-radar-panel/index.vue'
import ScoreHistoryPanel from './score-history-panel/index.vue'
import AlarmCountPanel from './alarm-count-panel/index.vue'

@Component({
  components: {
    ScorePanel,
    BoardCellCard,
    PanelSeperator,
    AlarmRadarPanel,
    ScoreHistoryPanel,
    AlarmCountPanel
  }
})
export default class RankView extends Vue {
  state = {
    selectedDevice: undefined as ScoreModel | undefined,
    selectedIndex: -1,
    query: {
      startTime: 0,
      endTime: 0
    }
  }

  get query() {
    const {
      selectedDevice,
      query: { startTime, endTime }
    } = this.state
    if (typeof selectedDevice === 'undefined') return undefined
    const { deviceId } = selectedDevice
    return {
      deviceId,
      startTime,
      endTime
    }
  }

  handleSelect(value?: any) {
    let { startTime, endTime, value: rest } = value
    if (typeof rest === 'undefined') return
    this.state.selectedDevice = rest
    this.state.query = {
      startTime,
      endTime
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-view {
  flex: 1;
  display: flex;
  min-height: 0;
  min-width: 0;

  .left-column {
    flex: 1 0 360px;
  }

  .right-column {
    flex: 4 0 500px;
    display: flex;
    flex-direction: column;

    .right-top-row {
      display: flex;
      flex: 1;
    }

    .right-bottom-row {
      flex: 1;
      min-height: 0;
    }
  }
}

.alarm-radar-panel {
  flex: 1;
}

.ftt-history-panel {
  flex: 1;
}

.alarm-count-panel {
  height: 100%;
}
</style>
