import { toCamelCase, toSnakeCase, toQueryString } from '@/utils'
import axios, { AxiosError } from 'axios'

// axios.defaults.baseURL = 'https://apis.map.qq.com'
const key = 'JYTBZ-DS4KG-IIPQP-ISZ3S-4R3J2-ZCFHN'

/**
 * 获取下级行政区划
 * https://lbs.qq.com/service/webService/webServiceGuide/webServiceDistrict
 */
export const tmapGetDistrictChildren = (query: any) => {
  const param = toQueryString({ ...query, key })
  return axios
    .get('/ws/district/v1/getchildren' + param)
    .then((res) => {
      const data = res.data
      const camelData = toCamelCase(data)
      if (camelData.status === 0) {
        return camelData.result
      }
      return
    })
    .catch((e: AxiosError) => {})
}
