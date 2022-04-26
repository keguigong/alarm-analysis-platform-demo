<template>
  <div v-if="visible">
    <div class="build-config bottom-left">
      <p><b>Work in Progress</b></p>
      <p><b>BRANCH: </b>{{ buildConfig.branch }}</p>
      <p><b>VERSION: </b>{{ buildConfig.version }}</p>
      <p><b>COMMIT DATE: </b>{{ buildConfig.commitDate | formatLocaleDate }}</p>
      <p><b>BUILD DATE: </b>{{ buildConfig.buildDate | formatLocaleDate }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { toCamelCase, formatLocaleDate } from '@/utils'

@Component({
  filters: {
    formatLocaleDate
  }
})
export default class BuildConfig extends Vue {
  buildConfig: any = {}

  get visible() {
    return this.buildConfig.branch !== 'release'
  }

  mounted() {
    let buildConfigLazy = () => import('@/assets/build-config.json')
    buildConfigLazy().then(({ default: buildConfigJson }) => {
      this.buildConfig = toCamelCase(buildConfigJson)
    })
  }
}
</script>

<style lang="scss" scoped>
$color-text: var(--wel-text-color);

.build-config {
  position: absolute;
  pointer-events: none;
  z-index: 2001;
  text-align: left;
  bottom: 10%;
  transform: translateY(-50%);
  left: 1em;
}

p {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: $color-text;
  opacity: 0.2;
  margin: 0.5em 0;
}
</style>
