<template>
  <div class="weather">
    <div class="weather__icon">
      <img class="weather__image" :class="{ hidden: !loaded }" :src="imgUrl" @load="onLoad" />
      <x-loader v-if="!loaded" color="gray" class="x-img__loader" />
    </div>
    <template v-if="loaded">
      <div class="weather__wrapper">
        <div class="weather__value">{{ getWeatherVal }}</div>
        <div class="weather__desciption">{{ getDescription }}</div>
      </div>
      <span class="weather__detail" v-bind="$attrs"> -&nbsp;&nbsp;Подробнее</span>
    </template>
  </div>
</template>

<style scoped>
.weather {
  color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

@media (max-width: 1500px) {
  .weather {
    margin-right: 5px;
  }
}

.weather__wrapper {
  margin-left: 8px;
  margin-right: 10px;
}

.weather__value {
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 2px;
  text-shadow: 1px 1px 2px rgb(0, 0, 0, 0.5);
}

.weather__icon {
  position: relative;
  width: 70px;
  height: 50px;
}

.weather__icon:deep(.lds-spinner div:after) {
  top: 25px;
  width: 2px;
  height: 7px;
  background: #fff;
}

.weather__icon:deep(.lds-spinner div) {
  transform-origin: 38px 40px;
}

.weather__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.hidden {
  opacity: 0;
}

.weather__desciption {
  font-size: 11px;
  text-align: center;
  letter-spacing: 0.7px;
  color: #fff;
  text-shadow: 1px 1px 2px rgb(0, 0, 0, 0.5);
}

.weather__detail {
  font-size: 12px;
  cursor: pointer;
  letter-spacing: 0.5px;
}
</style>
<script>
import XLoader from '@/elements/pages/shop/productPage/XLoader.vue'

export default {
  inheritAttrs: false,
  components: {
    XLoader
  },
  data() {
    return {
      weather: null,
      loaded: false,
      weatherConditions: [
        {
          type: 'Clear',
          name: 'Ясно'
        },
        {
          type: 'Clouds',
          name: 'Облачно'
        },
        {
          type: 'Rain',
          name: 'Дождь'
        },
        {
          type: 'Drizzle',
          name: 'Дождь'
        },
        {
          type: 'Thunderstorm',
          name: 'Гроза'
        },
        {
          type: 'Snow',
          name: 'Снег'
        },
        {
          type: 'Mist',
          name: 'Туман'
        },
        {
          type: 'Smoke',
          name: 'Туман'
        }
      ]
    }
  },
  methods: {
    onLoad() {
      this.loaded = true
    },
    async loadWeather() {
      const url = 'http://api.openweathermap.org/data/2.5/weather?lat=55.7522&lon=37.6156&APPID=12594a2144aa9c83dfdc5b5b4f7c3b93'

      try {
        const response = await fetch(url)
        const res = await response.json()

        this.weather = res
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    getWeatherVal() {
      const val = Math.round(this.weather?.main?.temp - 273.15)
      return this.weather ? (val > 0 ? '+ ' + val + '°' : val) : ''
    },

    getDescription() {
      let elems = this.weatherConditions.filter((el) => el.type == this.weather?.weather[0]?.main)
      return elems && elems.length ? elems[0].name : ''
    },
    imgUrl() {
      return this.weather ? require(`@/assets/img/${this.weather?.weather[0].icon}.png`) : ''
    }
  },
  created() {
    this.loadWeather()
  }
}
</script>
