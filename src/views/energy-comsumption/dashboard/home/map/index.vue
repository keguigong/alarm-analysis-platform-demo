<template>
  <div id="amap-container">
    <h1 class="district-title">
      {{
        (state.selectedDistrict && state.selectedDistrict.NAME_CHN) ||
        '全国范围'
      }}
    </h1>
    <p>已节省 <b :style="{ fontSize: '1.1em' }">6212.12</b> 千瓦时电能</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import drawCountryCover from './draw-country-cover'
import drawAndFitDistrict from './draw-and-fit-district'
import fitCountry from './fit-country'
import drawHeatmap from './draw-heat-map'
import drawPrism from './draw-prism'
// import LabelsData from './china-province-label'
// import deviceList from '@/assets/samples/device-list.json'

import { BoardCellCard, Tabs } from '@/components'

@Component({
  components: {
    BoardCellCard,
    Tabs
  }
})
export default class EfficiencyMap extends Vue {
  @Prop() private feature!: any[]

  @Prop() private adcode!: number

  // @Watch('adcode')
  // watchAdcode(value: number) {
  //   const { selectedAdcode } = this.state
  //   if (selectedAdcode === value) return
  //   this.state.selectedAdcode = value
  //   this.drawAndFitDistrict()
  //   this.setCountryStyles()
  // }

  @Emit('select')
  emitSelect() {
    const { NAME_CHN, adcode } = this.state.selectedDistrict
    return {
      nameChn: NAME_CHN,
      adcode
    }
  }

  @Emit('reset')
  emitReset() {
    return true
  }

  map!: typeof window.AMap.Map

  disCountry!: typeof window.AMap.DistrictLayer.Country

  state = {
    selectedAdcode: 0,
    selectedDistrict: undefined as undefined | any,
    selectedPolygons: [] as any[],
    hoveredAdcode: 0
  }

  mounted() {
    const { AMap, Loca } = window
    if (typeof AMap === 'undefined') return
    this.initMap()

    let { map } = this
    if (typeof map === 'undefined') return
    this.drawAndFitDistrict = drawAndFitDistrict.bind(this)
    this.drawCountryCover = drawCountryCover.bind(this)
    this.drawHeatmap = drawHeatmap.bind(this)
    this.drawPrism = drawPrism.bind(this)
    this.fitCountry = fitCountry.bind(this)

    this.addMapEvents()

    // if (this.adcode) {
    //   this.watchAdcode(this.adcode)
    // }

    if (typeof Loca === 'undefined') return
    // this.drawHeatmap()
    // this.drawPrism()
  }

  beforeDestroy(): void {
    let { map } = this
    if (typeof map === 'undefined') return
    map.destroy()
  }

  // 初始化地图
  initMap() {
    // 获取AMap
    const { AMap } = window
    // 绘制世界地图layer
    let disWorld = new AMap.DistrictLayer.World({
      zIndex: 9,
      styles: {
        'nation-stroke': '',
        'coastline-stroke': '',
        fill: '#DCF0F0'
      }
    })
    // 绘制省份layer
    this.disCountry = new AMap.DistrictLayer.Country({
      zIndex: 10,
      SOC: 'CHN',
      depth: 1,
      styles: {
        'nation-stroke': '#666666',
        // 'coastline-stroke': '#A3A3A3',
        'province-stroke': '#666666',
        'stroke-width': 0.5,
        fill: function (props: any) {
          return '#EAF9F9'
        }
      }
    })

    // let disProvince = new AMap.DistrictLayer.Province({
    //   zIndex: 10,
    //   adcode: [310000, 320000, 330000, 340000, 350000, 360000, 370000],
    //   depth: 0,
    //   styles: {
    //     fill: '#DCF0F0',
    //     'province-stroke': 'white',
    //     // 'city-stroke': 'white', // 中国地级市边界
    //     'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
    //   }
    // })

    let { disCountry } = this
    this.map = new AMap.Map('energy-consumption-map-container', {
      zoom: 4.5,
      zooms: [4, 10],
      center: [108.063937, 32.409589],
      pitch: 45,
      rotation: 0,
      defaultCursor: 'pointer',
      layers: [disCountry],
      viewMode: '3D',
      resizeEnable: true
    })

    let { map } = this
    // 添加地图控件
    map.addControl(new AMap.Scale())
    // map.addControl(new AMap.ToolBar({ liteStyle: true }))
    let layer = new AMap.LabelsLayer({
      collision: true,
      animation: true
    })

    const provinceLabelLazy = () => import('./china-province-label')
    provinceLabelLazy().then(({ default: provinceLabel }) => {
      for (var i = 0; i < provinceLabel.length; i++) {
        var labelsMarker = new AMap.LabelMarker(provinceLabel[i])
        layer.add(labelsMarker)
      }
      map.add(layer)
    })
  }

  addMapEvents() {
    let { map, disCountry, drawAndFitDistrict, fitCountry } = this

    map.on('click', (e: any) => {
      let pixel = e.pixel
      let props = disCountry.getDistrictByContainerPos(pixel)

      if (typeof props === 'undefined') return
      let { adcode: nextAdcode } = props
      if (typeof nextAdcode === 'undefined') return

      if (nextAdcode === this.state.selectedAdcode) {
        this.state.selectedAdcode = 0
        this.state.selectedDistrict = undefined
        fitCountry()
        this.emitReset()
      } else {
        this.state.selectedAdcode = nextAdcode
        this.state.selectedDistrict = props
        drawAndFitDistrict()
        this.emitSelect()
      }
      this.setCountryStyles()
    })

    map.on('mousemove', (e: any): void => {
      let pixel = e.pixel
      let props = disCountry.getDistrictByContainerPos(pixel)

      if (typeof props === 'undefined') {
        this.state.hoveredAdcode = 0
        this.setCountryStyles()
        return
      }
      let { adcode: nextAdcode } = props
      if (nextAdcode !== this.state.hoveredAdcode) {
        this.state.hoveredAdcode = nextAdcode
        this.setCountryStyles()
      }
    })
  }

  setCountryStyles() {
    const {
      disCountry,
      state: { selectedAdcode, hoveredAdcode }
    } = this
    disCountry.setStyles({
      fill: (props: any) => {
        switch (props.adcode) {
          case selectedAdcode:
            return '#2C73FF'
          case hoveredAdcode:
            return '#A4C3FF'
          default:
            return '#EAF9F9'
        }
      }
    })
  }

  drawAndFitDistrict!: () => void

  drawCountryCover!: () => void

  drawHeatmap!: () => void

  drawPrism!: () => void

  fitCountry!: () => void

  // get heatmapFeatures() {
  //   let features: any[] = []
  //   deviceList.forEach((item: any) => {
  //     if (item.longitude && item.latitude) {
  //       features.push({
  //         type: 'Feature',
  //         properties: {
  //           ...item
  //         },
  //         geometry: {
  //           type: 'Point',
  //           coordinates: [item.longitude, item.latitude]
  //         }
  //       })
  //     }
  //   })
  //   return features
  // }

  // get prismFeatures() {
  //   let features: any[] = []
  //   LabelsData.forEach((item) => {
  //     features.push({
  //       type: 'Feature',
  //       properties: {
  //         ...item
  //       },
  //       geometry: {
  //         type: 'Point',
  //         coordinates: item.position
  //       }
  //     })
  //   })
  //   return features
  // }
}
</script>

<style lang="scss" scoped>
#amap-container {
  height: 100%;
  width: 100%;
  flex: 1;
  pointer-events: none;
  padding-left: 20px;
}

.district-title {
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 10px;
}
</style>
