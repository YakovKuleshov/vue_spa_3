<template>
  <div class="other">
    <h2 class="page__title">Разное</h2>
    <div class="other__content" ref="container">
      <div class="section">
        <Slider />
      </div>
      <!-- <div class="section">
        <RangeDataPicker style="margin: 0 auto;" />
      </div> -->
      <!-- <div class="section">
        <DateMenu />
      </div> -->
      <!-- <div class="section">
        <TestPag />
      </div> -->
      <!-- <div class="section">
        <component :is="" />
      </div> -->
      <!-- <div class="section">
        <component :is="componentsList[1].instance" />
      </div>
      <div class="section">
        <component :is="componentsList[2].instance" />
      </div>
      <div class="section">
        <component :is="componentsList[3].instance" />
      </div>
      <div class="section">
        <component :is="componentsList[4].instance" />
      </div>
      <div class="section">
        <div v-if="componentsList[5].instance" class="folders__container">
          <div class="selected-folder">{{ name }}</div>
          <component
            :is="componentsList[5].instance"
            :selected="selectedItem"
            :list="fixedList"
          />
        </div>
      </div>
      <div class="section">
        <component :is="componentsList[6].instance" />
      </div>
      <div class="section">
        <component :is="componentsList[7].instance" />
      </div>
      <div class="section">
        <component :is="componentsList[8].instance" />
      </div> -->
    </div>
    <!-- <StarsRating v-if="!this.$isMobile && isDev" /> -->
  </div>
</template>

<style scoped>
.button {
  position: fixed;
  width: 150px;
  height: 40px;
  box-shadow: -2px 5px 10px rgb(0 0 0 / 50%);
  background: #07f;
  top: 350px;
  left: 58px;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  letter-spacing: 1px;
  cursor: pointer;
}

.selected-folder {
  margin-bottom: 10px;
  font-weight: 600;
}

.page__title {
  margin-bottom: 40px;
  font-size: 40px;
}

.other__content:deep(.section) {
  position: relative;
  z-index: 0;
  padding-bottom: 100px;
}

.other__content:deep(.section:last-of-type) {
  padding-bottom: 0;
}

.other__content:deep(.section:nth-child(4)) {
  max-width: 1400px;
  margin: 0 auto 200px;
  padding: 0 50px;
  box-sizing: border-box;
}
</style>

<script>
import Slider from '../slider/Slider'
import StarsRating from './other-elements/starsRating'
import saveScroll from '@/mixins/saveScroll'
// import DateMenu from "./other-elements/DateMenu.vue";
// import TestPag from "./other-elements/TestPag.vue";
// import RangeDataPicker from "./other-elements/RangeDataPicker.vue";
// import InfiniteSlider from "../slider/InfiniteSlider";
// import Header from "../header/Header";
// import TabMenu from "../tab-menu/TabMenu";
// import FolderList from "./other-elements/FolderList";
// import DragDrop from "./other-elements/DragDrop";
// import Volume from "./other-elements/Volume";
import { folders } from '@/constants/index.js'
import { mapGetters } from 'vuex'
import { createApp } from 'vue'

// const gal = defineAsyncComponent(() => import('@/elements/pages/other-elements/Gallery3d'))
// console.log(gal)

