export default {
  computed: {
    calcPeriod() {
      this.chartData.datasets.forEach(el => {
        el.data = []
      })

      this.filters.period.start.setHours(0, 0, 0)
      this.filters.period.end.setHours(0, 0, 0)

      const startDate = new Date()

      const day = 86400
      const daysCount = Math.round((this.filters.period.end.getTime() - this.filters.period.start.getTime()) / day / 1000) + 1

      const arr = []
      let dayNumber = +Intl.DateTimeFormat('ru').format(this.filters.period.start).split('.')[0] - 1

      for (let i = 1; i <= daysCount; i++) {
        dayNumber = dayNumber + 1
        startDate.setFullYear(this.filters.period.start.getFullYear())
        startDate.setMonth(this.filters.period.start.getMonth(), dayNumber)
        arr.push(Intl.DateTimeFormat('ru').format(startDate))
      }

      return arr
    }
  },
  methods: {
    getDateObject(date) {
      return new Date(
        date
          .split('.')
          .reverse()
          .join(',')
      )
    }
  }
}
