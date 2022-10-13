<template>
  <div class="pagination">
    <template v-if="buttonsList.length > 1">
      <div class="pagination__button pagination__button__beginning" @click="toFirst"></div>
      <div class="pagination__button pagination__button__prev" @click="prevPage"></div>
    </template>
    <div
      v-for="page in buttonsList"
      class="pagination__button"
      :class="{ pagination__button__active: page === current }"
      :key="page"
      @click="selectPage(page)"
    >
      {{ page }}
    </div>
    <template v-if="buttonsList.length > 1">
      <div class="pagination__button pagination__button__next" @click="nextPage"></div>
      <div class="pagination__button pagination__button__end" @click="toLast"></div>
    </template>
    <div v-if="pagesCount > 5" class="pagination__button pagination__button__more"></div>
  </div>
</template>

<style lang="stylus" scoped>
.pagination
  display flex
  align-items center
  user-select none
  &__button
    width 32px
    display flex
    align-items center
    justify-content center
    color gray
    height 32px
    cursor pointer
    &__beginning
      // background url('../assets/icons/to_end.svg') no-repeat center
    &__prev
      // background url('../assets/icons/chevron_2.svg') no-repeat center
    &__next
      // background url('../assets/icons/chevron_2.svg') no-repeat center
      transform scale(-1)
    &__end
      // background url('../assets/icons/to_end.svg') no-repeat center
      transform scale(-1)
    &__more
      pointer-events none
      // background url('../assets/icons/more.svg') no-repeat center
    &__active
      background #07f
      border-radius 4px
      color #fff
      font-weight bold
</style>

<script>
export default {
  props: {
    limit: {
      type: [Number, String],
      default: '5'
    },
    count: {
      type: [Number, String],
      default: '30'
    }
  },
  data() {
    return {
      current: 1
    }
  },
  methods: {
    selectPage(page) {
      this.current = page
    },
    nextPage() {
      this.current++
      this.current = Math.min(this.pagesCount, this.current)
    },
    prevPage() {
      this.current--
      this.current = Math.max(this.current, 1)
    },
    toFirst() {
      this.current = 1
    },
    toLast() {
      this.current = this.pagesCount
    }
  },
  watch: {
    limit() {
      this.current = 1
    }
  },
  computed: {
    pagesCount() {
      return Math.ceil(this.count / this.limit)
    },
    buttonsList() {
      const arr = []
      if (this.pagesCount > 5) {
        if (this.current > 2 && this.current < this.pagesCount - 1 && this.current <= this.pagesCount - 2) {
          for (let i = this.current - 2; i <= this.current + 2; i++) {
            arr.push(i)
          }
        } else if (this.current > this.pagesCount - 2) {
          for (let i = this.pagesCount - 4; i <= this.pagesCount; i++) {
            arr.push(i)
          }
        } else {
          for (let i = 1; i <= 5; i++) {
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
