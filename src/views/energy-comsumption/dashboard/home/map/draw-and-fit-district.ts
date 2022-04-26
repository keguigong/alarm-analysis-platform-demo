const boundMap = new Map()

export default async function drawAndFitDistrict(this: any) {
  const { AMap } = window
  const {
    map,
    state: { selectedPolygons, selectedAdcode }
  } = this
  // map.remove(this.state.selectedPolygons)
  this.state.selectedPolygons = []

  let boundaries
  // 使用map缓存已经获取过的边界
  if (boundMap.get(selectedAdcode)) {
    boundaries = boundMap.get(selectedAdcode)
  }

  // 如果没有缓存，拉取@/assets/boundaries中的边界
  if (!boundaries) {
    const boundariesLazy = () =>
      import(`@/assets/boudaries/${selectedAdcode}.json`)
    boundaries = await boundariesLazy().then(({ default: res }) => {
      if (typeof res === 'undefined') return
      return res
    })
    if (boundaries) boundMap.set(selectedAdcode, boundaries)
  }

  // 如果还没有，使用高德接口拉取边界
  if (!boundaries) {
    await new Promise((resolve, reject) => {
      new AMap.DistrictSearch({
        level: 'province',
        showbiz: false,
        extensions: 'all',
        subdistrict: 0
      }).search(selectedAdcode.toString(), (status: string, result: any) => {
        if (status !== 'complete') reject()
        boundaries = result.districtList[0].boundaries
        if (boundaries) boundMap.set(selectedAdcode, boundaries)
        resolve(boundaries)
      })
    })
  }

  if (typeof boundaries === 'undefined') return
  for (let i = 0, l = boundaries.length; i < l; i++) {
    const polygon = new AMap.Polygon({
      path: boundaries[i],
      fillOpacity: 1,
      fillColor: '#80d8ff',
      strokeColor: '#0091ea',
      strokeWeight: 1
    })
    this.state.selectedPolygons.push(polygon)
  }

  // map.add(this.state.selectedPolygons)
  map.setFitView(this.state.selectedPolygons)
}
