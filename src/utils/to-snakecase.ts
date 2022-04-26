import snakecase from 'snakecase-keys'

export default function toSnakeCase(value: any) {
  return snakecase(value, { deep: true })
}
