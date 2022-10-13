<template>
  <div class="calendar">
    <div class="calendar__header">
      <div class="calendar__chevron prev__chevron" @click="prevMonth" />
      <div class="calendar__title">{{ dateValue }}</div>
      <div class="calendar__chevron next__chevron" @click="nextMonth" />
    </div>
    <div class="calendar__row">
      <div class="calendar__aside">
        <div class="calendar__aside__item">1</div>
        <div class="calendar__aside__item">2</div>
        <div class="calendar__aside__item">3</div>
        <div class="calendar__aside__item">4</div>
        <div class="calendar__aside__item">5</div>
        <div class="calendar__aside__item">6</div>
      </div>
      <div class="calendar__content">
        <div class="content__header">
          <div class="header__title">Пн</div>
          <div class="header__title">Вт</div>
          <div class="header__title">Ср</div>
          <div class="header__title">Чт</div>
          <div class="header__title">Пт</div>
          <div class="header__title">Сб</div>
          <div class="header__title">Вс</div>
        </div>
        <div class="week__days">
          <div
            v-for="date in monthList"
            :key="date.toLocaleDateString()"
            class="day__item"
            :class="{
              today: isCurrentDay(date),
              not__current__month: current !== date.getMonth(),
              selected__one: isEqual(val_1, date),
              selected__two: isEqual(val_2, date),
              is__before: beforeVal(date),
              is__after: afterVal(date),
              laighter: isInDapazone(date)
            }"
            @click="selectDate(date)"
            @mouseover="overMouse(date)"
          >
            {{ formatDate(date) }}
          </div>
        </div>
      </div>
    </div>
    <x-btn class="primary" :disabled="!val_1 && val_2" @click="selectedDates"> Выбрать </x-btn>
  </div>
</template>
<style lang="stylus" scoped>
.primary
  background orange
  margin-top auto

.calendar
  width 281px
  height 310px
  background #fff
  padding 30px 20px
  box-shadow 2px 6px 16px rgba(5, 2, 55, 0.1)
  border-radius 4px
  box-sizing border-box
  display flex
  flex-direction column

.calendar__header
  display flex
  align-items center
  justify-content space-between
  margin-bottom 10px

.calendar__chevron
  width 16px
  height 16px
  cursor pointer
  // background url('../assets/icons/chevron_2.svg') no-repeat center
  background-size contain

.next__chevron
  transform scale(-1)

.calendar__title
  font-size 14
  line-height 22px
  color gray
  font-weight bold
  text-transform capitalize

.header__title
  font-weight bold
  font-size 12px
  line-height 19px
  color gray
  width calc(100% / 7)
  text-align center

.calendar__row
  display flex

.calendar__aside
  display flex
  flex-direction column
  margin-right 17px
  padding-bottom 3px

.calendar__aside__item
  width 18px
  height 17px
  background #dedede
  margin-bottom 4px
  font-size 12px
  color #7B7B85
  text-align center
  line-height 17px
  &:nth-child(1)
    margin-top auto
  &:last-of-type
    margin-bottom 0

.calendar__content
  flex-grow 1

.content__header
  display flex
  justify-content space-between
  margin-bottom 11px

.week__days
  display flex
  flex-wrap wrap

.day__item
  width calc(100% / 7)
  font-size 12px
  line-height 19px
  text-align center
  color #3C3C47
  box-sizing border-box
  border 1px solid transparent
  cursor pointer

.today
  box-shadow 0 0 0 2px #07f inset

.not__current__month
  opacity .5

.laighter
  background #07f
  opacity .5

.selected__one, .selected__two
  background #07f
  color #fff

.is__before
  border-radius 4px 0 0 4px

.is__after
  border-radius 0 4px 4px 0
