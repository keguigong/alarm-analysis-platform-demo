import snakeCaseKeys from 'snakecase-keys'

interface FilterObj {
  [index: string]: string | number
}

/**
 * 把筛选对象转化为下划线形式的参数字符串，可以直接URL中使用
 * @param filterObj 需要使用URL参数进行筛选的对象
 */
export default function filterString(filterObj: FilterObj): string {
  const snakecaseObj = snakeCaseKeys(filterObj) as any
  const keysArr = Object.keys(snakecaseObj)
  if (keysArr.length === 0) {
    return ''
  }
  const querystringArr: string[] = keysArr
    .map((key: string) => {
      if (
        typeof snakecaseObj[key] === 'undefined' ||
        snakecaseObj[key] === ''
      ) {
        return ''
      }
      return (
        encodeURI(key) +
        '=' +
        (typeof snakecaseObj[key] === 'string'
          ? snakecaseObj[key]
          : encodeURI(snakecaseObj[key]))
      )
    })
    .filter((query: string) => query !== '')

  if (querystringArr.length === 0) {
    return ''
  }
  return '?' + querystringArr.join('&')
}
