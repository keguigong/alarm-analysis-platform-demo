<template>
  <div class="simple-calendar">
    <!-- 顶部年月 -->
    <div class="calendar-header">
      <button class="styled-button change-month-button" @click="prevMonth">
        &#60;
      </button>
      <div class="header-year-month">
        {{ panelTime.year }}/{{ panelTime.month + 1 }}
      </div>
      <button class="styled-button change-month-button" @click="nextMonth">
        &#62;
      </button>
    </div>

    <!-- 周日到周六 -->
    <div class="calendar-weekdays">
      <div
        class="weekday-label"
        v-for="(item, index) in state.weekdays"
        :key="index"
      >
        {{ item }}
      </div>
    </div>

    <div class="calendar-body">
      <!-- 周选择 -->
      <div class="calendar-week-num" v-if="hasWeekNum">
        <div
          class="day-cell week-cell"
          v-for="(week, index) in weekNumList"
          :key="index"
        >
          <div
            class="styled-button"
            :class="{
              'day-cell--selected':
                state.selectedWeekNum &&
                week.year.getFullYear() ===
                  state.selectedWeekNum.year.getFullYear() &&
                week.week === state.selectedWeekNum.week
            }"
            @click="handleWeekNumClick(week)"
          >
            {{ week.week }}
          </div>
        </div>
      </div>

      <!-- 日期选择 -->
      <div>
        <div class="calendar-body-row" v-for="i in 6" :key="i">
          <div
            class="day-cell"
            :class="{
              'day-cell--in-selection': inSelection(
                panelDays[(i - 1) * 7 + (j - 1)]
              ),
              'day-cell--start-date': isStartDate(
                panelDays[(i - 1) * 7 + (j - 1)]
              ),
              'day-cell--end-date': isEndDate(panelDays[(i - 1) * 7 + (j - 1)])
            }"
            v-for="j in 7"
            :key="j"
          >
            <div
              class="styled-button"
              :class="{
                'day-cell--today': isToday(panelDays[(i - 1) * 7 + (j - 1)]),
                'day-cell--not-current-month': !isCurrentMonth(
                  panelDays[(i - 1) * 7 + (j - 1)]
                ),
                'day-cell--selected':
                  isStartDate(panelDays[(i - 1) * 7 + (j - 1)]) ||
                  isSelected(panelDays[(i - 1) * 7 + (j - 1)]) ||
                  (!state.isPicking &&
                    isEndDate(panelDays[(i - 1) * 7 + (j - 1)]))
              }"
              @click="handleDateClick(panelDays[(i - 1) * 7 + (j - 1)])"
              @mouseover="handleDateMouseover(panelDays[(i - 1) * 7 + (j - 1)])"
            >
              {{ panelDays[(i - 1) * 7 + (j - 1)].getDate() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './day-panel.scss';
</style>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import dateUtil, { getYearMonthDay } from '@/utils/date-util'

@Component({
  name: 'day-panel'
})
export default class DayPanel extends Vue {
  @Prop() private value!: Date | Date[]

  @Prop({ default: false }) private isRange!: boolean

  @Prop({ default: true }) private disabledFrom!: Date

  @Prop({ default: 0 }) private startOfWeek!: number

  @Prop({ default: false }) private hasWeekNum!: boolean

  @Prop() private weekNum!: { week: number; year: Date }

  @Watch('value')
  watchValue(value: Date[] | Date | undefined) {
    if (typeof value === 'undefined') return
    const { isRange } = this
    if (isRange) {
      let { startDate, endDate } = this.state
      if (Array.isArray(value) && value.length === 2) {
        startDate !== value[0] && (this.state.startDate = value[0])
        endDate !== value[1] && (this.state.endDate = value[1])
        // 设置默认显示的月份
        this.panelTime = getYearMonthDay(value[1])
      }
    } else {
      this.state.selectedDate = value as Date
      // 设置默认显示的月份
      this.panelTime = getYearMonthDay(value as Date)
    }
  }

  @Watch('weekNum')
  watchWeekNum(value: any) {
    if (typeof value === 'undefined') return
    let { week } = value
    if (typeof week === 'undefined') return
    if (week < 1 || week > 53) return
    this.handleWeekNumClick(value, true)
  }

  @Emit('input')
  emitInput() {
    const { isRange } = this
    if (isRange) {
      const { startDate, endDate } = this.state
      const includeEndDate = new Date(
        (endDate as Date).getTime() + 60 * 60 * 24 * 1000 - 1
      )
      return [startDate, includeEndDate]
    } else {
      const { selectedDate } = this.state
      return selectedDate
    }
  }

  @Emit('change')
  emitChange() {
    return this.emitInput()
  }

  @Emit('weekNum')
  emitWeekNum() {
    let { selectedWeekNum } = this.state
    return selectedWeekNum
  }

  panelTime = getYearMonthDay(new Date())

  currentTime = getYearMonthDay(new Date())

  state = {
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    isPicking: false,
    weekdays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    selectedDate: undefined as Date | undefined,
    selectedWeekNum: undefined as { week: number; year: Date } | undefined
  }

  get panelDays() {
    const days: any[] = []
    let { panelTime } = this
    const firstDayOfMonth = new Date(panelTime.year, panelTime.month, 1)
    const weekday = firstDayOfMonth.getDay()
    const startDay = firstDayOfMonth.getTime() - weekday * 60 * 60 * 24 * 1000
    for (let i = 0; i < 42; i++) {
      days.push(new Date(startDay + i * 60 * 60 * 24 * 1000))
    }
    return days
  }

  get weekNumList() {
    let { startOfWeek, panelDays } = this
    let weeks: any[] = []
    for (let i = 0; i < 6; i++) {
      let week = dateUtil.getWeek(panelDays[7 * i], startOfWeek)
      weeks.push({
        week,
        year: panelDays[7 * i]
      })
    }
    return weeks
  }

  mounted() {
    this.watchValue(this.value)
    this.watchWeekNum(this.weekNum)
  }

  isCurrentMonth(date: Date): boolean {
    const { year, month } = getYearMonthDay(date)
    const { panelTime } = this
    return year === panelTime.year && month === panelTime.month
  }

  isToday(date: Date): boolean {
    const { year, month, day } = getYearMonthDay(date)
    const { currentTime } = this
    return (
      year === currentTime.year &&
      month === currentTime.month &&
      day === currentTime.day
    )
  }

  isSelected(date: Date): boolean {
    const { selectedDate } = this.state
    if (typeof selectedDate === 'undefined') return false

    const selected = getYearMonthDay(selectedDate)
    const { year, month, day } = getYearMonthDay(date)
    return (
      year === selected.year && month === selected.month && day === selected.day
    )
  }

  inSelection(date: Date): boolean {
    const { startDate, endDate } = this.state
    if (typeof startDate === 'undefined' || typeof endDate === 'undefined')
      return false
    return (
      date.getTime() >= startDate.getTime() &&
      date.getTime() <= endDate.getTime()
    )
  }

  isStartDate(date: Date): boolean {
    const { startDate: start } = this.state
    if (typeof start === 'undefined') return false
    const startDate = getYearMonthDay(start)
    const { year, month, day } = getYearMonthDay(date)
    return (
      year === startDate.year &&
      month === startDate.month &&
      day === startDate.day
    )
  }

  isEndDate(date: Date): boolean {
    const { endDate: end } = this.state
    if (typeof end === 'undefined') return false
    const endDate = getYearMonthDay(end)
    const { year, month, day } = getYearMonthDay(date)
    return (
      year === endDate.year && month === endDate.month && day === endDate.day
    )
  }

  handleDateClick(date: Date) {
    // this.panelTime = getYearMonthDay(date)
    const {
      isRange,
      state: { startDate, isPicking, selectedWeekNum }
    } = this
    if (isRange) {
      if (!isPicking) {
        this.state.startDate = date
        this.state.endDate = undefined
        this.state.isPicking = true
      } else if (startDate && date.getTime() >= startDate.getTime()) {
        this.state.endDate = date
        this.state.isPicking = false
        this.emitChange()
      } else if (startDate && date.getTime() < startDate.getTime()) {
        this.state.startDate = date
      }
    } else {
      this.state.selectedDate = date
      this.emitChange()
    }

    if (selectedWeekNum) {
      this.state.selectedWeekNum = undefined
      this.emitWeekNum()
    }
  }

  handleDateMouseover(date: Date) {
    const { isPicking, startDate } = this.state
    if (isPicking && startDate && date.getTime() >= startDate.getTime()) {
      this.state.endDate = date
    } else if (isPicking && startDate && date.getTime() < startDate.getTime()) {
      this.state.endDate = undefined
    }
  }

  handleWeekNumClick(value: any, isWatch = false) {
    let { week, year } = value
    let { startOfWeek } = this
    const range = dateUtil.getWeekRange(week, year, startOfWeek)
    if (typeof range === 'undefined') return
    this.state.startDate = new Date(range[0])
    this.state.endDate = new Date(range[1])
    this.state.isPicking = false
    this.state.selectedWeekNum = value
    if (!isWatch) {
      this.emitChange()
      this.emitWeekNum()
    }
  }

  prevMonth() {
    const {
      panelTime: { year, month }
    } = this
    const someDayOfCurrentMonth = new Date(year, month, 1)
    const currentMonth = someDayOfCurrentMonth.getMonth()
    someDayOfCurrentMonth.setMonth(currentMonth - 1)
    this.panelTime = getYearMonthDay(someDayOfCurrentMonth)
  }

  nextMonth() {
    const {
      panelTime: { year, month }
    } = this
    const someDayOfCurrentMonth = new Date(year, month, 1)
    const currentMonth = someDayOfCurrentMonth.getMonth()
    someDayOfCurrentMonth.setMonth(currentMonth + 1)
    this.panelTime = getYearMonthDay(someDayOfCurrentMonth)
  }
}
</script>
