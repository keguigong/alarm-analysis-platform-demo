<template>
  <router-link
    :to="menu.path"
    :custom="custom"
    v-slot="{ href, route, navigate, isActive, isExactActive }"
  >
    <slot v-bind="{ href, route, navigate, isActive, isExactActive }">
      <a :href="href" @click="navigate">
        <div :data-active="isActive" class="nav-item">
          <i :class="['nav-item_icon', menu.icon ? `icon-${menu.icon}` : '']" />
          <span
            :class="['nav-item_span', menu.icon ? 'nav-item_span--icon' : '']"
            >{{ menu.name }}</span
          >
        </div>
      </a>
    </slot>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import MenuModel from '../menu.model'

@Component
export default class NavItem extends Vue {
  @Prop({
    default: () => ({
      id: 5817,
      name: '设备列表',
      identifier: '',
      path: '/algorithms/device-list',
      parent_id: 5816,
      priority: 1,
      tree_level: 2,
      status: 1,
      comment: ''
    })
  })
  private menu!: MenuModel

  @Prop() private active!: boolean

  @Prop({ default: true }) private custom!: boolean
}
</script>

<style lang="scss" scoped>
$text-color: var(--wel-text-secondary-color);
$color-primary: var(--wel-color-primary);
$color-text: var(--wel-text-color);

a {
  text-decoration: none;
}

.nav-item {
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 50px;
  color: $text-color;
  padding: 0 16px;
  transition: color 0.25s ease-in, opacity 0.25s ease-in;
  font-size: 1.4rem;
  min-width: 0;

  &:hover {
    color: $color-text;
  }

  &[data-active] {
    color: $color-primary;
  }

  .nav-item_icon {
    font-size: 2.4rem;
  }

  .nav-item_span {
    margin-left: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav-item_span.nav-item_span--icon {
    margin-left: 0.5rem;
  }

  animation-duration: 0.25s;
  animation-timing-function: ease-in;
  animation-name: slideIn;
}

@keyframes slideIn {
  from {
    margin-left: -15px;
    opacity: 0;
  }

  to {
    margin-left: 0;
    opacity: 1;
  }
}

.nav-item::after {
  position: absolute;
  content: '';
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
  background-color: $color-primary;
  width: 2px;
  height: 24px;
  opacity: 0;
  transition: opacity 0.25s ease-in;
}

.nav-item[data-active]::after {
  opacity: 1;
}
</style>
