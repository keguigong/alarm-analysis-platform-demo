<template>
  <div
    class="panel-seperator"
    :style="{ '--panel-seperator-size': size + 'px' }"
  ></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'panel-seperator'
})
export default class PanelSeperator extends Vue {
  @Prop({ default: 16 }) private size!: number
}
</script>

<style lang="scss" scoped>
.panel-seperator {
  flex: 0 0 var(--panel-seperator-size);
}
</style>
