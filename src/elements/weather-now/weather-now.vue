<template>
  <div v-if="weather" class="main">
    <img class="icon" :src="imgUrl" />
    <div class="wrapper__row">
      <div class="value">{{ getWeatherVal }}</div>
      <div class="desciption">{{ getDescription }}</div>
    </div>
    <span class="main-detail" v-on="$attrs"> -&nbsp;&nbsp;Подробнее</span>
  </div>
</template>

<style scoped>
.main {
  color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.wrapper__row {
  margin-left: 8px;
  margin-right: 10px;
}

.value {
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 2px;
  text-shadow: 1px 1px 2px rgb(0, 0, 0, 0.5);
}

.icon {
  width: 70px;
  height: 50px;
  object-fit: contain;
}

.desciption {
  font-size: 11px;
  text-align: center;
  letter-spacing: 0.7px;
  color: #fff;
  text-shadow: 1px 1px 2px rgb(0, 0, 0, 0.5);
}

.main-detail {
  font-size: 12px;
  cursor: pointer;
  letter-spacing: 0.5px;
}
</style>
<script>
export default {
  data() {
    return {
      weather: '',
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
  methods: {},
  computed: {
    getWeatherVal() {
      const val = Math.round(this.weather.main.temp - 273.15)
      return val > 0 ? '+ ' + val + '°' : val
    },

    getDescription() {
      let elems = this.weatherConditions.filter(
        (el) => el.type == this.weather.weather[0].main
      )
      return elems && elems.length ? elems[0].name : ''
    },
    imgUrl() {
      return require(`@/assets/img/${this.weather?.weather[0].icon}.png`)
    }
  },
  mounted() {
    fetch(
      'http://api.openweathermap.org/data/2.5/weather?lat=55.7522&lon=37.6156&APPID=12594a2144aa9c83dfdc5b5b4f7c3b93'
    )
      .then((response) => response.json())
      .then((res) => {
        this.weather = res
      })
  }
}
</script>
