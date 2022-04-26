<template>
  <content-view flex="true" class="dashboard-page">
    <page-header title="FTT情况可视化">
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
    <router-view></router-view>
  </content-view>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { formatLocaleDate } from '@/utils'
import { ContentCard, ContentView } from '@/components'
import { PageHeader, Tabs } from '@/components'

@Component({
  components: {
    ContentCard,
    ContentView,
    PageHeader,
    Tabs
  },
  filters: {
    formatLocaleDate
  }
})
export default class FTTDashboardPage extends Vue {
  @Watch('$route.path')
  watchRoute() {
    this.findTabIndex()
  }

  state = {
    tabList: [
      { name: '设备分布图', routeName: 'ftt-dashboard' },
      { name: '告警分布', routeName: 'ftt-dashboard-alarm-distribution' },
      { name: 'TOP10', routeName: 'ftt-dashboard-rank' },
      { name: '周报日报', routeName: 'ftt-dashboard-report' }
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
$color-background: var(--wel-background-color);

.dashboard-page {
  background-color: $color-background;
}
</style>
