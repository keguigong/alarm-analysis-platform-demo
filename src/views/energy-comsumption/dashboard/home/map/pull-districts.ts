export default function pullDistrictPolygon(adcode: string) {
  const { AMap } = window
  return new Promise((resolve, reject) => {
    new AMap.DistrictSearch({
      level: 'province',
      showbiz: false,
      extensions: 'all',
      subdistrict: 0
    }).search(adcode, (status: string, result: any) => {
      if (status !== 'complete') return
      const boundaries = result.districtList[0].boundaries
      resolve(boundaries)
    })
  })
}
