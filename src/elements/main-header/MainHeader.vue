<template>
  <div class="main-header">
    <div class="main-header__row">
      <div class="logo">
        <div class="logo__icon"></div>
      </div>
      <weather-now @click="$emit('showDetail')" />
    </div>
    <div class="menu" ref="menu">
      <div v-if="lineWidth" class="shadow__line" :style="{ width: lineWidth + 'px', left: lineLeft + 'px' }" />
      <template v-for="item in menuList" :key="item.id">
        <div class="menu__item" ref="menuItem">
          <router-link :exact="item.exact" :to="item.id">
            {{ item.name }}
          </router-link>
        </div>
      </template>
    </div>
    <div v-if="isDev" class="ultra">
      <div class="ultra__logo"></div>
      <audio controls src="https://nashe1.hostingradio.ru:18000/ultra-128.mp3" ref="audio" />
    </div>
  </div>
</template>

<script>
import WeatherNow from '@/elements/weather-now/weather-now'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    WeatherNow
  },
  data() {
    return {
      lineWidth: 0,
      lineLeft: 0
    }
  },
  watch: {
    $route(route) {
      const items = this.$refs.menuItem
      const activeItem = items.find((el) => el.children[0].getAttribute('href') === route.path)

      setTimeout(() => {
        if (activeItem) {
          this.lineWidth = activeItem.offsetWidth
          this.lineLeft = activeItem.offsetLeft
        }
      })
    }
  },
  computed: {
    ...mapState('mainStore', ['menuList']),
    ...mapGetters('mainStore', ['isDev'])
  },
  mounted() {
    const audio = this.$refs.audio
    if (audio) audio.volume = 0.1
  }
}
</script>

<style scoped>
.main-header {
  background: #7660c9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.6);
  height: 60px;
}

.main-header__row {
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
}
</style>
