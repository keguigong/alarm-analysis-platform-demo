import camelCase from 'camelcase-keys'

export default function toCamelCase(value: any, options?: any) {
  return camelCase(value, { deep: true, ...options })
}
