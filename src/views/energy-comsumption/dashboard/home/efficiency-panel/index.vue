<template>
  <board-cell-card class="efficiency-panel">
    <template #header>
      <tabs
        fitWidth="true"
        v-model="state.tabIndex"
        :list="state.tabList"
        @select="handleTabSelect"
      />
    </template>

    <template v-if="state.tabIndex === 0">
      <efficiency-content />
    </template>

    <template v-else-if="state.tabIndex === 1">
      <abnormal-content />
    </template>
  </board-cell-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BoardCellCard, Tabs, ListBottom } from '@/components'
import EfficiencyContent from './efficiency-content/index.vue'
import AbnormalContent from './abnormal-content/index.vue'

@Component({
  components: {
    BoardCellCard,
    Tabs,
    ListBottom,
    EfficiencyContent,
    AbnormalContent
  }
})
export default class EfficiencyPanel extends Vue {
  state = {
    tabList: [{ name: '总效率清单' }, { name: '异常数据清单' }],
    tabIndex: 0
  }

  handleTabSelect() {}
}
</script>

<style lang="scss" scoped>
.efficiency-panel {
  pointer-events: all;
}
</style>
