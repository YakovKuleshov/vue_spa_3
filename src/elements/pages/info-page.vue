<template>
  <div class="info__page">
    <div class="info__page__container">
      <h2 class="info__page__title">{{ dataInfo.title }}</h2>
      <div class="image__block">
        <div class="image__container">
          <lasy-image :path="dataInfo.urlToImage" />
          <!-- <img class="image" :src="dataInfo.urlToImage" alt="image" /> -->
        </div>
      </div>
      <div class="text__block">{{ dataInfo.content }}</div>
      <div class="back" @click="toBackPage">Назад</div>
    </div>
  </div>
</template>

<style scoped>
.info__page__container {
  max-width: 1000px;
  margin: 0 auto;
  background: #fff;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: 25px 35px 45px rgb(0, 0, 0, 0.4);
}

.info__page__title {
  margin-bottom: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.image__block {
  max-width: 700px;
  margin: 0 auto 40px;
}

.image__container {
  position: relative;
  padding-top: 56%;
}

.image__container .lazy-image {
  position: absolute;
  top: 0;
  left: 0;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.text__block {
  user-select: text;
  margin-bottom: 40px;
  line-height: 24px;
}

.back {
  display: inline-block;
  cursor: pointer;
  color: #07f;
  font-size: 20px;
  letter-spacing: 0.01em;
}
</style>

<script>
import LasyImage from '@/elements/lazy-image/LazyImage.vue'

export default {
  components: {
    LasyImage
  },
  data() {
    return {
      dataInfo: ''
    }
  },
  methods: {
    toBackPage() {
      // this.$router.go(-1)
      // this.$router.push({name: 'information', query: `?page=${this.dataInfo.page}`, params: {from: 'from-info'}});
      this.$router.push(`/information?page=${this.dataInfo.page}`)
    }
  },
  created() {
    window.scrollTo({ top: 0 })
    this.dataInfo = localStorage.getItem('info_data') ? JSON.parse(localStorage.getItem('info_data')) : ''
    if (!this.dataInfo) this.$router.replace('/information?page=1')
  }
}
</script>
