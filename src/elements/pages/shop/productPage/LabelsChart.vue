<template>
  <div class="chart__labels">
    <div
      v-for="item in chartData"
      class="chart__labels__item"
      :class="{
        chart__labels__item_active: item.visible,
        disabled: onePointLeft(item)
      }"
      :key="item.id"
      @click="hideChart(item)"
    >
      <div
        class="chart__labels__checkbox"
        :style="{
          backgroundColor: item.visible ? item.color : 'transparent'
        }"
      />
      <div class="chart__labels__label">{{ item.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.chart__labels {
  display: flex;
  align-items: center;
  user-select: none;
}

.chart__labels__item {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #000;
  font-size: 14px;
}

.chart__labels__item:not(:last-of-type) {
  margin-right: 8px;
}

.chart__labels__checkbox {
  position: relative;
  width: 13px;
  height: 13px;
  margin-right: 8px;
  background: #fff;
  border: 1px solid #cacad3;
  border-radius: 2px;
  flex-shrink: 0;
  transition: 0.3s;
}

.chart__labels__checkbox:after {
  content: '';
  position: absolute;
  display: none;
  top: 2px;
  left: 2px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  width: 7px;
  height: 4px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.chart__labels__label {
  white-space: nowrap;
}

.chart__labels__item_active .chart__labels__checkbox {
  border: 1px solid transparent;
}

.chart__labels__item_active .chart__labels__checkbox:after {
  display: block;
}

.disabled {
  pointer-events: none;
}
</style>

<script>
export default {
  props: {
    chartData: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  methods: {
    hideChart(item) {
      item.visible = !item.visible
    },
    onePointLeft(item) {
      return this.chartData.filter((el) => (item.visible ? el.visible : [])).length === 1
    }
  }
}
</script>
