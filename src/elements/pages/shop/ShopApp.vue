<template>
  <div class="shop">
    <h2 class="page__title">Магазин</h2>
    <ShopToolbar class="toolbar" :title="getTitle" @routing="routing" :currentPage="currentPage" />
    <transition name="fade">
      <component class="comp" :is="currentComponent" @routing="routing"></component>
    </transition>
  </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
}

.toolbar {
  position: sticky;
  top: 60px;
  z-index: 2;
}

.comp {
  z-index: 1;
}

.shop {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
}

.page__title {
  margin-bottom: 40px;
  font-size: 40px;
}

.fade-enter {
  transition: opacity 0.5s;
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s;
  position: absolute;
  width: 100%;
}
</style>
<script>
import ShopToolbar from './elements/ShopToolbar'
import ShopList from './elements/ShopList'
import Cart from './elements/Cart'
import saveScroll from '@/mixins/saveScroll'

export default {
  mixins: [saveScroll],
  components: {
    ShopToolbar,
    ShopList,
    Cart
  },
  data() {
    return {
      currentComponent: 'ShopList',
      currentPage: 'ShopList'
    }
  },
  methods: {
    routing(action) {
      switch (action) {
        case 'toolbar':
          this.currentComponent = 'Cart'
          this.currentPage = 'Cart'
          break
        case 'cart':
          this.currentComponent = 'ShopList'
          this.currentPage = 'ShopList'
      }
    }
  },
  computed: {
    getTitle() {
      switch (this.currentPage) {
        case 'ShopList':
          return 'Список товаров'
        case 'Cart':
          return 'Корзина'
      }
    }
  },
  beforeRouteLeave(to, { name }, next) {
    localStorage.setItem(`${name}_scroll`, 0)
    next()
  }
}
</script>
