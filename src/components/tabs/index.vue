<template>
  <div
    :data-hide-bar="hideBar"
    :class="[
      'tabs',
      fitWidth ? 'tabs--fitWidth' : '',
      align ? 'tabs--' + align : ''
    ]"
  >
    <a
      v-for="(tab, index) in list"
      :key="index"
      :disabled="currentIndex === index"
      @click="handleSelect(index)"
    >
      <div
        :data-hide-bar="hideBar"
        :class="['tab', currentIndex === index ? 'tab--selected' : '']"
      >
        <span>{{ tab.name }}</span>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'

@Component({
  name: 'tabs'
})
export default class Tabs extends Vue {
  @Prop({
    default: () => [
      {
        name: '选项1'
      },
      {
        name: '选项2'
      },
      {
        name: '选项3'
      }
    ]
  })
  private list!: any[]

  @Prop() private value!: string

  @Prop() private fitWidth!: boolean

  @Prop() private align!: 'left' | 'right' | 'center'

  @Prop() private hideBar!: boolean

  private currentIndex = 0

  @Watch('value')
  private watchValue(value: number) {
    if (this.currentIndex !== value) this.currentIndex = value
  }

  @Emit('select')
  emitSelect(value: number) {
    this.emitInput(value)
    return value
  }

  @Emit('input')
  emitInput(value: number) {
    return value
  }

  private handleSelect(index: number) {
    this.currentIndex = index
    this.emitSelect(index)
  }
}
</script>

<style lang="scss" scoped>
$color-primary: var(--wel-color-primary);
$color-placeholder: var(--wel-text-placeholder);
$color-text: var(--wel-text-color);
$color-border: var(--wel-border-color);

a {
  cursor: pointer;
  font-weight: 400;

  &[disabled] {
    pointer-events: none;
  }
}

.tabs {
  display: flex;
  font-size: 1.6rem;
  justify-content: center;
  position: relative;
  min-width: 100px;
  height: 44px;
  overflow-x: auto;
  white-space: nowrap;

  .tab {
    height: 100%;
    display: flex;
    padding: 0 1em;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: color 0.25s ease-in;

    &:hover {
      color: $color-primary;
    }

    &::after {
      position: absolute;
      bottom: 0;
      content: '';
      height: 3px;
      width: calc(100% - 1em * 2);
      background-color: $color-primary;
      z-index: 99;
      opacity: 0;
      transition: opacity 0.25s ease-in;
    }

    &.tab--selected {
      color: $color-primary;
      font-weight: bold;

      &:not([data-hide-bar])::after {
        opacity: 1;
      }
    }
  }

  &:not([data-hide-bar])::after {
    position: absolute;
    bottom: 0;
    content: '';
    height: 2px;
    width: 100%;
    background-color: $color-border;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.tabs--fitWidth {
  width: 100%;
}

.tabs--left {
  justify-content: flex-start;
}

.tabs--right {
  justify-content: flex-end;
}
</style>
