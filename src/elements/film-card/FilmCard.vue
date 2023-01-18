<template>
  <div class="list__item">
    <div class="item__image">
      <lazy-image :path="getImageUrl(item.element.basicCovers.items)" />
    </div>
    <div class="text__container">
      <div class="title__text">{{ item.element.name }}</div>
      <div class="public__date">{{ item.Year }}</div>
      <div class="rating__wrapper">
        <div class="year">
          {{
            item.element.worldReleaseDate
              ? `${new Date(item.element.worldReleaseDate).toLocaleDateString('ru', {
                  year: 'numeric'
                })} г.`
              : ''
          }}
        </div>
        <div class="rate__wrapper">
          <div class="rating">
            <div
              class="colored__rating"
              :style="{
                backgroundImage: `url(${getRateColor(item.element.averageRating)})`,
                width: `${getRateWidth(item.element.averageRating)}%`
              }"
            ></div>
          </div>
          <div class="value">{{ getRate(item.element.averageRating) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LazyImage from '@/elements/lazy-image/LazyImage.vue'

export default {
  components: {
    LazyImage
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    loadImg() {
      console.log(1)
    },
    getRate(rate) {
      return rate ? rate.toFixed(1) : ''
    },
    getRateColor(rate) {
      if (!rate) return

      if (rate < 5) {
        return require('@/assets/img/red_star.svg')
      } else if (rate >= 5 && rate < 7) {
        return require('@/assets/img/yellow_star.svg')
      }

      return require('@/assets/img/green_star.svg')
    },
    getRateWidth(rate) {
      return (100 / 10) * rate
    },
    getImageUrl(arr) {
      return arr[0] && arr[0].url
    }
  }
}
</script>

<style scoped>
.list__item {
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
}

.item__image {
  flex-grow: 1;
}

.text__container {
  display: flex;
  flex-direction: column;
  background: #fff;
  flex-grow: 0.1;
  padding: 10px;
  color: #333;
  box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.8);
}

.title__text {
  font-size: 16px;
  letter-spacing: 0.4px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.public__date {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  font-size: 15px;
  color: #333;
  text-shadow: -2px 3px 5px rgba(0, 0, 0, 0.4);
}

.rating__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.year {
  font-size: 15px;
  color: #9c9c9c;
}

.rate__wrapper {
  display: flex;
}

.rating {
  position: relative;
  width: 85px;
  height: 16px;
  background: url('@/assets/img/grey_star.svg') repeat-x center;
  background-size: contain;
}

.colored__rating {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-size: contain;
}

.value {
  color: #333;
  font-weight: bold;
  margin-left: 8px;
  font-size: 16px;
}
</style>
