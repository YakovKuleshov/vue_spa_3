<template>
  <div class="chart">
    <component v-if="show" :is="chartInstance" :chart-data="chartData" :options="options" />
  </div>
</template>

<style scoped>
.chart {
  position: relative;
  height: 300px;
}

.chart:deep(div) {
  height: 100%;
}
</style>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import { LineChart, BarChart } from 'vue-chart-3'

export default {
  components: {
    LineChart,
    BarChart
  },
  props: {
    chartData: {
      type: Object
    },
    options: {
      type: Object
    }
  },
  data() {
    return {
      chartInstance: 'LineChart',
      show: true
    }
  },
  watch: {
    'chartData.type'(type) {
      this.chartInstance = type
    },
    'chartData.datasets'() {
      this.show = false
      setTimeout(() => {
        this.show = true
      })
    }
  }
}
</script>
