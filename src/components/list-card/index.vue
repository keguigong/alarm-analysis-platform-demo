<template>
  <div
    :class="[
      'list-card',
      active ? 'list-card--active' : '',
      disableHover ? 'list-card--disableHover' : ''
    ]"
  >
    <slot v-bind="{ active }"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component({
  name: 'list-card'
})
export default class ListCard extends Vue {
  @Prop() private active!: boolean

  @Prop() private disableHover!: boolean
}
</script>

<style lang="scss" scoped>
$color-border: var(--wel-border-color);
$color-primary: var(--wel-color-primary);
$color-background--hover: var(--wel-background-color);

.list-card {
  border: 1px solid $color-border;
  border-radius: 12px;
  padding: 5px 16px;
  padding-right: 20px;
  font-size: 1.4rem;
  transition: background-color 0.25s ease-in, border-color 0.25s ease-in;
  cursor: pointer;

  &:hover {
    background-color: $color-background--hover;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.list-card.list-card--active {
  border-color: $color-primary;
  background-color: $color-background--hover;
}

.list-card.list-card.list-card--disableHover {
  cursor: default;

  &:hover {
    background: none;
  }
}
</style>
