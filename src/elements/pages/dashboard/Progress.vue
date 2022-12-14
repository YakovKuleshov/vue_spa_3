<template>
  <div class="progress">
    <svg>
      <circle class="circle_1" cx="50%" cy="50%" r="53" />
      <circle class="circle_2" cx="50%" cy="50%" r="53" :stroke-dashoffset="calcPersent" />
    </svg>
    <div class="progress__indicator">
      <div class="progress__value">{{ strValue }}%</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      indicatorValue: 0,
      strValue: 0
    }
  },
  computed: {
    calcPersent() {
      return 333 - this.indicatorValue / (100 / 333)
    }
  },
  activated() {
    if (this.value) {
      const interval = setInterval(() => {
        setTimeout(() => {
          this.strValue++
          if (this.strValue === this.value) {
            clearInterval(interval)
            this.indicatorValue = this.strValue
          }
        })
      }, 10)
    }
  },
  mounted() {
    if (this.value) {
      const interval = setInterval(() => {
        setTimeout(() => {
          this.strValue++
          if (this.strValue === this.value) {
            clearInterval(interval)
            this.indicatorValue = this.strValue
          }
        })
      }, 10)
    }
  }
}
</script>

<style scoped>
.progress {
  position: relative;
  width: 131px;
  height: 131px;
  background: #2c2f33;
  border-radius: 50%;
  display: flex;
  box-shadow: inset -6.22302px -6.22302px 6.22302px #3b4451, inset 3.73381px 3.73381px 6.22302px #000000;
}

.progress svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateZ(90deg);
  width: 100%;
  height: 100%;
}

.circle_1,
.circle_2 {
  fill: none;
  stroke-width: 10.5px;
}

.circle_1 {
  stroke: transparent;
}

.circle_2 {
  stroke: #65a8fc;
  stroke-dasharray: 333;
  transform-origin: center;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s ease;
}

.progress__indicator {
  position: absolute;
  width: 95px;
  height: 95px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #2c2f33;
  box-shadow: 16.5697px 16.5697px 41.4243px rgba(0, 0, 0, 0.5);
}

.progress__value {
  position: absolute;
  width: 75px;
  height: 75px;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2c2f33;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow: inset -16.5697px -16.5697px 41.4243px rgba(59, 68, 81, 0.5), inset 16.5697px 16.5697px 41.4243px rgba(0, 0, 0, 0.5);
  color: #eeeeee;
  font-weight: 600;
  font-size: 18px;
}
</style>
