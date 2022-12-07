<template>
  <div class="statistics">
    <div class="statistics__row">
      <labels-chart :chart-data="chartOptions.series" />
      <span class="period">
        Период: {{ filters.period.start.toLocaleDateString() }} -
        {{ filters.period.end.toLocaleDateString() }}
      </span>
    </div>
    <x-chart :chart-options="chartOptions" :preloader="preloader" :reset="resetChart" />
    <dynamics-list :period-list="chartOptions.xAxis.categories" :datasets="chartOptions.series" :preloader="preloader" />
  </div>
</template>

<style scoped>
.statistics__row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.chart__labels {
  padding-right: 12px;
  border-right: 1px solid #ededed;
  height: 26px;
}

@media (max-width: 768px) {
  .statistics__row {
    display: block;
  }

  .chart__labels {
    border: none;
  }

  .period {
    margin: 10px 0;
    display: block;
  }

  .statistics__row .current__period {
    padding: 0;
  }
}

@media (max-width: 560px) {
  .chart__labels {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 30px;
    height: auto;
  }
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
  height: 12px;
}

.download__icon {
  margin-right: 4px;
  color: grey;
}

.not-permit-tariff {
  position: relative;
  min-height: 370px;
}

.period {
  font-size: 15px;
  color: grey;
  padding-left: 10px;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>

<script>
import XChart from './XChart.vue'
import DynamicsList from '@/elements/pages/Dynamics/DynamicsList.vue'
import LabelsChart from './LabelsChart.vue'
import calcPeriod from '@/mixins/calcPeriod'

export default {
  mixins: [calcPeriod],
  components: {
    LabelsChart,
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
          type: 'spline',
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
                color: '#fd8e39',
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
                color: '#3cc13b',
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
            },
            opposite: true
          }
        ],
        legend: {
          enabled: false
        },
        series: [
          {
            yAxis: 0,
            name: 'Цена, руб',
            data: [],
            color: '#fd8e39',
            visible: true
          },
          {
            yAxis: 1,
            name: 'Цена со скидкой, руб',
            data: [],
            color: '#3cc13b',
            visible: true
          },
          {
            yAxis: 2,
            name: 'Продажи, шт',
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

      this.chartOptions.series.forEach((el) => {
        const randomNumber = Math.round(Math.random() * 1000)
        el.label = el.name
        el.data = this.calcPeriod.map(() => Math.round(Math.random() * randomNumber))

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
