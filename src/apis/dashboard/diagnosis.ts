import { toCamelCase, toSnakeCase, toQueryString } from '@/utils'
import axios, { AxiosError } from 'axios'

/**
 * 故障原因诊断
 * http://pp-yapi.nioint.com/project/93/interface/api/776
 */
export const apiGetDiagnosis = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/web/apollo/v1/ftt/logs/alarms/diagnosis' + param)
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
 * 人工诊断故障选项
 * http://pp-yapi.nioint.com/project/93/interface/api/947
 */
export const apiGetDiagnosisOptions = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/web/apollo/v1/ftt/logs/alarms/manual-diagnosis/options' + param)
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
 * http://pp-yapi.nioint.com/project/93/interface/api/794
 */
export const apiPostManualDiagnosis = (query: any) => {
  return axios
    .post('/web/apollo/v1/ftt/logs/alarms/manual-diagnosis', {
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
 * http://pp-yapi.nioint.com/project/93/interface/api/965
 */
export const apiGetHighSpeedPlcOptions = () => {
  return axios
    .get('/web/apollo/v1/ftt/plc/options')
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
 * http://pp-yapi.nioint.com/project/93/interface/api/956
 */
export const apiGetSensorOptions = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/web/apollo/v1/ftt/logs/sensor-records/options' + param)
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
 * http://pp-yapi.nioint.com/project/93/interface/api/803
 */
export const apiGetSensorRecord = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/web/apollo/v1/ftt/logs/sensor-records' + param)
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
 * http://pp-yapi.nioint.com/project/93/interface/api/803
 */
export const apiGetHightSpeedRecord = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/web/apollo/v1/ftt/logs/high-speed-record' + param)
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
 * http://pp-yapi.nioint.com/project/93/interface/api/1073
 */
export const apiGetHighSpeedSensorOptions = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/web/apollo/v1/ftt/logs/high-speed-sensor/options' + param)
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
 * http://pp-yapi.nioint.com/project/93/interface/api/1064
 */
export const apiGetHighSpeedSensorRecord = (query: any) => {
  const param = toQueryString(query)
  return axios
    .get('/web/apollo/v1/ftt/logs/high-speed-sensor' + param)
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
