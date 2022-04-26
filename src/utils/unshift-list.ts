export default function unshiftList<T>(
  list: T[],
  item: T,
  maxLength = 100
): T[] {
  if (list.length >= maxLength) list.pop()
  list.unshift(item)
  return list
}
