<template>
  <div class="statistics-page">
    <h2 class="page__title">Динамика</h2>
    <div class="statistics">
      <div class="row__section">
        <chart-labels :chart-data="chartData.datasets" @hideChart="hideChart" />
        <select class="select" v-model="selectedPeriod">
          <option v-for="item in periodsList" :value="item" :key="item.id">
            {{ item.name }}
          </option>
        </select>
        <select class="select" v-model="chartData.type">
          <option v-for="item in chartTypes" :value="item.id" :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <!-- <selected-period :period="filters.period"></selected-period> -->
      <Chart :chart-data="chartDataFiltered" :options="options" />
      <div class="row__section">
        <h3 class="statistics__title">Анализ динамики</h3>
        <span class="period">
          Период: {{ filters.period.start.toLocaleDateString() }} -
          {{ filters.period.end.toLocaleDateString() }}
        </span>
      </div>
      <dynamics-list :period-list="chartData.labels" :datasets="chartData.datasets" />
    </div>
  </div>
</template>

<style scoped>
.statistics-page {
  max-width: 1300px;
  margin: 0 auto;
}

.statistics {
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 10px 21px 43px rgba(0, 0, 0, 0.3);
}

.page__title {
  margin-bottom: 40px;
  font-size: 40px;
}

.select {
  height: 35px;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  width: 210px;
  border: 1px solid #ccc;
  margin-left: 10px;
  font-size: 15px;
  background: #f8f8f8;
  padding: 0 5px;
  cursor: pointer;
  margin-left: 20px;
}

.row__section {
  display: flex;
  align-items: center;
  padding: 20px 0;
  height: 40px;
}

.statistics__title {
  margin: 0;
  letter-spacing: 0.02em;
}

.period {
  margin-left: 20px;
  font-size: 15px;
  color: grey;
}
</style>

<script>
import Chart from './Chart.vue'
import DynamicsList from './DynamicsList.vue'
import ChartLabels from './ChartLabels.vue'
import calcPeriod from './calcPeriod.js'

const start = new Date()
const end = new Date()

start.setMonth(start.getMonth(), Intl.DateTimeFormat('ru').format(start).replace(/\./g, '-').split('-')[0] - 6)

end.setMonth(end.getMonth(), Intl.DateTimeFormat('ru').format(end).replace(/\./g, '-').split('-')[0])

export default {
  mixins: [calcPeriod],
  components: {
    ChartLabels,
    Chart,
    DynamicsList
  },
  data() {
    return {
      filters: {
        period: {
          start,
          end
        }
      },
      selectedPeriod: {
        id: 'seven',
        name: '7 дней',
        days: 6
      },
      periodsList: [
        {
          id: 'seven',
          name: '7 дней',
          days: 6
        },
        {
          id: 'fourteen',
          name: '14 дней',
          days: 13
        }
      ],
      chartTypes: [
        {
          id: 'LineChart',
          name: 'Тип графика "Line"'
        },
        {
          id: 'BarChart',
          name: 'Тип графика "Bar"'
        }
      ],
      chartData: {
        type: 'LineChart',
        labels: [],
        datasets: [
          {
            id: 'products',
            label: 'Товары, шт',
            selected: true,
            data: [],
            backgroundColor: '#2CC545',
            borderColor: ['#2CC545'],
            borderWidth: 2,
            yAxisID: 'products'
          },
          {
            id: 'brands',
            label: 'Бренды, шт',
            selected: true,
            data: [],
            backgroundColor: '#8855DD',
            borderColor: ['#8855DD'],
            borderWidth: 2,
            yAxisID: 'brands'
          },
          {
            id: 'sales',
            label: 'Продажи, шт',
            selected: true,
            data: [],
            backgroundColor: '#43B2D4',
            borderColor: ['#43B2D4'],
            borderWidth: 2,
            yAxisID: 'sales'
          },
          {
            id: 'leftovers',
            label: 'Остатки, шт',
            selected: true,
            data: [],
            backgroundColor: '#ED5051',
            borderColor: ['#ED5051'],
            borderWidth: 2,
            yAxisID: 'leftovers'
          },
          {
            id: 'proceeds',
            label: 'Выручка, руб',
            selected: true,
            data: [],
            backgroundColor: '#3E66FB',
            borderColor: ['#3E66FB'],
            borderWidth: 2,
            yAxisID: 'proceeds'
          }
          // {
          //   id: 'lost_proceeds',
          //   label: 'Упущенная выручка, руб',
          //   data: [],
          //   backgroundColor: ['#ff6a00'],
          //   borderColor: ['#ff6a00'],
          //   borderWidth: 2
          // }
        ]
      },
      options: {
        interaction: {
          intersect: false // тултип при наведении на точки или на область
        },
        animation: true,
        plugins: {
          tooltip: {
            boxPadding: 5,
            interaction: {
              mode: 'index'
            }
          },
          legend: {
            display: false
            // labels: {
            //   usePointStyle: true,
            //   pointStyle: 'rect'
            // }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        lineTension: 0.3,
        scales: {
          leftovers: {
            id: 'leftovers',
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              color: '#ED5051'
            }
          },
          proceeds: {
            id: 'proceeds',
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              color: '#3E66FB'
            }
          },
          sales: {
            id: 'sales',
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              color: '#43B2D4'
            }
          },
          brands: {
            id: 'brands',
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              color: '#8855DD'
            }
          },
          products: {
            id: 'products',
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              drawOnChartArea: true
            },
            ticks: {
              color: '#2CC545'
            }
          }
        }
      }
    }
  },
  watch: {
    selectedPeriod(val) {
      const currentDate = new Date()
      currentDate.setMonth(
        currentDate.getMonth(),
        Intl.DateTimeFormat('ru').format(currentDate).replace(/\./g, '-').split('-')[0] - val.days
      )
      this.filters.period = { ...this.filters.period, start: currentDate, end }
      this.updateChartData()
    }
  },
  computed: {
    chartDataFiltered() {
      return {
        ...this.chartData,
        datasets: this.chartData.datasets.filter((el) => el.selected)
      }
    }
  },
  methods: {
    hideChart(item) {
      this.options.scales[item.id].display = item.selected
    },
    async loadDynamics() {
      this.options.animation = false
    },
    updateChartData() {
      this.chartData.labels = this.calcPeriod

      this.chartData.datasets.forEach((el) => {
        el.rows = this.chartData.labels.map((item) => {
          // console.log(item);
          const val = Math.floor(Math.random() * 10000)
          el[item] = val
          return {
            value: val,
            difference: Math.random() * 100
          }
        })

        el.data = this.chartData.labels.map((el) => Math.floor(Math.random() * 10000))
      })
    }
  },
  created() {
    this.updateChartData()
  },
  activated() {
    window.scrollTo({ top: 0 })
  }
}
</script>
