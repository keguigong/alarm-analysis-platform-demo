<template>
  <div class="page-header">
    <slot>
      <div class="page-header_left">
        <span class="page-header-breadcrumb">{{ title }}</span>
        <h1 class="page-header-title">{{ title }}</h1>
      </div>
    </slot>
    <slot name="right"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component({
  name: 'page-header'
})
export default class PageHeader extends Vue {
  @Prop({ default: 'Title' }) private title!: string

  @Prop() private disableHover!: boolean
}
</script>

<style lang="scss" scoped>
$color-secondary: var(--wel-text-secondary-color);

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  .page-header_left {
    flex: 1;
  }

  .page-header-breadcrumb {
    font-size: 1.2rem;
    color: $color-secondary;
  }

  .page-header-title {
    font-size: 1.8rem;
    margin: 1rem 0;
  }
}
</style>
