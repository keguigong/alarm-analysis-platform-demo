import { toCamelCase, toQueryString } from '@/utils'
import axios, { AxiosError } from 'axios'

const urlpath =
  process.env.NODE_ENV === 'production' ? '/sample-alarm-analysis-platform/' : '/'

/**
 * TOP10列表
 */
export const apiGetFttScore = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get(urlpath + param)
    .then((res) => {
      return {
        totalResults: 100,
        list: [
          {
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            timestamp: 1676790569422,
            overallScore: 0.912,
            mechanicalScore: 0.872,
            bayboltScore: 0.992
          },
          {
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            timestamp: 1676790569422,
            overallScore: 0.912,
            mechanicalScore: 0.872,
            bayboltScore: 0.992
          },
          {
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            timestamp: 1676790569422,
            overallScore: 0.912,
            mechanicalScore: 0.872,
            bayboltScore: 0.992
          },
          {
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            timestamp: 1676790569422,
            overallScore: 0.912,
            mechanicalScore: 0.872,
            bayboltScore: 0.992
          },
          {
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            timestamp: 1676790569422,
            overallScore: 0.912,
            mechanicalScore: 0.872,
            bayboltScore: 0.992
          },
          {
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            timestamp: 1676790569422,
            overallScore: 0.912,
            mechanicalScore: 0.872,
            bayboltScore: 0.992
          }
        ]
      }

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
 */
export const apiGetAlarmCategoryRaiseCount = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get(urlpath + param)
    .then((res) => {
      return {
        list: [
          {
            alarmCategory: '告警1',
            alarmCategoryId: 'alarm_1',
            raiseCount: 2,
            targetRaiseCount: 5
          },
          {
            alarmCategory: '告警2',
            alarmCategoryId: 'alarm_2',
            raiseCount: 30,
            targetRaiseCount: 20
          },
          {
            alarmCategory: '告警3',
            alarmCategoryId: 'alarm_3',
            raiseCount: 15,
            targetRaiseCount: 10
          },
          {
            alarmCategory: '告警4',
            alarmCategoryId: 'alarm_4',
            raiseCount: 12,
            targetRaiseCount: 15
          },
          {
            alarmCategory: '告警5',
            alarmCategoryId: 'alarm_4',
            raiseCount: 5,
            targetRaiseCount: 20
          },
          {
            alarmCategory: '告警6',
            alarmCategoryId: 'alarm_4',
            raiseCount: 12,
            targetRaiseCount: 15
          }
        ]
      }
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
 */
export const apiGetFttHistory = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get(urlpath + param)
    .then((res) => {
      return {
        list: [
          {
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            timestamp: 1644624000000,
            overallScore: 0.912,
            mechanicalScore: 0.872,
            bayboltScore: 0.992
          },
          {
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            timestamp: 1644710400000,
            overallScore: 0.912,
            mechanicalScore: 0.872,
            bayboltScore: 0.992
          },
          {
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            timestamp: 1644796800000,
            overallScore: 0.912,
            mechanicalScore: 0.872,
            bayboltScore: 0.992
          },
          {
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            timestamp: 1644883200000,
            overallScore: 0.912,
            mechanicalScore: 0.872,
            bayboltScore: 0.876
          },
          {
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            timestamp: 1644969600000,
            overallScore: 0.932,
            mechanicalScore: 0.872,
            bayboltScore: 0.992
          },
          {
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            timestamp: 1645056000000,
            overallScore: 0.923,
            mechanicalScore: 0.812,
            bayboltScore: 0.911
          }
        ]
      }
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
 */
export const apiGetAlarmRaiseCount = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get(urlpath + param)
    .then((res) => {
      return {
        list: [
          {
            alarmTypeId: 123,
            alarmDescription: '一个告警',
            alarmRaiseCount: 23,
            alarmDiagnosis: []
          },
          {
            alarmTypeId: 123,
            alarmDescription: '一个告警',
            alarmRaiseCount: 21,
            alarmDiagnosis: []
          },
          {
            alarmTypeId: 123,
            alarmDescription: '一个告警',
            alarmRaiseCount: 15,
            alarmDiagnosis: []
          },
          {
            alarmTypeId: 123,
            alarmDescription: '一个告警',
            alarmRaiseCount: 8,
            alarmDiagnosis: []
          },
          {
            alarmTypeId: 123,
            alarmDescription: '一个告警',
            alarmRaiseCount: 2,
            alarmDiagnosis: []
          }
        ]
      }
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
 */
export const apiGetAlarmRaiseHistory = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get(urlpath + param)
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
