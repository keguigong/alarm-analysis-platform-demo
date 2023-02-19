<template>
  <aside id="side-bar-container" :style="{ width: width + 'px' }">
    <div class="side-bar">
      <!-- <menu-bar :menus="state.menu" @input="handleMenuClick" /> -->
      <nav-bar :menus="state.menu" :activeMenuIndex="state.activeMenuIndex" />
      <side-handler @resize="handleResize" />
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { toCamelCase } from '@/utils'
import MenuModel from './menu.model'
import menuSample from '@/assets/samples/menu.json'

import MenuBar from './menu-bar'
import NavBar from './nav-bar'
import SideHandler from './side-handler'

const KEY_SIDEBAR_WIDTH = 'welkin.sidebar.width'

@Component({
  components: {
    MenuBar,
    NavBar,
    SideHandler
  }
})
export default class SideBar extends Vue {
  width = 0

  state = {
    menu: toCamelCase(menuSample).data.authorities[0].children as MenuModel[],
    activePath: '',
    activeMenuIndex: 0
  }

  @Watch('$route')
  watch$Route(value: Route) {
    this.matchActivePath(value)

    // this.state.activeMenuIndex = this.findActiveMenuIndex()
  }

  mounted() {
    let localWidthStr = localStorage.getItem(KEY_SIDEBAR_WIDTH)
    let localWidth
    if (localWidthStr) localWidth = parseInt(localWidthStr)
    this.width = localWidth || 300
  }

  handleResize(value: number) {
    let newWidth = this.width + value
    if (newWidth <= 260 || newWidth >= document.body.clientWidth - 300) return
    this.width = newWidth
    localStorage.setItem(KEY_SIDEBAR_WIDTH, this.width.toString())
  }

  handleMenuClick(value: number) {
    this.state.activeMenuIndex = value
  }

  matchActivePath(route: Route) {
    const { path, fullPath } = route
    const pathes = this.flatPathes()

    if (pathes.includes(path)) {
      this.state.activePath = path
    } else if (pathes.includes(fullPath)) {
      this.state.activePath = fullPath
    } else {
      pathes.some((item: string) => {
        const res1 = new RegExp(item).test(path)
        const res2 = new RegExp(item).test(fullPath)
        const res = res1 || res2
        if (res) this.state.activePath = item
        return res
      })
    }
  }

  flatPathes() {
    const pathes: string[] = []
    const flat = (list: MenuModel[]) => {
      list.forEach((item: MenuModel) => {
        if (item.path) pathes.push(item.path)
        if (item.children) flat(item.children)
      })
    }

    flat(this.state.menu)
    return pathes
  }

  findActiveMenuIndex() {
    let activeMenuIndex = this.state.activeMenuIndex
    const { path } = this.$route
    this.state.menu.forEach((item, index) => {
      if (item.children instanceof Array) {
        let children = item.children
        children.forEach((item) => {
          if (item.path === path) {
            activeMenuIndex = index
            return
          }
        })
      }
      return
    })
    return activeMenuIndex
  }
}
</script>

<style lang="scss" scoped>
#side-bar-container {
  width: 260px;
  position: relative;
  z-index: 1;

  .side-bar {
    position: absolute;
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }
}
</style>
