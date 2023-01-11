<template>
  <div class="weather-chart">
    <highcharts :options="chartOptions" />
    <Preloader v-if="loading" />
  </div>
</template>

<script>
import Preloader from '@/elements/preloader/Preloader.vue'

export default {
  components: {
    Preloader
  },
  data() {
    return {
      loading: false,
      chartOptions: {
        chart: {
          backgroundColor: '#6c879c',
          type: 'spline' // spline, line, column, pie, area
        },
        title: {
          text: 'Погода на 8 дней',
          style: {
            fontSize: 25,
            color: '#000',
            fontWeight: 'bold',
            textShadow: '2px 8px 10px rgba(0,0,0,.5)'
          }
        },
        subtitle: {
          text: ''
        },
        accessibility: {
          enabled: false // убирает ворнинг в кансоле
        },
        plotOptions: {
          series: {
            connectNulls: true,
            marker: {
              radius: 2
            }
          },
          column: {
            grouping: false,
            stacking: 'normal'
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          useHTML: false,
          formatter() {
            return /*html*/ `<strong>&nbsp;${this.points[0].key.day}</strong>
                            <br>
                            <strong>Температура днем: ${
                              this.points[0].key.min > 0 ? '+' + this.points[0].key.min + ' °' : this.points[0].key.min + ' °'
                            } / ${
              this.points[0].key.max > 0 ? '+' + this.points[0].key.max + ' °' : this.points[0].key.max + ' °'
            }
                            <br>
                            ${this.points[0].key.conditions}
                            </strong>
                            `
          }
        },
        xAxis: {
          categories: [],
          labels: {
            style: {
              color: '#000',
              fontSize: 13,
              fontWeight: 'bold',
              textShadow: '2px 8px 10px rgba(0,0,0,.5)'
            },
            formatter() {
              return this.value.day
            }
          },
          gridLineWidth: 1,
          gridLineColor: '#7796ad'
        },
        yAxis: [
          {
            gridLineWidth: 1,
            gridLineColor: '#7796ad',
            labels: {
              style: {
                color: '#000',
                fontSize: 14,
                fontWeight: 'bold',
                textShadow: '2px 6px 10px rgba(0,0,0,.5)'
              },
              formatter() {
                return `${this.value > 0 ? `+${this.value}` : this.value} °`
              }
            },
            type: 'linear', // 'linear', 'logarithmic', 'datetime'
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
            data: [],
            color: '#00ffe1',
            shadow: {
              color: '#000',
              opacity: 0.03,
              width: 10,
              offsetX: 15,
              offsetY: 15,
              inside: true
            }
          }
        ]
      },
      weatherConditions: {
        Clear: 'Ясно',
        Clouds: 'Облачно',
        Rain: 'Дождь',
        Drizzle: 'Дождь',
        Thunderstorm: 'Гроза',
        Snow: 'Снег',
        Mist: 'Туман',
        Smoke: 'Туман'
      }
    }
  },
  methods: {
    async fetchWeather() {
      this.loading = true
      const url = 'http://api.openweathermap.org/data/2.5/onecall?lat=55.7522&lon=37.6156&APPID=12594a2144aa9c83dfdc5b5b4f7c3b93'
      try {
        const responce = await fetch(url)
        const res = await responce.json()

        this.chartOptions.xAxis.categories = res.daily.map((el) => {
          return {
            day: new Date(el.dt * 1000).toLocaleDateString(),
            conditions: this.weatherConditions[el.weather[0].main],
            min: Math.round(el.temp.min - 273.15),
            max: Math.round(el.temp.max - 273.15)
          }
        })

        this.chartOptions.series[0].data = res.daily.map((el) => {
          return {
            y: Math.round(el.temp.day - 273.15),
            marker: {
              symbol: `url(${require(`@/assets/img/${el.weather[0].icon}.png`)})`,
              width: 60,
              height: 45
            }
          }
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.fetchWeather()
  }
}
</script>

<style>
.weather-chart {
  position: relative;
}

.weather-chart .preloader {
  position: absolute;
}

.weather-chart .highcharts-credits {
  display: none;
}
</style>
