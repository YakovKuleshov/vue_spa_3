<template>
  <div class="pagination">
    <div class="pagination__button pagination__button__first" :class="{ disabled: current <= 2 }" @click="toFirst" />
    <div class="pagination__button pagination__button__prev" :class="{ disabled: current === 1 }" @click="prevPage" />

    <div
      v-for="page in buttonsList"
      class="pagination__button"
      :class="{ pagination__button__active: page === current }"
      :key="page"
      @click="selectPage(page)"
    >
      {{ page }}
    </div>

    <div class="pagination__button pagination__button__next" :class="{ disabled: current === pagesCount }" @click="nextPage" />
    <div class="pagination__button pagination__button__end" :class="{ disabled: current >= pagesCount - 1 }" @click="toLast" />
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 5px;
  user-select: none;
}

.pagination__button {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
  cursor: pointer;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  font-weight: bold;
  font-size: 18px;
}

.pagination__button__prev:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff url('@/assets/img/arrow.svg') no-repeat center;
  background-size: 25px;
  transform: rotateZ(90deg);
}

.pagination__button__next:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff url('@/assets/img/arrow.svg') no-repeat center;
  background-size: 25px;
  transform: rotateZ(-90deg);
}

.pagination__button__active {
  background: #07f;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  pointer-events: none;
}

.pagination__button__first:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url('@/assets/img/arrow.svg') no-repeat 9px 6px, url('@/assets/img/arrow.svg') no-repeat 9px 14px;
  transform: rotateZ(90deg);
  background-size: 22px;
}

.pagination__button__end:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url('@/assets/img/arrow.svg') no-repeat 9px 6px, url('@/assets/img/arrow.svg') no-repeat 9px 14px;
  background-size: 22px;
  transform: rotateZ(-90deg);
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>

<script>
export default {
  props: {
    limit: {
      type: [Number, String],
      default: 5
    },
    count: {
      type: [Number, String],
      default: 30
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      current: this.page,
      buttonsCount: 5
    }
  },
  watch: {
    page(val) {
      this.current = val
    },
    limit() {
      this.current = 1
    }
  },
  methods: {
    selectPage(page) {
      this.current = page
      this.$emit('onChange', this.current)
    },
    nextPage() {
      this.current++
      this.current = Math.min(this.pagesCount, this.current)
      this.$emit('onChange', this.current)
    },
    prevPage() {
      this.current--
      this.current = Math.max(this.current, 1)
      this.$emit('onChange', this.current)
    },
    toFirst() {
      this.current = 1
      this.$emit('onChange', this.current)
    },
    toLast() {
      this.current = this.pagesCount
      this.$emit('onChange', this.current)
    }
  },
  computed: {
    pagesCount() {
      return Math.ceil(this.count / this.limit)
    },
    buttonsList() {
      const arr = []
      if (this.pagesCount > this.buttonsCount) {
        if (this.current > 2 && this.current < this.pagesCount - 1 && this.current <= this.pagesCount - 2) {
          for (let i = this.current - 2; i <= this.current + 2; i++) {
            arr.push(i)
          }
        } else if (this.current > this.pagesCount - 3) {
          for (let i = this.pagesCount - (this.buttonsCount - 1); i <= this.pagesCount; i++) {
            arr.push(i)
          }
        } else {
          for (let i = 1; i <= this.buttonsCount; i++) {
            arr.push(i)
          }
        }
      } else {
        for (let i = 1; i <= this.pagesCount; i++) {
          arr.push(i)
        }
      }
      return arr
    }
  }
}
</script>
