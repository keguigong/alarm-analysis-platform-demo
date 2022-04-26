export default function drawPrism(this: any) {
  const { Loca } = window
  const { map, prismFeatures } = this

  const loca = new Loca.Container({ map })

  loca.ambLight = {
    intensity: 0.7,
    color: '#7b7bff'
  }

  loca.dirLight = {
    intensity: 0.8,
    color: '#fff',
    target: [0, 0, 0],
    position: [0, -1, 1]
  }

  loca.pointLight = {
    color: 'rgb(240,88,25)',
    position: [112.028276, 31.58538, 2000000],
    intensity: 3,
    // 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失。
    distance: 5000000
  }

  const geo = new Loca.GeoJSONSource({
    data: {
      type: 'FeatureCollection',
      features: prismFeatures
    }
  })

  const prism = new Loca.PrismLayer({
    zIndex: 10,
    opacity: 1,
    visible: false,
    hasSide: true
  })
  prism.setSource(geo)
  prism.setStyle({
    unit: 'px',
    sideNumber: 32,
    radius: 5,
    topColor: '#2852F1',
    sideBottomColor: '#002bb9',
    sideTopColor: '#E97091',
    height: function (index: any, feature: any) {
      return 10 + Math.random() * 100
    },
    altitude: 0
  })
  loca.add(prism)
  map.on('complete', function () {
    setTimeout(function () {
      prism.show(500)
      prism.addAnimate({
        key: 'height',
        value: [0, 1],
        duration: 500,
        easing: 'Linear',
        transform: 500,
        random: true,
        delay: 1000
      })
    }, 800)
  })
  loca.animate.start()
}
