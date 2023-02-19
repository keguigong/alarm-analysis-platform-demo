import { toCamelCase, toSnakeCase, toQueryString } from '@/utils'
import axios, { AxiosError } from 'axios'

/**
 * 故障原因诊断
 */
export const apiGetDiagnosis = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/' + param)
    .then((res) => {
      return {
        totalResults: 100,
        list: [
          {
            alarmRaiseTime: 1645056000000,
            alarmTypeId: 111,
            alarmId: 222,
            alarmDescription: '描述描述描述描述描述描述描述描述',
            regionCode: 404045,
            regionCn: '上海',
            automaticDiagnosis: '诊断诊断诊断诊断诊断诊断诊断',
            manualDiagonosis: '诊断诊断诊断诊断诊断诊断诊断',
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            softwareVesion: '1.0.0',
            serviceAge: 2,
            serviceStartTime: 1644969600000,
            serviceEndTime: 1645056000000
          },
          {
            alarmRaiseTime: 1645056000000,
            alarmTypeId: 111,
            alarmId: 222,
            alarmDescription: '描述描述描述描述描述描述描述描述',
            regionCode: 404045,
            regionCn: '上海',
            automaticDiagnosis: '诊断诊断诊断诊断诊断诊断诊断',
            manualDiagonosis: '诊断诊断诊断诊断诊断诊断诊断',
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            softwareVesion: '1.0.0',
            serviceAge: 2,
            serviceStartTime: 1644969600000,
            serviceEndTime: 1645056000000
          },
          {
            alarmRaiseTime: 1645056000000,
            alarmTypeId: 111,
            alarmId: 222,
            alarmDescription: '描述描述描述描述描述描述描述描述',
            regionCode: 404045,
            regionCn: '上海',
            automaticDiagnosis: '诊断诊断诊断诊断诊断诊断诊断',
            manualDiagonosis: '诊断诊断诊断诊断诊断诊断诊断',
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            softwareVesion: '1.0.0',
            serviceAge: 2,
            serviceStartTime: 1644969600000,
            serviceEndTime: 1645056000000
          },
          {
            alarmRaiseTime: 1645056000000,
            alarmTypeId: 111,
            alarmId: 222,
            alarmDescription: '描述描述描述描述描述描述描述描述',
            regionCode: 404045,
            regionCn: '上海',
            automaticDiagnosis: '诊断诊断诊断诊断诊断诊断诊断',
            manualDiagonosis: '诊断诊断诊断诊断诊断诊断诊断',
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            softwareVesion: '1.0.0',
            serviceAge: 2,
            serviceStartTime: 1644969600000,
            serviceEndTime: 1645056000000
          },
          {
            alarmRaiseTime: 1645056000000,
            alarmTypeId: 111,
            alarmId: 222,
            alarmDescription: '描述描述描述描述描述描述描述描述',
            regionCode: 404045,
            regionCn: '上海',
            automaticDiagnosis: '诊断诊断诊断诊断诊断诊断诊断',
            manualDiagonosis: '诊断诊断诊断诊断诊断诊断诊断',
            deviceId: 'XX-XXX-1234567890',
            deviceName: '名称名称名称名称名称名称名称',
            softwareVesion: '1.0.0',
            serviceAge: 2,
            serviceStartTime: 1644969600000,
            serviceEndTime: 1645056000000
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
 * 人工诊断故障选项
 */
export const apiGetDiagnosisOptions = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/' + param)
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
 * 人工诊断故障
 */
export const apiPostManualDiagnosis = (query: any) => {
  return axios
    .post('/', {
      ...toSnakeCase(query)
    })
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
 * 高速录播PLC选项
 */
export const apiGetHighSpeedPlcOptions = () => {
  return axios
    .get('/')
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
 * 传感器选项
 */
export const apiGetSensorOptions = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/' + param)
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
 * 传感器
 */
export const apiGetSensorRecord = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/' + param)
    .then((res) => {
      const data = res.data
      const camelData = toCamelCase(data, { stopPaths: ['data.list'] })
      if (camelData.resultCode === 0) {
        return camelData.data
      }
      return
    })
    .catch((e: AxiosError) => {})
}

/**
 * 故障发生时高速录播数据
 */
export const apiGetHightSpeedRecord = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/' + param)
    .then((res) => {
      const data = res.data
      const camelData = toCamelCase(data, { stopPaths: ['data.list'] })
      if (camelData.resultCode === 0) {
        return camelData.data
      }
      return
    })
    .catch((e: AxiosError) => {})
}

/**
 * 高速录播传感器选项
 */
export const apiGetHighSpeedSensorOptions = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/' + param)
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
 * 高速录播传感器
 */
export const apiGetHighSpeedSensorRecord = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/' + param)
    .then((res) => {
      const data = res.data
      const camelData = toCamelCase(data, { stopPaths: ['data.list'] })
      if (camelData.resultCode === 0) {
        return camelData.data
      }
      return
    })
    .catch((e: AxiosError) => {})
}
