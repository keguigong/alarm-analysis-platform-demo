<template>
  <div class="nav-header">
    <div class="nav-header_text-container">
      <i :class="[menu.icon ? `icon-${menu.icon}` : '', 'nav-header_icon']"></i>
      <span class="nav-header_span">{{ menu.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import MenuModel from '../menu.model'

@Component
export default class NavHeader extends Vue {
  @Prop() private menu!: MenuModel
}
</script>

<style lang="scss" scoped>
$color-primary: var(--wel-color-primary);
$color-white: var(--wel-color-white);
$color-text: var(--wel-text-color);

.nav-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 74px;
  padding: 0px 32px;

  .nav-header_text-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    padding: 0 8px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    line-height: 32px;
    color: $color-primary;
    border: 1px solid $color-primary;
    border-radius: 8px;
    background-color: $color-white;
    font-weight: 300;
    font-weight: bold;
  }

  .nav-header_icon {
    font-size: 2.4rem;
  }

  .nav-header_span {
    margin-left: 0.5rem;
  }
}
</style>
