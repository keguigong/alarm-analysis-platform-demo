<template>
  <div
    :class="[
      'content-view',
      spread ? 'content-view--spread' : '',
      flex ? 'content-view--flex' : ''
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'content-view'
})
export default class ContentView extends Vue {
  @Prop() private spread!: boolean

  @Prop() private flex!: boolean
}
</script>

<style lang="scss" scoped>
.content-view {
  padding: 16px 20px;
  height: 100%;
}

.content-view--spread {
  height: auto;
  min-height: 100%;
}

.content-view--flex {
  display: flex;
  flex-direction: column;
}
</style>
