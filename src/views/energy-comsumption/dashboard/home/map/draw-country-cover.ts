export default function drawCountryCover(this: any): void {
  const { AMap } = window
  const { map } = this

  let polygon: typeof AMap.Polygon
  new AMap.DistrictSearch({
    extensions: 'all',
    subdistrict: 0
  }).search('中国', function (status: string, result: any) {
    console.log(status, result)
    if (status !== 'complete') return

    const outer = [
      new AMap.LngLat(-360, 90, true),
      new AMap.LngLat(-360, -90, true),
      new AMap.LngLat(360, -90, true),
      new AMap.LngLat(360, 90, true)
    ]
    const holes = result.districtList[0].boundaries
    const pathArray = [outer]
    pathArray.push(holes)
    polygon = new AMap.Polygon({
      pathL: pathArray,
      strokeColor: '',
      strokeWeight: 1,
      fillColor: '#DCF0F0',
      fillOpacity: 0.5
    })
    polygon.setPath(pathArray)
    map.add(polygon)
  })
  return polygon
}