export default {
  components: {
    Slider,
    StarsRating
    // DateMenu,
    // TestPag,
    // RangeDataPicker
    // InfiniteSlider,
    // Header,
    // TabMenu,
    // FolderList,
    // DragDrop,
    // Volume,
  },
  data() {
    return {
      scrollFlag: true,
      counter: -1,
      pathList: [
        'pages/other-elements/Gallery3d',
        'pages/other-elements/AnimatedShapes',
        'slider/InfiniteSlider',
        'header/Header',
        'tab-menu/TabMenu',
        'pages/other-elements/FolderList',
        'pages/other-elements/DragDrop',
        'pages/other-elements/Volume',
        'pages/other-elements/Сalendar'
      ],
      selectedName: {
        name: ''
      },
      selectedItem: {
        id: null
      },
      folders: [
        {
          id: null,
          name: 'Все',
          parent_id: '',
          opened: false
        },
        {
          id: 1,
          name: 'Главная',
          parent_id: '',
          opened: false
        }
      ],
      fixedList: []
    }
  },
  mixins: [saveScroll],
  watch: {
    selectedItem: {
      handler: function (val) {
        this.getName(this.fixedList, val.id)
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters('mainStore', ['isDev'])
  },
  methods: {
    renderContent(path) {
      const container = this.$refs.container
      const instance = require(`@/elements/${path}`).default

      if (this.counter === 5) {
        instance.props = {
          list: {
            default: this.fixedList
          },
          selected: {
            default: this.selectedItem
          },
          selectedName: {
            default: this.selectedName
          }
        }
      }

      const app = createApp(instance)

      const section = document.createElement('div')
      section.className = 'section'
      app.mount(section)
      container.append(section)

      this.scrollFlag = true
    },
    updateSection() {
      // ("https://api.wantenger.com/api/wantenger/work/update");
      // id: '1572446048261'

      fetch('https://api.wantenger.com/api/wantenger/sections/page/list/?profile=601825', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        })
      })
        .then((response) => {
          return response.json()
        })
        .then((res) => {
          let data = res
          data[0].slides[0].custom_text =
            '<p><span style="font-size: 36px; color: #270043;"><strong>В Wantenger есть все, что вам нужно</strong></span></p>'
          console.log(data)
          // https://api.wantenger.com/api/wantenger/work/update
          // https://api.wantenger.com/api/wantenger/sections/page/save
          // fetch('https://api.wantenger.com/api/wantenger/work/update', {
          //    method: 'POST',
          //    headers: new Headers({
          //       'Accept': 'application/json',

          //       'Content-Type': 'application/json; charset=utf-8'
          //       // session: '10b19f61-0e1a-4b24-a214-2c43d6231638'
          //    }),
          //    body: JSON.stringify({id: data[0].id, vacancy_id: JSON.stringify(data[0])})
          // }).then((response) => {
          //    return response.json();
          // }).then(res => {
          //    console.log(res);
          // });
        })
    },
    getName(list, id) {
      list.forEach((el) => {
        if (el.id === id) {
          this.selectedName.name = el.name
        } else {
          if (el.sub_list.length) {
            this.getName(el.sub_list, id)
          }
        }
      })
    },
    fixList(arr, res) {
      arr.forEach((el) => {
        el.sub_list = res.filter((item) => item.parent_id == el.id)

        if (el.sub_list && el.sub_list.length) {
          this.fixList(el.sub_list, res)
        }
      })
      this.fixedList = arr
    },
    scrollPage() {
      if (!this.scrollFlag) return false
      const container = this.$refs.container
      const validDist = container.getBoundingClientRect().bottom < window.innerHeight
      if (validDist) {
        this.scrollFlag = false
        this.counter++
        if (this.counter < this.pathList.length) {
          this.renderContent(this.pathList[this.counter])
          this.scrollPage()
        }
      }
    }
  },
  activated() {
    window.addEventListener('scroll', this.scrollPage)
  },
  mounted() {
    // this.updateSection();
    // console.log(this.productList, this.$store.state.moduleStore)
    // this.$router.push(this.$route.path + '?page=1')
    // console.log(this.$route.query)
    // console.log(this.$options)
    //335078961 - img коммент
    //332260061 - коммент
    // Золкин Олег: 604825, Дмитрий Золкин: 709461, Золкин Дмитрий Олегович: 739361, Золкин Олег Анатольевич: (739661 740661), Золкина Катя: 785861

    folders.forEach((el) => (el.opened = false))

    this.fixList(this.folders, folders)
    this.selectedItem = { id: null }
    this.scrollPage()

    // https://webdevblog.ru/15-obyazatelnyh-direktiv-vue-kotorye-znachitelno-uvelichat-vashu-proizvoditelnost/
    // let number = 3000500
    // console.log(new Intl.NumberFormat().format(number))
  },
  beforeRouteLeave(to, { name }, next) {
    window.removeEventListener('scroll', this.scrollPage)
    localStorage.setItem(`${name}_scroll`, window.scrollY)
    next()
  }
}
</script>
