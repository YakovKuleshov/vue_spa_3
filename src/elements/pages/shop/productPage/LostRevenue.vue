<template>
  <div class="statistics">
    <div class="period">
      Период: {{ filters.period.start.toLocaleDateString() }} -
      {{ filters.period.end.toLocaleDateString() }}
    </div>
    <x-chart :chart-options="chartOptions" :preloader="preloader" :reset="resetChart" />
    <dynamics-list :period-list="chartOptions.xAxis.categories" :datasets="chartOptions.series" :preloader="preloader" />
  </div>
</template>

<style scoped>
.period__container {
  margin-left: -12px;
  margin-bottom: 5px;
}

.sales__scale {
  margin-top: 20px;
  padding: 0 12px 0 8px;
  border-right: 1px solid grey;
}

.sales__scale__value {
  position: relative;
  font-size: 10px;
  line-height: 13px;
  margin-bottom: 9.4px;
  text-align: right;
  font-weight: bold;
}

.sales__scale__value:after {
  content: '';
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  width: 8px;
  height: 1px;
  background: grey;
}

.title__row {
  display: flex;
  align-items: center;
  margin: 20px 0 12px;
}

.download__icon {
  margin-right: 4px;
  color: grey;
}

.period {
  font-size: 15px;
  color: grey;
  padding-left: 10px;
  margin-bottom: 12px;
}
</style>

<script>
import XChart from './XChart.vue'
import DynamicsList from '@/elements/pages/Dynamics/DynamicsList.vue'
import calcPeriod from '@/mixins/calcPeriod'

export default {
  mixins: [calcPeriod],
  components: {
    XChart,
    DynamicsList
  },
  props: {
    filters: {
      type: Object
    }
  },
  data() {
    return {
      preloader: false,
      resetChart: false,
      chartOptions: {
        chart: {
          type: 'column',
          height: 300,
          style: {
            fontFamily: 'sans-serif'
          }
        },
        title: {
          text: ''
        },
        accessibility: {
          enabled: false
        },
        plotOptions: {
          series: {
            marker: {
              radius: 4
            }
          },
          spline: {
            marker: {
              symbol: 'circle'
            }
          }
        },
        tooltip: {
          shared: true
        },
        xAxis: {
          crosshair: true,
          categories: [],
          gridLineWidth: 1,
          labels: {
            style: {
              color: '#7b7b85',
              fontSize: 13,
              fontWeight: 'bold'
            }
          }
        },
        yAxis: [
          {
            labels: {
              style: {
                color: '#3e66fb',
                fontSize: 12
              }
            },
            type: 'linear',
            title: {
              text: ''
            }
          },
          {
            labels: {
              style: {
                color: '#3e66fb',
                fontSize: 12
              }
            },
            type: 'linear',
            title: {
              text: ''
            }
          }
        ],
        legend: {
          enabled: false
        },
        series: [
          {
            yAxis: 0,
            name: 'Выручка, руб',
            data: [],
            color: '#3e66fb',
            visible: true
          },
          {
            yAxis: 0,
            name: 'Упущенная выручка, руб',
            data: [],
            color: '#3e66fb',
            visible: true
          }
        ]
      }
    }
  },
  watch: {
    filters() {
      this.resetChart = true
      setTimeout(() => {
        this.resetChart = false
        this.renderChart()
      })
    }
  },
  methods: {
    renderChart() {
      this.chartOptions.xAxis.categories = this.calcPeriod

      const total = Math.floor(Math.random() * 500000)

      this.chartOptions.series[0].data = this.calcPeriod.map(() => Math.round(Math.random() * total))
      this.chartOptions.series[1].data = this.calcPeriod.map(() => Math.round(Math.random() * -total))

      this.chartOptions.series.forEach((el) => {
        el.label = el.name

        el.rows = el.data.map((val) => {
          return {
            value: val,
            difference: (Math.random() - 0.5) * 100
          }
        })
      })
    }
  },
  created() {
    this.renderChart()
  }
}
</script>
