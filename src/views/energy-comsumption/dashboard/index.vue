<template>
  <content-view flex="true" class="dashboard-page">
    <div class="map-container">
      <div id="energy-consumption-map-container"></div>
      <div class="map-overlay map-overlay-top"></div>
      <div class="map-overlay map-overlay-right"></div>
      <div class="map-overlay map-overlay-bottom"></div>
      <div class="map-overlay map-overlay-left"></div>
    </div>
    <page-header class="page-header" title="名称名称">
      <template #right>
        <tabs
          hideBar
          align="left"
          v-model="state.tabIndex"
          :list="state.tabList"
          @select="handleTabSelect"
        />
      </template>
    </page-header>
    <router-view :style="{ zIndex: 1 }"></router-view>
  </content-view>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ContentCard, ContentView, PageHeader, Tabs } from '@/components'

@Component({
  components: {
    ContentCard,
    ContentView,
    PageHeader,
    Tabs
  }
})
export default class EnergyComsumptionDashboard extends Vue {
  @Watch('$route.path')
  watchRoute() {
    this.findTabIndex()
  }

  state = {
    tabList: [
      { name: '主页', routeName: 'energy-consumption' },
      { name: '维度展示', routeName: 'energy-consumption-dimension' },
      { name: '能耗指标', routeName: 'energy-consumption-target' }
    ],
    tabIndex: 0
  }

  mounted() {
    this.findTabIndex()
  }

  findTabIndex() {
    const { name } = this.$route
    let tabIndex = this.state.tabList.findIndex(
      (element) => element.routeName === name
    )
    if (tabIndex !== -1) {
      this.state.tabIndex = tabIndex
    }
  }

  handleTabSelect(value: number): void {
    const { routeName } = this.state.tabList[value]
    if (!routeName) return
    this.$router.push({
      name: routeName,
      query: this.$route.query
    })
  }
}
</script>

<style lang="scss" scoped>
$backgroundColor: var(--wel-background-color);
$beginColor: #f8f8fa;
$endColor: #ffffff00;

.dashboard-page {
  background-color: $backgroundColor;
  position: relative;

  .page-header {
    z-index: 1;
  }

  .map-container {
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 80%;

    #energy-consumption-map-container {
      top: 0;
      left: 0;
      position: absolute;
      height: 100%;
      width: 100%;
    }

    .map-overlay {
      pointer-events: none;
    }

    .map-overlay-top {
      position: absolute;
      width: 100%;
      height: 20%;
      background: linear-gradient($beginColor, $endColor);
    }

    .map-overlay-right {
      position: absolute;
      right: 0;
      height: 100%;
      width: 20%;
      background: linear-gradient(to left, $beginColor, $endColor);
    }

    .map-overlay-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 20%;
      background: linear-gradient(to top, $beginColor, $endColor);
    }

    .map-overlay-left {
      position: absolute;
      left: 0;
      height: 100%;
      width: 20%;
      background: linear-gradient(to right, $beginColor, $endColor);
    }
  }
}
</style>
