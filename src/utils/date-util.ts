const ONE_DAY = 60 * 60 * 24 * 1000
const ONE_WEEK = 7 * ONE_DAY

const formatDateDay = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}/${month}/${day}`
}

const formatWeekNum = (value: { week: number; year: Date }) => {
  const { week, year } = value
  return `${year.getFullYear()} WEEK ${week}`
}

/**
 * 将Date处理为年月日
 * @param date 日期
 * @returns \{年, 月, 日\}
 */
const getYearMonthDay = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return {
    year,
    month,
    day
  }
}

/**
 * 获取完整的上一周的起止时间
 * @param date 日期
 * @param startOfWeek 一周从周几开始，0-周日 6-周六
 * @returns \{周， 年\}
 */
const getLastWeek = (date = new Date(), startOfWeek = 0) => {
  let week = getWeek(date, startOfWeek)
  let year = date
  if (week === 1) {
    week = 53
    year = new Date(date.getFullYear() - 1, 0, 1)
  } else {
    week -= 1
  }
  return { week, year }
}

const getLatestWeekUtilNow = () => {
  const currentDate = new Date().getTime()
  const fromDate = currentDate - ONE_WEEK
  return [fromDate, currentDate]
}

/**
 * 返回到现在为止的最近一周
 * @returns [开始时间戳, 结束时间戳]
 */
const getLatestWeekUntilEndOfToday = () => {
  const currentDate = new Date()
  const currentDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  )
  const startTime = currentDay.getTime() - 6 * ONE_DAY
  const endTime = currentDay.getTime() + ONE_DAY - 1
  return [startTime, endTime]
}

/**
 * 获取date是一年的第几周
 * @param date 日期
 * @param startOfWeek 一周从周几开始，0-周日 6-周六
 * @returns 一年的第几周
 */
const getWeek = (date: Date = new Date(), startOfWeek = 0) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const currentDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  )
  // 计算第一周有多少天
  const firstDayWeekday = firstDayOfYear.getDay()
  const firstWeekDays =
    startOfWeek - firstDayWeekday > 0
      ? startOfWeek - firstDayWeekday
      : 7 - Math.abs(startOfWeek - firstDayWeekday)
  // 计算date到第一周的完整周数
  const gapToFirstWeek =
    currentDay.getTime() - firstDayOfYear.getTime() - firstWeekDays * ONE_DAY
  let fullWeeks = 0
  if (gapToFirstWeek > 0) {
    fullWeeks = Math.floor(gapToFirstWeek / ONE_WEEK)
  }
  // 计算最后一周
  let extraWeek = 0
  if (
    (currentDay.getTime() -
      firstDayOfYear.getTime() -
      firstWeekDays * ONE_DAY) %
      ONE_WEEK >=
    0
  ) {
    extraWeek = 1
  }
  return 1 + fullWeeks + extraWeek
}

/**
 *
 * @param week 第几周
 * @param year 年
 * @param startOfWeek 一周从周几开始，0-周日 6-周六
 * @returns [开始时间戳, 结束时间戳]
 */
const getWeekRange = (week: number, year: Date, startOfWeek = 0) => {
  if (week < 1 || week > 53) return
  const firstDayOfYear = new Date(year.getFullYear(), 0, 1)
  const firstDayWeekday = firstDayOfYear.getDay()
  const firstWeekDays =
    startOfWeek - firstDayWeekday > 0
      ? startOfWeek - firstDayWeekday
      : 7 - Math.abs(startOfWeek - firstDayWeekday)
  const weekEndTime =
    firstDayOfYear.getTime() + firstWeekDays * ONE_DAY + ONE_WEEK * (week - 1)
  const weekStartTime = weekEndTime - ONE_WEEK
  return [weekStartTime, weekEndTime - ONE_DAY]
}

export default {
  getYearMonthDay,
  getLastWeek,
  getLatestWeekUtilNow,
  formatDateDay,
  formatWeekNum,
  getLatestWeekUntilEndOfToday,
  getWeek,
  getWeekRange
}

export {
  getYearMonthDay,
  getLastWeek,
  getLatestWeekUtilNow,
  formatDateDay,
  getLatestWeekUntilEndOfToday,
  getWeek,
  getWeekRange
}
