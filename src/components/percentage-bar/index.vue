<template>
  <div class="percentage-bar">
    <template v-for="(item, index) in state.colorArr">
      <div
        class="percentage-item"
        v-if="state.percentage >= index * 25"
        :style="{ backgroundColor: item }"
        :key="index"
      ></div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'

@Component({
  name: 'percentage-bar'
})
export default class PercentageBar extends Vue {
  @Prop({ default: () => [0, 100] }) private range!: any[]

  @Prop({ default: 100 }) private value!: number

  @Emit('change')
  emitChange() {
    return this.state.color
  }

  @Watch('value')
  watchValue(value: number) {
    if (typeof value === 'undefined') return
    const { range } = this
    const calcRange = range[1] - range[0]
    const initValue = value - range[0] >= 0 ? value - range[0] : 0
    const percentage = (initValue / calcRange) * 100
    this.state.percentage = percentage

    let color = undefined as undefined | string
    for (let i = 0; i < 4; i++) {
      if (this.state.percentage >= i * 25) {
        color = this.state.colorArr[i]
      } else {
        break
      }
    }
    this.state.color = color
    this.emitChange()
  }

  state = {
    color: undefined as undefined | string,
    percentage: 0,
    colorArr: ['#004044', '#00646A', '#10848B', '#56B3B4']
  }

  mounted() {
    this.watchValue(this.value)
  }
}
</script>

<style lang="scss" scoped>
$color-primary: var(--wel-color-primary);
$color-placeholder: var(--wel-text-placeholder);
$color-text: var(--wel-text-color);
$color-border: var(--wel-border-color);

.percentage-bar {
  display: flex;

  .percentage-item {
    height: 4px;
    width: 18px;
    flex: 1 0;

    &:first-child {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }

    &:nth-child(4) {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }

    &:not(:first-child) {
      margin-left: 2px;
    }
  }
}
</style>
