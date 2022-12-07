<template>
  <div class="info-banner">
    <div class="info-banner__title">{{ title }}</div>
    <div class="info-banner__value">{{ value === 'Скоро' ? value : Math.floor(+value).toLocaleString('ru') }}</div>
    <div class="row-container">
      <span
        v-if="profit !== '' && title !== 'Остатки, шт'"
        class="profit"
        :class="+profit > 0 ? 'green__value' : +profit === 0 ? 'grey__value' : 'red__value'"
      >
        {{ formatProfit }}%
      </span>
      <div class="info-icon" @mouseenter="showTooltip" @mouseleave="hideTooltip">
        <p-icon name="info" viewBox="0 0 24 24" />
        <tooltip ref="tooltip">
          <div class="info-icon__text">{{ text }}</div>
        </tooltip>
      </div>
    </div>
    <div v-if="preloader" class="info-banner__loader">
      <x-loader />
    </div>
  </div>
</template>

<script>
import Tooltip from './Tooltip.vue'
import PIcon from '@/elements/p-icon/PIcon.vue'
import XLoader from './XLoader.vue'

export default {
  components: {
    Tooltip,
    PIcon,
    XLoader
  },
  props: {
    title: {
      type: String
    },
    value: {
      type: [Number, String]
    },
    profit: {
      type: [Number, String]
    },
    preloader: {
      type: Boolean,
      default: false
    },
    text: {
      type: String
    }
  },
  computed: {
    formatProfit() {
      return this.profit > 0 ? `+${this.profit.toLocaleString('ru')}` : this.profit.toLocaleString('ru')
    }
  },
  methods: {
    showTooltip() {
      const tooltip = this.$refs.tooltip.$el
      const tooltipLeftPos = tooltip.getBoundingClientRect().left
      const pageLeftPos = document.querySelector('.product-page').getBoundingClientRect().left
      const tooltipRightPos = tooltip.getBoundingClientRect().right
      const pageRightPos = document.querySelector('.product-page').getBoundingClientRect().right

      if (tooltipLeftPos < pageLeftPos) {
        tooltip.classList.add('tooltip__not__match__right')
      }

      if (tooltipRightPos > pageRightPos) {
        tooltip.classList.add('tooltip__adaptive_right')
      }

      tooltip.classList.add('tooltip_active')
    },
    hideTooltip() {
      const tooltip = this.$refs.tooltip.$el
      tooltip.classList.remove('tooltip__not__match__right')
      tooltip.classList.remove('tooltip__adaptive_left')
      tooltip.classList.remove('tooltip__adaptive_right')
      this.$refs.tooltip.$el.classList.remove('tooltip_active')
    }
  }
}
</script>

<style scoped>
.info-banner {
  position: relative;
  padding: 18px;
  box-shadow: 0px 6px 16px rgba(5, 2, 55, 0.04);
  border-radius: 8px;
  border: 1px solid #e5e5e9;
  background: #fff;
}

.info-banner .x-loader--overlay {
  border-radius: 8px;
}

.tooltip {
  bottom: 28px !important;
}

.info-banner__title {
  color: #3c3c47;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 8px;
}

.info-banner__value {
  color: #3c3c47;
  font-size: 26px;
  line-height: 29px;
  margin-bottom: 3px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.row-container {
  display: flex;
  align-items: center;
}

.profit {
  font-size: 18px;
  line-height: 18px;
  font-weight: bold;
  margin-right: 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.green__value {
  color: #09c89f;
}

.red__value {
  color: #f00;
}

.grey__value {
  color: #333;
}

.info-icon {
  position: relative;
  transform: translateY(-1px);
  color: #cacad3;
  z-index: 1;
  display: flex;
  align-items: center;
}

.info-icon .p-icon {
  width: 18px;
  height: 18px;
}

.info-icon:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.info-icon__text {
  white-space: nowrap;
}

.info-banner:deep(.lds-spinner div:after) {
  top: 16px;
  width: 4px;
  height: 12px;
}

.info-banner__loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  z-index: 1;
  border-radius: 8px;
}
</style>
