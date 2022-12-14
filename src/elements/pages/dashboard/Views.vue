<template>
  <div class="views">
    <div class="views__row">
      <span class="views__title">Monthly Project Views</span>
      <span class="views__subtitle">17 221</span>
    </div>
    <x-chart v-if="inView" :chart-options="chartOptions" :reset="resetChart" />
  </div>
</template>

<script>
import XChart from '@/elements/pages/shop/productPage/XChart.vue'

export default {
  components: {
    XChart
  },
  data() {
    return {
      resetChart: false,
      inView: false,
      chartOptions: {
        chart: {
          backgroundColor: 'transparent',
          type: 'spline',
          height: 200,
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
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          gridLineWidth: 0,
          lineColor: 'transparent',
          labels: {
            style: {
              color: 'var(--color)',
              fontSize: 12,
              fontWeight: 'bold'
            }
          }
        },
        yAxis: {
          // min: 0,
          // max: 700,
          gridLineColor: 'rgba(77, 150, 190, 0.3)',
          labels: {
            style: {
              color: 'var(--color)',
              fontSize: 12
            }
          },
          type: 'linear',
          title: {
            text: ''
          }
        },
        legend: {
          enabled: false
        },
        series: [
          {
            yAxis: 0,
            name: 'views',
            data: [],
            color: 'tomato',
            visible: true,
            shadow: {
              color: '#000',
              opacity: 0.1,
              width: 5,
              offsetX: 5,
              offsetY: 5,
              inside: true
            }
          }
        ]
      }
    }
  },
  methods: {
    renderChart() {
      this.chartOptions.series[0].data = this.chartOptions.xAxis.categories.map(() => Math.round(Math.random() * 500))
    },
    animateChart() {
      let observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              observer.unobserve(en.target)
              this.inView = true
            }
          })
        },
        { threshold: 0.5 }
      )

      observer.observe(this.$el)
    }
  },
  mounted() {
    this.renderChart()
    this.animateChart()
  }
}
</script>

<style scoped>
.views {
  box-shadow: var(--shadow);
  border-radius: 8px;
  padding: 15px 20px 20px;
  width: 100%;
  overflow: hidden;
}

.views:deep(.x-chart) {
  min-height: 175px;
}

.views__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.views__title {
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.7px;
}

.views__subtitle {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
}
</style>
