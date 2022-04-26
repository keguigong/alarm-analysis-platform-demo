<template>
  <div class="menu-bar">
    <slot name="header">
      <!-- <aside-logo /> -->
    </slot>
    <div class="menu-bar-menu">
      <menu-item
        v-for="(menu, index) in menus"
        :key="index"
        :menu="menu"
        @click.native="handleClick(menu, index)"
      />
    </div>
    <div>
      <slot name="bottom">
        <menu-item :menu="{ path: '/settings', icon: 'wel-setting' }" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import MenuModel from '../menu.model'

import AsideLogo from './owl-logo.vue'
import MenuItem from './menu-item.vue'

@Component({
  components: {
    MenuItem,
    AsideLogo
  }
})
export default class MenuBar extends Vue {
  @Prop() private menus!: MenuModel[]

  @Prop() private value!: MenuModel

  @Emit('input')
  emitInput(value: number) {
    return value
  }

  private handleClick(item: any, index: number) {
    this.emitInput(index)
  }
}
</script>

<style lang="scss" scoped>
$shadow-color: var(--wel-color-shadow);

.menu-bar {
  display: flex;
  flex-direction: column;
  padding-top: 14px;
  padding-bottom: 10px;
  height: 100%;
  width: 80px;
  box-shadow: 2px 0px 15px 1px $shadow-color;
  z-index: 99;
}

.menu-bar-menu {
  flex: 1;
  overflow-y: auto;
}
</style>
