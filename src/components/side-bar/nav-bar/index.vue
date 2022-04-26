<template>
  <nav class="nav-bar">
    <!-- <nav-header :menu="header" /> -->
    <template v-for="(menu, index) in menus">
      <template v-if="menu.children && index === activeMenuIndex">
        <nav-item
          v-for="(nav, index) in menu.children"
          :key="nav.path + index"
          :menu="nav"
        />
      </template>
    </template>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import NavHeader from './nav-header.vue'
import NavItem from './nav-item.vue'
import MenuModel from '../menu.model'

@Component({
  components: {
    NavHeader,
    NavItem
  }
})
export default class NavBar extends Vue {
  @Prop({
    default: () => ({
      id: 6446,
      name: '算法管理',
      identifier: '',
      path: '/algorithms',
      parent_id: 5862,
      priority: 0,
      tree_level: 1,
      status: 1,
      comment: '',
      icon: 'wel-algorithm'
    })
  })
  private header!: MenuModel

  @Prop({
    default: () => [
      {
        id: 5817,
        name: '设备列表',
        identifier: '',
        path: '/algorithms/device-list',
        parent_id: 5816,
        priority: 1,
        tree_level: 2,
        status: 1,
        comment: ''
      }
    ]
  })
  private menus!: MenuModel[]

  @Prop() private activeMenuIndex!: number
}
</script>

<style lang="scss" scoped>
$background-color: var(--wel-background-color);
$border-color: var(--wel-border-color);

.nav-bar {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: white;
  padding: 16px 0;
  border-right: 1px solid $border-color;
}
</style>
