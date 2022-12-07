<template>
  <div class="x-chart">
    <highcharts v-if="!reset" :options="chartOptions" />
  </div>
</template>

<script>
export default {
  props: {
    chartOptions: {
      type: Object,
      required: true
    },
    reset: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.x-chart:deep(.highcharts-credits) {
  display: none;
}

.x-chart {
  min-height: 300px;
}
</style>
