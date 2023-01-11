<template>
  <div class="card" :class="view">
    <div class="card__image">
      <img class="image" :src="item.image" @load="onLoad" />
      <x-loader v-if="!loaded" color="gray" class="x-img__loader" />
    </div>
    <div class="text__container">
      <div
        class="card-shadow"
        :style="{
          background: `url(${item.image}) no-repeat center`,
          backgroundSize: 'contain'
        }"
      />
      <div class="card-text-wrap">
        <div class="card__title" :title="item.name">{{ item.name }}</div>
        <div class="wrapper__row">
          <!-- <div class="card__button" :class="{ in__cart: isInCart }" @click="toCart">{{ isInCart ? 'Удалить' : 'В корзину' }}</div> -->
          <div class="card__price">{{ Number(item.price).toLocaleString() }} ₽</div>
        </div>
      </div>
    </div>
    <router-link :to="`shop/${item.id}`" />
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.card {
  position: relative;
  background: #fff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
}

.card:deep(.lds-spinner div:after) {
  top: 14px;
  height: 13px;
  width: 3px;
  background: #07f;
}

.card a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.3s;
}
.card a:hover {
  background: rgba(0, 0, 0, 0.1);
}

.card__image {
  position: relative;
  height: 60%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.text__container {
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-weight: bold;
  color: #333;
}

.card-shadow {
  position: absolute;
  width: 140%;
  height: 140%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%) scale(1, -1) perspective(700px) rotateX(30deg);
  z-index: 0;
  opacity: 0.2;
}

.card-text-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.card__title {
  text-align: center;
  line-height: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.wrapper__row {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card__price {
  color: #8f8f8f;
  font-size: 20px;
}

.card__button {
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background: orange;
  color: #fff;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  font-weight: normal;
}

.in__cart {
  background: green;
}

.list {
  display: flex;
  flex-direction: row;
  height: 200px;
  margin-bottom: 20px;
}

.list:last-of-type {
  margin-bottom: 0;
}

.list .image {
  max-width: 400px;
  height: 100%;
}

.list .text__container {
  width: 1px;
  min-width: 300px;
}

@media screen and (max-width: 768px) {
  .list {
    height: auto;
  }

  .list .image {
    max-width: 100%;
    height: 200px;
  }

  .list .text__container {
    height: auto;
  }

  .card__title {
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 576px) {
  .list .text__container {
    min-width: 240px;
  }
}
</style>

<script>
import { mapState, mapMutations } from 'vuex'
import XLoader from '@/elements/pages/shop/productPage/XLoader.vue'

export default {
  props: ['item', 'view'],
  components: {
    XLoader
  },
  data() {
    return {
      loaded: false
    }
  },
  methods: {
    ...mapMutations('moduleStore', ['addToCart', 'removeFromCart']),
    toCart() {
      this.isInCart ? this.removeFromCart(this.item.id) : this.addToCart(this.item)
    },
    onLoad() {
      this.loaded = true
    }
  },
  computed: {
    ...mapState('moduleStore', ['cartList']),
    isInCart() {
      return this.cartList.some((el) => el.id === this.item.id)
    }
  }
}
</script>
