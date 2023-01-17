<template>
  <div class="overlay" @click="clearData">
    <div class="content" @click.stop>
      <div class="content__close" @click="clearData"></div>
      <div class="video_img_container">
        <x-loader v-if="!loaded" color="gray" class="x-img__loader" />
        <img v-show="!trailer" class="image" :class="{ hidden: !loaded }" :src="filmData.url" @load="onLoad" />
        <div v-show="trailer" class="video">
          <video controls controlslist="nodownload" :src="filmData.trailer" ref="video" />
        </div>
        <div class="btn" @click="switchTrailer">Треллер</div>
      </div>
      <div class="text__container">
        <div class="actors">
          Год:
          <span>{{ filmData.year }}</span>
        </div>
        <div class="actors">
          Режиссёр:
          <span v-for="(item, index) in filmData.directorsList" :key="index"
            >{{ item.element.name }}{{ getComma(filmData.directorsList, index) }}</span
          >
        </div>
        <div class="actors">
          В ролях:
          <span v-for="(item, index) in filmData.actorsList" :key="index"
            >{{ item.element.name }}{{ getComma(filmData.actorsList, index) }}</span
          >
        </div>
        <div class="description">
          <p>{{ filmData.description }}</p>
        </div>
      </div>
      <div class="rating__wrapper">
        <div class="rating">
          <div class="rating__active" :class="rateColor" :style="{ width: rateWidth + '%' }"></div>
        </div>
        <div class="rating__value">{{ rateValue }}<span class="rate__from">Кино Поиск</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 10px;
  z-index: 5;
}

.content {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1000px;
  max-height: 700px;
  padding: 50px 15px 15px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 30px 30px 70px rgb(0, 0, 0, 0.6);
  border-radius: 10px;
}

.content__close {
  position: absolute;
  width: 20px;
  height: 20px;
  /* border: 1px solid #000; */
  top: 15px;
  right: 15px;
  cursor: pointer;
}

.content__close:after {
  content: '';
  position: absolute;
  top: 50%;
  width: 100%;
  height: 2px;
  background: #333;
  border-radius: 5px;
  transform: translateY(-50%) rotate(-45deg);
}

.content__close:before {
  content: '';
  position: absolute;
  top: 50%;
  width: 100%;
  height: 2px;
  background: #333;
  border-radius: 5px;
  transform: translateY(-50%) rotate(45deg);
}

.video_img_container {
  position: relative;
  min-height: 180px;
  height: 1px;
  flex-grow: 1;
}

.video_img_container:deep(.lds-spinner div:after) {
  top: 8px;
  height: 16px;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  outline: none;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hidden {
  opacity: 0;
}

.text__container {
  padding: 20px 10px 0 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ccc #fff;
}

.text__container::-webkit-scrollbar {
  width: 8px;
}

.text__container::-webkit-scrollbar-thumb {
  border: 1px solid #fff;
  background: #ccc;
  border-radius: 20px;
}

.actors {
  font-weight: bold;
  margin-bottom: 10px;
}

.actors span {
  font-weight: normal;
  font-size: 15px;
  margin-left: 5px;
}

.description {
  line-height: 20px;
  overflow-y: auto;
}

.rating__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
}

.rating {
  position: relative;
  width: 146px;
  height: 28px;
  font-size: 35px;
  margin-right: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.rating:before {
  content: '★★★★★';
  color: #ccc;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  line-height: 28px;
}

.rating__active {
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
}

.rating__active::before {
  content: '★★★★★';
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  line-height: 28px;
  overflow: hidden;
}

.red:before {
  color: #ff3c3c;
}

.yellow:before {
  color: #ffcc3c;
}

.green:before {
  color: #35bb68;
}

.rating__value {
  font-weight: bold;
  font-size: 27px;
  color: #333;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}

.rate__from {
  text-shadow: none;
  color: #ccc;
  font-weight: normal;
  margin-left: 20px;
  font-size: 23px;
  letter-spacing: 1px;
}

@media (max-width: 576px) {
  .rate__from {
    font-size: 20px;
    letter-spacing: normal;
  }
}

.btn {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  letter-spacing: 1px;
  width: 180px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
  height: 40px;
  background: rgba(0, 225, 255, 0.7);
  color: #fff;
  text-align: center;
  line-height: 40px;
}
</style>

<script>
import XLoader from '@/elements/pages/shop/productPage/XLoader.vue'

export default {
  props: {
    filmAlias: {
      type: String,
      default: ''
    }
  },
  components: {
    XLoader
  },
  data() {
    return {
      trailer: false,
      loaded: false,
      filmData: {}
    }
  },
  computed: {
    rateWidth() {
      return (100 / 10) * this.filmData.rating
    },
    rateColor() {
      if (this.filmData.rating < 5) {
        return 'red'
      } else if (this.filmData.rating >= 5 && this.filmData.rating < 7) {
        return 'yellow'
      }

      return 'green'
    },
    rateValue() {
      return this.filmData.rating ? this.filmData.rating.toFixed(1) : ''
    }
  },
  methods: {
    clearData() {
      this.$emit('clearData')
    },
    switchTrailer() {
      const video = this.$refs.video
      this.trailer = !this.trailer

      if (video) {
        if (this.trailer) {
          this.$refs.video.play()
        } else {
          this.$refs.video.pause()
        }
      }
    },
    getComma(actors, index) {
      return index == actors.length - 1 ? '' : ','
    },
    onLoad() {
      this.loaded = true
    },
    async getItemInfo() {
      try {
        const url = `https://ctx.playfamily.ru/screenapi/v1/noauth/moviecard/web/1?elementAlias=${this.filmAlias}&elementType=MOVIE`
        const response = await fetch(url)
        const res = await response.json()

        this.filmData = {
          url: res.element.basicCovers.items[0].url,
          description: res.element.description,
          trailer: res.element.trailers.items[1].url,
          rating: res.element.averageRating,
          filmName: res.element.alias,
          type: res.element.type,
          year: new Date(res.element.worldReleaseDate).toLocaleString({}, { year: 'numeric' }),
          actorsList: res.element.actors.items,
          directorsList: res.element.directors.items
        }
      } catch (err) {
        console.log(err)
      }
    }
    // async fetchFilmData() {
    //   const url = `https://ctx.playfamily.ru/screenapi/v1/noauth/moviecard/web/1?elementAlias=${this.filmData.filmName}&elementType=${this.filmData.type}`

    //   const response = await fetch(url)
    //   const res = await response.json()

    //   this.actorsList = res.element.actors.items
    //   this.directorsList = res.element.directors.items
    // }
  },
  mounted() {
    document.body.style.overflow = 'hidden'

    this.getItemInfo()
  },
  beforeUnmount() {
    document.body.removeAttribute('style')

    const video = this.$refs.video
    if (video) video.pause()
  }
}
</script>
