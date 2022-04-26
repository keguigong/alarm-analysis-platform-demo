<template>
  <!-- <router-link
    :to="menu.path"
    :custom="custom"
    v-slot="{ href, route, navigate, isActive, isExactActive }"
  >
    <slot v-bind="{ href, route, navigate, isActive, isExactActive }">
      <a :href="href" @click="navigate">
        
      </a>
    </slot>
  </router-link> -->
  <div :data-active="active" class="menu-item">
    <div class="menu-item-icon-container">
      <i :class="['menu-item-icon', menu.icon ? `icon-${menu.icon}` : '']" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import MenuModel from '../menu.model'

@Component
export default class MenuItem extends Vue {
  @Prop() private menu!: MenuModel

  @Prop() private active!: boolean

  @Prop({ default: true }) private custom!: boolean
}
</script>

<style lang="scss" scoped>
$color-active: var(--wel-color-primary);
$color-hover: var(--wel-background-color);
$color-white: var(--wel-color-white);
$color-icon: var(--wel-text-secondary-color);

.menu-item {
  position: relative;
  height: 64px;
  min-width: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .menu-item-icon-container {
    width: 40px;
    height: 40px;
    background-color: $color-white;
    transition: background-color 0.25s ease-in;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .menu-item-icon {
      color: $color-icon;
      transition: color 0.25s ease-in;
      font-size: 2.4rem;
    }

    &:hover {
      background-color: $color-hover;
    }
  }

  &[data-active] {
    .menu-item-icon-container {
      background-color: $color-active;

      .menu-item-icon {
        color: $color-white;
      }
    }
  }
}

.menu-item::after {
  position: absolute;
  content: '';
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
  background-color: $color-active;
  width: 2px;
  height: 40px;
  opacity: 0;
  transition: opacity 0.25s ease-in;
}

.menu-item[data-active]::after {
  opacity: 1;
}

a {
  text-decoration: none;
}
</style>
