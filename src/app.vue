<template>
  <div id="app">
    <div class="app-layout-container">
      <side-bar />
      <router-view class="app-content-container" />
      <build-config />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SideBar } from '@/components'
import { BuildConfig } from '@/components'

@Component({
  components: {
    SideBar,
    BuildConfig
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './app.scss';

.app-layout-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}

.app-content-container {
  flex: 1;
  overflow-y: auto;
}
</style>
