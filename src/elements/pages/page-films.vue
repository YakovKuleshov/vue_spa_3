<template>
  <div class="main">
    <h2 class="page__title">Фильмы</h2>
    <div class="wrapper">
      <div class="container" ref="filmsContainer">
        <template v-for="(item, index) in list" :key="index">
          <film-card :item="item" @click="showInfo(item.element.alias)" />
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

.main .preloader {
  z-index: 1;
}
</style>

<script>
import saveScroll from '@/mixins/saveScroll'
import Preloader from '@/elements/preloader/Preloader.vue'
import FilmCard from '@/elements/film-card/FilmCard.vue'

export default {
  mixins: [saveScroll],
  components: {
    Preloader,
    FilmCard
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
