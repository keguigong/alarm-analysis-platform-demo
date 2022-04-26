export default function drawHeatmap(this: any) {
  const { Loca } = window
  const { map, heatmapFeatures } = this

  const loca = new Loca.Container({ map })
  const geo = new Loca.GeoJSONSource({
    data: {
      type: 'FeatureCollection',
      features: heatmapFeatures
    }
  })

  const heatmap = new Loca.HeatMapLayer({
    zIndex: 10,
    opacity: 1,
    visible: true,
    zooms: [2, 22]
  })

  heatmap.setSource(geo, {
    radius: 10,
    unit: 'px',
    height: 10,
    //radius: 35,
    //unit: 'px',
    //height: 100,
    gradient: {
      0.1: '#2A85B8',
      0.2: '#16B0A9',
      0.3: '#29CF6F',
      0.4: '#5CE182',
      0.5: '#7DF675',
      0.6: '#FFF100',
      0.7: '#FAA53F',
      1: '#D04343'
    },
    value: function (index: any, feature: any) {
      return 10 + 10 * Math.random()
    }
    // min: -100,
    // max: 100,
    // heightBezier: [0, 0.53, 0.37, 0.98]
  })
  loca.add(heatmap)
}
