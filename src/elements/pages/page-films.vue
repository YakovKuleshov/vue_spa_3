<template>
  <div class="main">
    <h2 class="page__title">Фильмы</h2>
    <div class="wrapper">
      <div class="container" ref="filmsContainer">
        <template v-for="(item, index) in list" :key="index">
          <div class="list__item" @click="showInfo(item.element.alias)">
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
      </div>
      <Preloader v-if="preloader" />
    </div>
  </div>
</template>

<style scoped>
.page__title {
  font-size: 40px;
  margin-bottom: 40px;
}

.wrapper {
  position: relative;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.filters {
  position: absolute;
  width: 140px;
  height: 100%;
  border-radius: 7px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6) inset;
  background: #fff;
  padding: 13px;
  left: 290px;
  box-sizing: border-box;
  top: 0;
}

.label {
  cursor: pointer;
  font-size: 16px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-auto-rows: 250px;
  grid-gap: 10px;
  padding-bottom: 5px;
  scroll-behavior: smooth;
  max-width: 1300px;
  margin: 0 auto;
}

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

.main .preloader {
  z-index: 1;
}

.active {
  color: #07f;
}
</style>

<script>
import saveScroll from '@/mixins/saveScroll'
import LazyImage from '@/elements/lazy-image/LazyImage.vue'
import Preloader from '@/elements/preloader/Preloader.vue'

export default {
  mixins: [saveScroll],
  components: {
    LazyImage,
    Preloader
  },
  data() {
    return {
      preloader: false,
      list: [],
      page: 0
    }
  },
  methods: {
    showInfo(alias) {
      this.$emit('onFilmClick', alias)
    },
    scrollContent() {
      if (!this.flag) return false
      if (window.scrollY >= document.body.scrollHeight - window.innerHeight - 200) {
        this.page += 8
        this.load(this.page)
        this.flag = false
      }
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
    async load(page, first_load) {
      this.preloader = true

      try {
        const url = `https://ctx.playfamily.ru/screenapi/v1/noauth/collection/web/1?elementAlias=novelty_web&elementType=COLLECTION&limit=8&offset=${page}&withInnerCollections=false`
        const response = await fetch(url)
        const res = await response.json()

        if (this.hasItems(res.element.collectionItems.items)) {
          if (first_load) {
            setTimeout(() => {
              if (this.$refs.filmsContainer.getBoundingClientRect().bottom < window.innerHeight) {
                this.page += 20
                this.load(this.page, first_load)
              }
            })
          }

          if (this.page == 0) {
            this.list = res.element.collectionItems.items
          } else {
            this.list = this.list.concat(res.element.collectionItems.items)
          }
          this.flag = true
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.preloader = false
      }
    },
    hasItems(arr) {
      return arr && arr.length ? true : false
    },
    getImageUrl(arr) {
      return arr[0] && arr[0].url
    }
  },
  created() {
    this.load(this.page, true)
  },
  activated() {
    this.scrollContent = this.scrollContent.bind(this)
    window.addEventListener('scroll', this.scrollContent)
  },
  deactivated() {
    window.removeEventListener('scroll', this.scrollContent)
  },
  beforeRouteLeave(to, { name }, next) {
    localStorage.setItem(`${name}_scroll`, window.scrollY)
    next()
  }
}
</script>
