<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">
        <h2 class="header-title">{{ title }}</h2>
      </slot>
      <slot name="header-right"></slot>
      <!-- <div class="header-action-indicator" v-if="hasAction"></div> -->
    </div>

    <div class="card-action" v-if="hasAction">
      <slot name="action">
        <h1>Hello world</h1>
      </slot>
    </div>

    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'board-cell-card'
})
export default class BoardCellCard extends Vue {
  @Prop({ default: '这是一个标题Title' }) private title!: string

  @Prop({ default: false }) private hasAction!: boolean
}
</script>

<style lang="scss" scoped>
$color-border: var(--wel-border-color);
$color-background--hover: var(--wel-background-color);

.card {
  padding: 10px;
  border: 1px solid $color-border;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-title {
      margin: 0;
      padding: 0px 6px;
      font-size: 1.6rem;
      flex-shrink: 0;
    }
  }

  .card-action {
    position: relative;
    margin: 10px;
    width: calc(100% + 10px * 2);
    margin-left: -10px;
  }

  .card-content {
    margin-top: 10px;
    flex: 1;
    min-height: 0;
  }
}
</style>
