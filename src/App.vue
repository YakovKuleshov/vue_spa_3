<template>
  <div id="main">
    <keep-alive>
      <main-header
        v-if="validPath"
        @showDetail="showDetailWeather = true"
        @showNavModal="showNav = true"
        @showQR="showQRModal = true"
      />
    </keep-alive>
    <div class="wallpaper" :style="{ background: `url(${mainBgUrl}) no-repeat center` }" />
    <section>
      <h1 class="title" :style="{ color: mainSettings.title_color }">
        {{ mainSettings.title }}
      </h1>
      <div class="import__components">
        <div class="content">
          <router-view @onImageClick="imageClick" @onFilmClick="filmClick" v-slot="{ Component }">
            <keep-alive>
              <component v-if="$route.meta.keepAlive" :is="Component" :key="$route.name" />
            </keep-alive>
            <component v-if="!$route.meta.keepAlive" :is="Component" />
          </router-view>
        </div>
      </div>
    </section>
    <transition name="fade">
      <keep-alive>
        <weather-popup v-if="showDetailWeather" @close="showDetailWeather = false" />
      </keep-alive>
    </transition>
    <transition name="fade">
      <films-popup v-if="filmAlias" :film-alias="filmAlias" @clearData="clearData" />
    </transition>
    <transition name="fade">
      <image-popup v-if="galleryImgUrl" :url="galleryImgUrl" @clearImgUrl="clearImgUrl" />
    </transition>
    <transition name="fade">
      <mobile-popup v-if="showNav" @close="showNav = false" />
    </transition>
    <transition name="fade">
      <qr-popup v-if="showQRModal" @close="showQRModal = false" />
    </transition>
    <div v-if="!$isMobile && isDev" class="button color__button" @click="colorpickerToggle">Цвет</div>
    <div class="color__picker" :class="{ color__picker__active: colorpicker }" @click="stopProp">
      <Colorpicker @onRgbaColor="setRgba" @onInputColor="setHexColor" />
    </div>
    <div class="clock">
      <Clock />
    </div>
    <resize-block class="resize__overlay" v-if="!$isMobile && isDev" :bgColor="blockColor" />
    <div class="up__down_buttons">
      <div id="up" class="scroll__buttons up__button" ref="upButton" @click="scrollPage"></div>
      <div id="down" class="scroll__buttons down__button" ref="downButton" @click="scrollPage"></div>
    </div>
    <div v-if="!mainBg.includes('wallpaper')" class="bg__button" :style="{ top: `${bgButtonTop}px` }">
      <div class="pulse__elem_1"></div>
      <div class="pulse__elem_2"></div>
      <div class="pulse__elem_3"></div>
      <div class="button gallary__button" @click="changeMainBg('img/wallpaper_5.jpg')">Вернуть фон</div>
    </div>
  </div>
</template>

<script>
import Range from './elements/range/Range'
import Colorpicker from './elements/colorpicker/Colorpicker'
import resizeBlock from './elements/resize-block/Resize-block'
import FilmsPopup from './FilmsPopup.vue'
import MobilePopup from './MobilePopup.vue'
import WeatherPopup from './WeatherPopup'
import QrPopup from './QrPopup.vue'
import Clock from './elements/clock/Clock'
import ImagePopup from './ImagePopup'
import MainHeader from './elements/main-header/MainHeader'
import { mapState, mapMutations, mapGetters } from 'vuex'
import './style/style.css'

