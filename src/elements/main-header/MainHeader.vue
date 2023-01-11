<template>
  <div class="main-header">
    <div class="main-header__row">
      <div class="logo">
        <div class="logo__icon"></div>
      </div>
      <weather-now @click="$emit('showDetail')" xxx="1" />
    </div>
    <Navigation />
    <gamburger-menu @click="$emit('showNavModal')" />

    <!-- <div v-if="!$isMobile || isDev" class="ultra">
      <div class="ultra__logo"></div>
      <audio controls src="https://nashe1.hostingradio.ru:18000/ultra-128.mp3" ref="audio" />
    </div> -->
  </div>
</template>

<script>
import WeatherNow from '@/elements/weather-now/WeatherNow.vue'
import Navigation from '@/elements/main-navigation/Navigation.vue'
import GamburgerMenu from '@/elements/gamburger-menu/GamburgerMenu.vue'

export default {
  components: {
    WeatherNow,
    Navigation,
    GamburgerMenu
  },
  mounted() {
    // const audio = this.$refs.audio
    // if (audio) audio.volume = 0.1
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
  padding: 0 10px;
}

.main-header__row {
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
}

.gamburger-menu {
  display: none;
  margin-left: auto;
}

@media (max-width: 1500px) {
  .main-header__row {
    position: static;
  }

  .main-header {
    justify-content: flex-start;
  }
}

@media (max-width: 1220px) {
  .main-header:deep(.menu) {
    display: none;
  }

  .gamburger-menu {
    display: block;
  }
}
</style>
