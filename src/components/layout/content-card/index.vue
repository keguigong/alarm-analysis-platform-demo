<template>
  <div :class="['content-card', flex ? 'content-card--flex' : '']">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'content-card'
})
export default class ContentCard extends Vue {
  @Prop() private flex!: boolean
}
</script>

<style lang="scss" scoped>
$color-shadow: var(--wel-color-shadow);
$color-border: var(--wel-border-color);

.content-card {
  flex: 1;
  min-height: 0;
  box-shadow: 0 0 15px 1px $color-shadow;
  border: 1px solid $color-border;
  border-radius: 20px;
  padding: 14px 20px;
  margin: 15px;
}

.content-card--flex {
  display: flex;
  flex-direction: column;
}
</style>
