<template>
  <div class="information">
    <h2 class="page__title">Информация</h2>
    <div class="information__content">
      <h2 class="list__title">Страница {{ $route.query.page }}</h2>
      <div v-for="(item, index) in limitedList" class="list__item__container" :key="index" @click="toInfoPage(item)">
        <div class="list__item">
          <lasy-image class="list__item__img" :path="item.urlToImage" @error="loadError(item)" />
          <div class="list__item__text">{{ formatText(item.description) }}</div>
        </div>
      </div>
    </div>
    <Pagination :count="localList.length" :page="+$route.query.page" :limit="limit" @onChange="onSelectPage" />
  </div>
</template>

<style scoped>
.page__title {
  margin-bottom: 40px;
  font-size: 40px;
}

.list__title {
  margin-bottom: 20px;
}

.information__content {
  position: relative;
  border-radius: 10px;
  min-height: calc(100vh - 308px);
  padding: 40px;
  background: #fff;
  max-width: 1300px;
  margin: 0 auto;
  box-sizing: border-box;
  box-shadow: 9px 15px 30px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
}

.list__item__container {
  margin-bottom: 15px;
  perspective: 2000px;
}

.list__item {
  padding: 10px;
  display: flex;
  align-items: center;
  background: #baefd4;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  transition: 0.3s;
  border-radius: 5px;
}

.list__item:hover {
  transform: translateZ(10px);
  box-shadow: 4px 10px 15px rgba(0, 0, 0, 0.3);
}

.list__item__container:last-of-type {
  margin-bottom: 0;
}

.list__item__img {
  width: 200px;
  height: 100px;
  flex-shrink: 0;
  flex-shrink: 0;
  margin: 0 10px 0 0;
  border-radius: 4px;
}

.list__item__text {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.list__button {
  position: relative;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  background: #fff;
  border-right: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 20px;
  overflow: hidden;
  margin-right: 2px;
}

.list__button:last-of-type {
  border-right: 1px solid #ccc;
}

.list__button__active {
  background: #07f;
  color: #fff;
  border: 1px solid #07f !important;
  pointer-events: none;
}

@media (max-width: 576px) {
  .information {
    padding: 20px 10px;
  }

  .list__item {
    flex-direction: column;
  }

  .list__item__img {
    margin-bottom: 20px;
  }
}
</style>

<script>
import { mapState } from 'vuex'
import saveScroll from '@/mixins/saveScroll'
import Pagination from './other-elements/Pagination.vue'
import LasyImage from '@/elements/lazy-image/LazyImage.vue'

export default {
  mixins: [saveScroll],
  components: {
    Pagination,
    LasyImage
  },
  data() {
    return {
      buttonsLenght: '',
      currentPage: 1,
      limit: 4
    }
  },
  beforeRouteLeave(to, { query, name }, next) {
    this.currentPage = +query.page
    localStorage.setItem(`${name}_scroll`, 0)
    if (this.limitedList.length) next()
  },
  watch: {
    $route({ query }) {
      if (query.page) this.currentPage = +query.page
    }
  },
  computed: {
    ...mapState('mainStore', ['localList']),

    getPageNumber() {
      let val = this.$route.query.page && this.$route.query.page.replace(/[^\d]/g, '')
      return +val > this.buttonsLenght ? '' : val
    },
    limitedList() {
      return this.localList.slice(
        (+this.$route.query.page - 1) * this.limit,
        (+this.$route.query.page - 1) * this.limit + this.limit
      )
    }
  },
  methods: {
    onSelectPage(val) {
      this.$router.push(`?page=${val}`)
    },
    loadError(item) {
      item.urlToImage = require(`@/assets/img/plug.jpg`)
    },
    formatText(desc) {
      return desc.replace(/(<\/ul>|<ul>|<\/li>|<li>)/g, '')
    },
    toInfoPage(item) {
      localStorage.setItem(
        'info_data',
        JSON.stringify({
          ...item,
          page: +this.$route.query.page || 1
        })
      )
      this.$router.push('/info')
    }
  },
  activated() {
    this.buttonsLenght = Math.ceil(this.localList.length / this.limit)
    const buttonsArr = []
    for (let i = 1; i < this.buttonsLenght; i++) {
      buttonsArr.push(i)
    }
    let rex = /page=\d{1,2}/g.test(this.$route.fullPath)
    if (!rex || (this.$route.query.page != 1 && !buttonsArr.includes(+this.$route.query.page - 1))) {
      this.$router.replace(`/information?page=${this.currentPage || 1}`)
    }
  }
}
</script>
