<template>
  <div class="home">
    <div class="map-area">
      <efficiency-map
        :adcode="310000"
        @select="handleMapSelect"
        @reset="handleMapReset"
      />
      <indicator-panel />
    </div>
    <efficiency-panel class="efficiency-area" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BoardCellCard } from '@/components'
import EfficiencyMap from './map/index.vue'
import EfficiencyPanel from './efficiency-panel/index.vue'
import IndicatorPanel from './indicator-panel/index.vue'

@Component({
  components: {
    BoardCellCard,
    EfficiencyMap,
    EfficiencyPanel,
    IndicatorPanel
  }
})
export default class Home extends Vue {
  handleMapSelect(value: any) {
    // console.log(value)
  }

  handleMapReset() {
    // console.log('reseted')
  }
}
</script>

<style lang="scss" scoped>
.home {
  flex: 1;
  min-height: 0;
  display: flex;
  pointer-events: none;

  .map-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .efficiency-area {
    height: 100%;
    flex: 360px 0 1;
  }
}
</style>
