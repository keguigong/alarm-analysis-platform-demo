<template>
  <button :style="{ pointerEvents: 'all' }" @click="handleClick">
    PULL DISTRICTS
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { districts } from './china-province-label'
import pullDistricts from './pull-districts'

@Component
export default class PullDistricts extends Vue {
  async handleClick() {
    let obj: { [key: string]: any } = {}
    for (let i = 0; i < districts.length; i++) {
      let boudaries = await pullDistricts(districts[i].adcode)
      // obj[districts[i].adcode] = boudaries
      const blob = new Blob([JSON.stringify(boudaries)], {
        type: 'application/json'
      })
      const aTag = document.createElement('a')
      aTag.href = URL.createObjectURL(blob)
      aTag.download = districts[i].adcode + '.json'
      document.documentElement.appendChild(aTag)
      aTag.click()
      document.documentElement.appendChild(aTag)
    }
    console.log(obj, Object.keys(obj).length)
  }
}
</script>
