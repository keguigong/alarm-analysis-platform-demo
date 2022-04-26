import { toCamelCase, toQueryString } from '@/utils'
import axios, { AxiosError } from 'axios'

/**
 * TOP10列表
 * http://pp-yapi.nioint.com/project/93/interface/api/812
 */
export const apiGetFttScore = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/web/apollo/v1/ftt/score/rank' + param)
    .then((res) => {
      const data = res.data
      const camelData = toCamelCase(data)
      if (camelData.resultCode === 0) {
        return camelData.data
      }
      return
    })
    .catch((e: AxiosError) => {})
}

/**
 * TOP6设备告警大类别雷达图
 * http://pp-yapi.nioint.com/project/93/interface/api/821
 */
export const apiGetAlarmCategoryRaiseCount = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/web/apollo/v1/ftt/alarms/category-raise-count/rank' + param)
    .then((res) => {
      const data = res.data
      const camelData = toCamelCase(data)
      if (camelData.resultCode === 0) {
        return camelData.data
      }
      return
    })
    .catch((e: AxiosError) => {})
}

/**
 * 设备FTT变化历史
 * http://pp-yapi.nioint.com/project/93/interface/api/830
 */
export const apiGetFttHistory = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/web/apollo/v1/ftt/score/history' + param)
    .then((res) => {
      const data = res.data
      const camelData = toCamelCase(data)
      if (camelData.resultCode === 0) {
        return camelData.data
      }
      return
    })
    .catch((e: AxiosError) => {})
}

/**
 * 故障产生次数及原因
 * http://pp-yapi.nioint.com/project/93/interface/api/839
 */
export const apiGetAlarmRaiseCount = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/web/apollo/v1/ftt/alarms/raise-count/rank' + param)
    .then((res) => {
      const data = res.data
      const camelData = toCamelCase(data)
      if (camelData.resultCode === 0) {
        return camelData.data
      }
      return
    })
    .catch((e: AxiosError) => {})
}

/**
 * 单个故障产生历史及单次原因
 * http://pp-yapi.nioint.com/project/93/interface/api/848
 */
export const apiGetAlarmRaiseHistory = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/web/apollo/v1/ftt/alarms/raise-history' + param)
    .then((res) => {
      const data = res.data
      const camelData = toCamelCase(data)
      if (camelData.resultCode === 0) {
        return camelData.data
      }
      return
    })
    .catch((e: AxiosError) => {})
}
