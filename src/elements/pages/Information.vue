<template>
  <div class="information">
    <h2 class="page__title">Информация</h2>
    <div class="information__content">
      <h2 class="list__title">Страница {{ $route.query.page }}</h2>
      <div v-for="(item, index) in limitedList" class="list__item__container" :key="index" @click="toInfoPage(item)">
        <div class="list__item">
          <lasy-image class="list__item__img" :path="item.urlToImage" @error="loadError(item)" :key="$route.query.page" />
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
  position: relative;
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

/* .list__item:before {
  content: '';
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: red;
  clip-path: polygon(
    0 56px,
    0 20px,
    0.1px 17.9px,
    0.4px 16px,
    0.6px 15px,
    0.9px 14px,
    1.3px 12.8px,
    2px 11.3px,
    2.5px 10.3px,
    3.1px 9.3px,
    3.6px 8.6px,
    4.3px 7.6px,
    5.2px 6.6px,
    5.8px 6px,
    6.7px 5px,
    7.8px 4.1px,
    8.7px 3.5px,
    9.4px 3px,
    10.3px 2.5px,
    11.1px 2.1px,
    12px 1.7px,
    13.2px 1.2px,
    14.2px 0.8px,
    15.5px 0.5px,
    17.1px 0.2px,
    18.1px 0.1px,
    18.9px 0,
    21.7px 0,
    calc(50% - 43.8px) 0,
    calc(50% - 42.1px) 0,
    calc(50% - 41.3px) 0.1px,
    calc(50% - 40.2px) 0.4px,
    calc(50% - 39.3px) 0.8px,
    calc(50% - 38.7px) 1.1px,
    calc(50% - 38px) 1.6px,
    calc(50% - 37.3px) 2.1px,
    calc(50% - 36.7px) 2.7px,
    calc(50% - 36.2px) 3.3px,
    calc(50% - 35.7px) 4.1px,
    calc(50% - 35.4px) 4.7px,
    calc(50% - 35.1px) 5.3px,
    calc(50% - 34.9px) 6px,
    calc(50% - 34.7px) 6.6px,
    calc(50% - 34.5px) 8.3px,
    calc(50% - 32.4px) 15.8px,
    calc(50% - 30.5px) 19.5px,
    calc(50% - 28.7px) 22.3px,
    calc(50% - 26.8px) 24.6px,
    calc(50% - 25px) 26.5px,
    calc(50% - 23.1px) 28.2px,
    calc(50% - 21.3px) 29.6px,
    calc(50% - 19.4px) 30.9px,
    calc(50% - 17.6px) 32px,
    calc(50% - 13.9px) 33.7px,
    calc(50% - 12px) 34.4px,
    calc(50% - 10.2px) 34.9px,
    calc(50% - 6.5px) 35.7px,
    calc(50% - 4.6px) 35.9px,
    calc(50% - 2.8px) 36px,
    calc(50% - 0.9px) 36px,
    50% 36px,
    calc(50% + 0.9px) 36px,
    calc(50% + 2.8px) 36px,
    calc(50% + 4.6px) 35.9px,
    calc(50% + 6.5px) 35.7px,
    calc(50% + 8.3px) 35.3px,
    calc(50% + 10.2px) 34.9px,
    calc(50% + 13.9px) 33.7px,
    calc(50% + 15.7px) 32.9px,
    calc(50% + 17.6px) 31.9px,
    calc(50% + 19.4px) 30.9px,
    calc(50% + 21.3px) 29.6px,
    calc(50% + 23.1px) 28.2px,
    calc(50% + 25px) 26.5px,
    calc(50% + 26.8px) 24.5px,
    calc(50% + 28.7px) 22.2px,
    calc(50% + 30.5px) 19.4px,
    calc(50% + 32.4px) 15.8px,
    calc(50% + 34.5px) 8.4px,
    calc(50% + 34.5px) 8px,
    calc(50% + 34.5px) 7.7px,
    calc(50% + 34.6px) 7.2px,
    calc(50% + 34.7px) 6.7px,
    calc(50% + 34.8px) 6.1px,
    calc(50% + 34.9px) 5.7px,
    calc(50% + 35.1px) 5.2px,
    calc(50% + 35.3px) 4.8px,
    calc(50% + 35.6px) 4.1px,
    calc(50% + 36px) 3.6px,
    calc(50% + 36.4px) 3px,
    calc(50% + 36.7px) 2.6px,
    calc(50% + 37.2px) 2.2px,
    calc(50% + 37.7px) 1.8px,
    calc(50% + 38.1px) 1.5px,
    calc(50% + 38.7px) 1.1px,
    calc(50% + 39.3px) 0.8px,
    calc(50% + 39.9px) 0.5px,
    calc(50% + 40.6px) 0.3px,
    calc(50% + 41.3px) 0.1px,
    calc(50% + 42px) 0,
    calc(50% + 42.8px) 0,
    calc(100% - 20px) 0,
    calc(100% - 18.5px) 0.1px,
    calc(100% - 17.7px) 0.1px,
    calc(100% - 17.2px) 0.2px,
    calc(100% - 16.3px) 0.3px,
    calc(100% - 15.1px) 0.6px,
    calc(100% - 13.9px) 0.9px,
    calc(100% - 13.1px) 1.2px,
    calc(100% - 12.4px) 1.5px,
    calc(100% - 11.5px) 1.9px,
    calc(100% - 10.5px) 2.4px,
    calc(100% - 9.7px) 2.8px,
    calc(100% - 9.1px) 3.2px,
    calc(100% - 8.4px) 3.7px,
    calc(100% - 7.4px) 4.4px,
    calc(100% - 6.8px) 5px,
    calc(100% - 6.2px) 5.5px,
    calc(100% - 5.7px) 6px,
    calc(100% - 5px) 6.7px,
    calc(100% - 4.5px) 7.4px,
    calc(100% - 4px) 8px,
    calc(100% - 3.3px) 8.9px,
    calc(100% - 2.7px) 10px,
    calc(100% - 2.3px) 10.7px,
    calc(100% - 2px) 11.3px,
    calc(100% - 1.7px) 11.9px,
    calc(100% - 1.5px) 12.5px,
    calc(100% - 1.2px) 13.1px,
    calc(100% - 1px) 13.8px,
    calc(100% - 0.8px) 14.5px,
    calc(100% - 0.6px) 15.3px,
    calc(100% - 0.4px) 16.2px,
    calc(100% - 0.2px) 17px,
    calc(100% - 0.1px) 17.6px,
    calc(100% - 0.1px) 18.3px,
    100% 19.2px,
    100% 19.8px,
    100% 100%,
    0 100%
  );
} */

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
      buttonsLength: '',
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
      return +val > this.buttonsLength ? '' : val
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
    this.buttonsLength = Math.ceil(this.localList.length / this.limit)
    const buttonsArr = []
    for (let i = 1; i < this.buttonsLength; i++) {
      buttonsArr.push(i)
    }
    let rex = /page=\d{1,2}/g.test(this.$route.fullPath)
    if (!rex || (this.$route.query.page != 1 && !buttonsArr.includes(+this.$route.query.page - 1))) {
      this.$router.replace(`/information?page=${this.currentPage || 1}`)
    }
  }
}
</script>