</style>
<script>
export default {
  name: 'RangeDataPicker',
  data() {
    return {
      date: new Date(),
      val_1: '',
      val_2: '',
      current: 0,
      flag: false
    }
  },
  watch: {
    current(val) {
      this.date.setMonth(val, 1)
    }
  },
  computed: {
    monthList() {
      const selectedtMonth = []
      for (let i = 1; i <= this.daysInSelectedMonth; i++) {
        selectedtMonth.push(new Date(this.date.getFullYear(), this.current, i))
      }
      const prevMonth = []
      const firstDaySelectedMonth = new Date(this.date.getFullYear(), this.current, 1).getDay()
      for (let i = firstDaySelectedMonth ? firstDaySelectedMonth - 1 : 6; i > 0; i--) {
        prevMonth.push(new Date(this.date.getFullYear(), this.current - 1, this.daysInPrevMonth - i + 1))
      }
      const nextMonth = []
      const daysInNextMonth = 42 - (this.daysInSelectedMonth + prevMonth.length)
      for (let i = 1; i <= daysInNextMonth; i++) {
        nextMonth.push(new Date(this.date.getFullYear(), this.current + 1, i))
      }
      return [...prevMonth, ...selectedtMonth, ...nextMonth]
    },
    daysInPrevMonth() {
      // const year = this.date.getFullYear().toString().slice(2)
      return new Date(this.date.getFullYear(), this.current, 0).getDate()
    },
    daysInSelectedMonth() {
      const year = this.date.getFullYear().toString().slice(2)
      return new Date(year, this.current + 1, 0).getDate()
    },
    dateValue() {
      return this.date
        .toLocaleString([], {
          month: 'long',
          year: 'numeric',
          current: this.current
        })
        .replace('г.', '')
    }
  },
  created() {
    this.current = new Date().getMonth()
  },
  methods: {
    nextMonth() {
      this.current++
      if (this.current > 11) {
        this.current = 0
        this.date.setFullYear(this.date.getFullYear() + 1)
      }
    },
    prevMonth() {
      this.current--
      if (this.current < 0) {
        this.current = 11
        this.date.setFullYear(this.date.getFullYear() - 1)
      }
    },
    selectDate(date) {
      if (this.isBefore(date, new Date()) && !this.val_2) {
        this.val_1 = date
        this.flag = true
      } else if (this.val_2 && this.flag) {
        this.flag = false
      } else if (!this.flag) {
        this.flag = true
        this.val_1 = ''
        this.val_2 = ''
      }
    },
    overMouse(date) {
      if (!this.flag) return false
      if (this.val_1 && this.isBefore(date, new Date())) this.val_2 = date
    },
    isCurrentDay(day) {
      return new Date().toLocaleDateString() === day.toLocaleDateString()
    },
    isInDapazone(date) {
      if (this.isAfter(date, this.val_1) && this.isBefore(date, this.val_2)) return true
      if (this.isBefore(date, this.val_1) && this.isAfter(date, this.val_2)) return true
    },
    isBefore(date1, date2) {
      return date1 && date2 ? date1.getTime() < date2.getTime() : false
    },
    isAfter(date1, date2) {
      return date1 && date2 ? date1.getTime() > date2.getTime() : false
    },
    beforeVal(date) {
      if (this.val_1 && this.val_2) {
        if (this.isEqual(this.val_1, date) && this.isBefore(this.val_1, this.val_2)) return true
        if (this.isEqual(this.val_2, date) && this.isBefore(this.val_2, this.val_1)) return true
      } else {
        return false
      }
    },
    afterVal(date) {
      if (this.val_1 && this.val_2) {
        if (this.isEqual(this.val_1, date) && this.isAfter(this.val_1, this.val_2)) return true
        if (this.isEqual(this.val_2, date) && this.isAfter(this.val_2, this.val_1)) return true
      } else {
        return false
      }
    },
    isEqual(date1, date2) {
      return date1 && date2 ? date1.getTime() === date2.getTime() : false
    },
    selectedDates() {
      const dateRange = {
        start: this.isBefore(this.val_1, this.val_2) ? this.val_1 : this.val_2,
        end: this.isAfter(this.val_2, this.val_1) ? this.val_2 : this.val_1
      }
      console.log(dateRange)
      // this.$emit('dateRangeSelected', dateRange)
    },
    formatDate(date) {
      return date.toLocaleDateString([], {
        day: 'numeric'
      })
    }
  }
}
</script>
