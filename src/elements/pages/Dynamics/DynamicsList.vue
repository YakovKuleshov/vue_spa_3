<template>
  <div ref="mainContainer" class="list__wrapper">
    <div ref="scrollingContainer" class="list__container">
      <div class="list">
        <div
          class="list__header"
          :style="{
            gridTemplateColumns: `${width}px repeat(${periodList.length}, ${
              periodList.length > 1 ? `minmax(${calcWidth}, 1fr)) 10px` : '100px'
            }`
          }"
        >
          <div class="list__header__title"></div>
          <div
            v-for="item in periodList"
            :key="item"
            class="list__header__title"
            :class="{
              disabled: !sortable || sortedList.length === 1,
              active: sortable && sortOptions.field === item && sortedList.length !== 1
            }"
            @click="sortList(item)"
          >
            {{ item }}
            <div
              v-if="sortOptions.field === item && sortedList.length !== 1 && sortable"
              class="sort__icon"
              :class="{ sort__icon_asc: sortOptions.direction === '0' }"
            >
              <svg width="16" height="16">
                <use xlink:href="@/assets/arrow-down.svg#arrow-down"></use>
              </svg>
            </div>
          </div>
        </div>
        <div
          v-for="item in sortedList"
          :key="item.label"
          class="list__item"
          :style="{
            gridTemplateColumns: `${width}px repeat(${periodList.length}, ${
              periodList.length > 1 ? `minmax(${calcWidth}, 1fr)) 10px` : '100px'
            }`
          }"
        >
          <div class="list__item__section"></div>
          <div v-for="row in item.rows" :key="row.value + Math.random()" class="list__item__section">
            <div class="list__item__value">
              <span v-if="row.value !== null">
                {{ (+row.value).toLocaleString('ru') }}
              </span>
            </div>
            <!-- zero__profit: Math.round(row.difference) === 0 -->
            <div
              v-if="row.value !== null"
              class="profit__value"
              :class="{
                profit__value_hidden: !row.difference,
                profit__down: +row.difference < 0
              }"
            >
              <span>{{ formatDelta(row.difference) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="namesContainer" class="names__container">
      <div class="names__container__content">
        <div class="names__container__title">Показатели</div>
        <div v-for="item in sortedList" :key="item.label" class="name__item">
          <div class="name__link">{{ item.label }}</div>
        </div>
      </div>
    </div>
    <div class="shadow__container">
      <div class="shadow__content"></div>
    </div>
  </div>
</template>

<style scoped>
.list__wrapper {
  position: relative;
  overflow: hidden;
  user-select: none;
  margin-bottom: 20px;
}

.list__container {
  position: relative;
  overflow-x: auto;
  display: flex;
  scrollbar-width: thin;
  scrollbar-color: #ccc #fff;
}

.list__container::-webkit-scrollbar {
  height: 8px;
}

.list__container::-webkit-scrollbar-thumb {
  background: #ccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.list {
  position: relative;
  padding-bottom: 12px;
  flex-grow: 1;
}

.list__header {
  display: grid;
  grid-auto-rows: 34px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.list__header__title {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #000;
  font-size: 14px;
  padding: 0 10px 0 8px;
  white-space: nowrap;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}

.active {
  color: #000;
  font-weight: bold;
}

.sort__icon {
  position: absolute;
  top: 50%;
  right: -7px;
  transform: translateY(-45%);
}

.sort__icon_asc {
  transform: translateY(-55%) rotate(180deg);
}

.list__item {
  position: relative;
  display: grid;
  grid-auto-rows: 52px;
  border-bottom: 1px solid #ccc;
  line-height: 18px;
  font-size: 14px;
  color: grey;
}

.list__item__section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px 0 8px;
}

.list__item__value {
  width: 100%;
  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.list__item__value span {
  font-family: Arial, Helvetica, sans-serif;
}
.list__item__icon {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.profit__value {
  color: #2cc545;
  height: 18px;
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.profit__value span {
  font-family: Arial, Helvetica, sans-serif;
}
.profit__value_hidden {
  visibility: hidden;
}
.profit__down {
  color: #f00;
}
.zero__profit {
  color: grey;
}
.names__container {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 150px;
}
.names__container:after {
  content: '';
  position: absolute;
  width: 10px;
  height: 100%;
  background: #fff;
  top: 0;
  right: 0;
  box-shadow: 6px 0 18px rgba(0, 0, 0, 0.15);
}
.names__container__content {
  position: relative;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 1;
}
.names__container__title {
  display: flex;
  align-items: center;
  height: 36px;
  font-size: 14px;
  color: #333;
  font-weight: 600;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 0 8px;
}
.name__item {
  height: 53px;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
  font-size: 14px;
  color: grey;
}
.name__link {
  padding: 0 8px;
  line-height: 18px;
  color: #000;
}
.shadow__container {
  position: absolute;
  top: 0;
  right: -32px;
  width: 32px;
  height: calc(100% - 8px);
}
.shadow__container:before {
  content: '';
  position: absolute;
  width: 10px;
  height: calc(100% - 12px);
  top: 0;
  left: 0;
  box-shadow: -6px 0 18px rgba(0, 0, 0, 0.15);
}
.shadow__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}

.disabled {
  pointer-events: none;
}
</style>

<script>
import scrollList from '@/mixins/scrollList.js'

export default {
  mixins: [scrollList],
  props: {
    periodList: {
      type: Array,
      default: () => []
    },
    datasets: {
      type: Array,
      default: () => []
    },
    filterable: {
      type: Boolean,
      default: false
    },
    sortable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      width: 0,
      sortOptions: {
        field: this.periodList[0],
        direction: '1'
      }
    }
  },
  watch: {
    periodList(val) {
      this.sortOptions.field = val[0]
    }
  },
  computed: {
    calcWidth() {
      return '110px'
    },
    filteredList() {
      return this.filterable ? this.datasets.filter((el) => el.selected) : this.datasets
    },
    sortedList() {
      if (this.sortOptions.direction === '0') {
        return this.filteredList.sort((a, b) => a[this.sortOptions.field] - b[this.sortOptions.field])
      }
      return this.filteredList.sort((a, b) => b[this.sortOptions.field] - a[this.sortOptions.field])
    }
  },
  methods: {
    formatDelta(value) {
      if (value === Math.round(value)) return value > 0 ? `+${value.toLocaleString('ru')}` : value.toLocaleString('ru')
      return value > 0 ? `+${value.toLocaleString('ru').replace(/\d$/, '')}` : value.toLocaleString('ru').replace(/\d$/, '')
    },
    sortList(item) {
      if (this.sortable) {
        if (this.sortOptions.field === item) {
          this.sortOptions.direction = this.sortOptions.direction === '1' ? '0' : '1'
        } else {
          this.sortOptions.direction = '1'
        }

        this.sortOptions.field = item
      }
    }
  },
  mounted() {
    this.width = this.$refs.namesContainer.offsetWidth
  }
}
</script>
