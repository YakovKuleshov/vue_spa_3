<template>
  <div class="status">
    <div class="status__row">
      <span class="status__title">Monthly Stats</span>
      <span class="status__subtitle">85 901</span>
    </div>
    <div class="indicator">
      <div v-for="(item, index) in filledList" :key="item.label" class="indicator__item">
        <Indicator :class="{ indicator__indicator_center: index >= 5 && index <= 11 }" :value="item.value" ref="indicator" />
        <div class="indicator__label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Indicator from './Indicator.vue'

export default {
  components: {
    Indicator
  },
  methods: {
    animateIndicators() {
      let observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              observer.unobserve(en.target)
              this.$refs.indicator.forEach((el) => {
                el.localValue = el.value
              })
            }
          })
        },
        { threshold: 0.5 }
      )

      observer.observe(this.$el)
    },
    clearIndicatorsValues() {
      this.$refs.indicator.forEach((el) => {
        el.localValue = 0
      })
    }
  },
  computed: {
    filledList() {
      const arr = []
      for (let i = 7; i <= 22; i++) {
        arr.push({
          label: i,
          value: Math.floor(Math.random() * 100)
        })
      }

      return arr
    }
  },
  mounted() {
    this.animateIndicators()
  }
}
</script>

<style scoped>
.status {
  box-shadow: var(--shadow);
  border-radius: 8px;
  padding: 15px 43px 43px;
}

.status__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.status__title {
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.7px;
}

.status__subtitle {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
}

.indicator {
  height: 190px;
  display: flex;
  gap: 10px;
}

.indicator__item {
  display: flex;
  flex-direction: column;
}

.indicator__indicator_center:deep(.progress-bar__indicator) {
  background: #3755dd;
}

.indicator__label {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
}

@media (max-width: 604px) {
  .status .progress-bar {
    width: 100%;
  }

  .status .indicator__item {
    width: calc(100% / 16 - 9px) !important;
  }
}

@media (max-width: 576px) {
  .status {
    padding: 15px 20px 43px;
  }

  .status .progress-bar {
    width: 100%;
  }
}
</style>
