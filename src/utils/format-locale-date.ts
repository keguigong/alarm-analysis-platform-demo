export default function formatLocaleDate(
  value: string | number,
  miliseconds = false
) {
  if (typeof value === 'number') {
    const date = new Date(value)
    const localeStr = date.toLocaleString('zh-CN', { hour12: false })
    if (miliseconds) return localeStr + `.${date.getMilliseconds()}`
    else return localeStr
  } else {
    return '-'
  }
}