export default {
  components: {
    MainHeader,
    FilmsPopup,
    WeatherPopup,
    QrPopup,
    MobilePopup,
    Range,
    Colorpicker,
    resizeBlock,
    ImagePopup,
    Clock
  },
  data() {
    return {
      showNav: false,
      showDetailWeather: false,
      showRegistration: false,
      showQRModal: false,
      galleryImgUrl: '',
      colorpicker: false,
      blockColor: '',
      hexColor: '',
      rangeValue: '',
      filmAlias: '',
      bgButtonTop: window.innerHeight - 300
    }
  },
  watch: {
    $route({ meta }) {
      if (meta.title) document.title = meta.title
    }
  },
  methods: {
    ...mapMutations('mainStore', ['changeMainBg']),

    stopProp(e) {
      e.stopPropagation()
    },

    colorpickerToggle(e) {
      this.colorpicker = !this.colorpicker
      e.stopPropagation()
    },

    getRangeValue(value) {
      this.rangeValue = value
    },

    filmClick(alias) {
      this.filmAlias = alias
    },

    imageClick(url) {
      this.galleryImgUrl = url
    },

    clearData() {
      this.filmAlias = ''
    },

    clearImgUrl() {
      this.galleryImgUrl = ''
    },

    scrollPage(e) {
      if (e.target.id === 'up') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        })
      }
    },

    setRgba(value) {
      this.blockColor = value
    },

    setHexColor(value) {
      // this.hexColor = value[0] == '#' ? value : '#' + value
    }
  },
  computed: {
    ...mapState('mainStore', ['mainBg', 'mainSettings', 'menuList']),
    ...mapGetters('mainStore', ['isDev']),
    validPath() {
      return !['/info', '/admin_panel'].some((path) => path === this.$route.path)
    },
    mainBgUrl() {
      const httpUrl = this.mainBg.includes('https')
      return httpUrl ? this.mainBg : require(`@/assets/${this.mainBg}`)
    }
  },

  beforeCreate() {},

  created() {},

  beforeMount() {},

  mounted() {
    if (window.scrollY < 500) {
      this.$refs.upButton.style.opacity = '0'
      this.$refs.upButton.style.display = 'none'
    }

    if (window.scrollY > document.body.scrollHeight - window.innerHeight - 500) {
      this.$refs.downButton.style.opacity = '0'
      this.$refs.downButton.style.display = 'none'
    }

    let flagUp = true
    let flagDown = true

    window.addEventListener('scroll', (e) => {
      // let options = {
      //   // root: this.$refs.menu,
      //   rootMargin: "0px",
      //   threshold: 1
      // };

      // let callback = (entries, observer) => {
      //   if (!entries[0].isIntersecting && this.$route.path != "/shop") {
      //     entries[0].target.classList.add("sticked");
      //   } else {
      //     if (entries[0].boundingClientRect.top != 0)
      //       entries[0].target.classList.remove("sticked");
      //   }
      // };

      // let observer = new IntersectionObserver(callback, options);
      // if (this.$refs.menu) observer.observe(this.$refs.menu);
      //PARALAX
      // let elems = this.$el.querySelectorAll(".block");
      // elems.forEach((el) => {
      //    if (window.scrollY - el.offsetTop >= -100) {
      //       el.style.transform =  `translateY(${(window.scrollY - el.offsetTop + 100) / 1.5}px)`;
      //    } else {
      //       el.style.transform = "translateY(0)";
      //    }
      // });

      this.bgButtonTop = window.innerHeight - 300 + window.scrollY

      if (!flagUp) return false
      flagUp = false

      if (window.scrollY > 500) {
        this.$refs.upButton.style.display = 'block'
        setTimeout(() => {
          this.$refs.upButton.style.opacity = '1'
          flagUp = true
        }, 1)
      } else {
        const btn = this.$refs.upButton
        if (btn) btn.style.opacity = '0'
        setTimeout(() => {
          this.$refs.upButton.style.display = 'none'
          flagUp = true
        }, 300)
      }

      if (!flagDown) return false
      flagDown = false

      if (window.scrollY < document.body.scrollHeight - window.innerHeight - 500) {
        this.$refs.downButton.style.display = 'block'
        setTimeout(() => {
          this.$refs.downButton.style.opacity = '1'
          flagDown = true
        })
      } else {
        this.$refs.downButton.style.opacity = '0'
        setTimeout(() => {
          this.$refs.downButton.style.display = 'none'
          flagDown = true
        }, 300)
      }
    })

    window.addEventListener('click', () => {
      this.colorpicker = false
    })

    // let number = 20500200
    // console.log(new Intl.NumberFormat().format(number))
  }
}
</script>
