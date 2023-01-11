<template>
  <div id="slider">
    <div class="image__conrainer">
      <Skeleton />
      <div
        class="image"
        :style="{
          backgroundImage: `url(${imgUrl})`
        }"
      >
        <div class="buttons next" @click="toNextSlide"></div>
        <div class="buttons prev" @click="toPrevSlide"></div>
      </div>
    </div>
    <div class="dots__container" ref="dotsContainer">
      <div class="dots">
        <div
          v-for="(item, index) in wallpapers"
          class="dot__item"
          :key="index"
          :class="{ active: index === current }"
          ref="dotItem"
          @click="chooseSlide(index)"
        >
          <lazy-image class="dot__image" :path="getImage(item)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#slider {
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
}

#slider .skeleton {
  overflow: hidden;
}

#slider .skeleton__wrap {
  width: 25%;
  padding-top: 25%;
}

#slider .skeleton__item {
  margin-top: 4%;
}

.image__conrainer {
  position: relative;
  margin: 0 auto 30px;
  max-width: 800px;
  border: 4px solid #fff;
  box-shadow: 12px 20px 33px rgba(0, 0, 0, 0.7);
  background: #fff;
}

.image {
  position: relative;
  padding-top: 56%;
  transition: 0.3s;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.buttons {
  cursor: pointer;
  position: absolute;
  top: 45%;
  border-radius: 3px;
  transform: translateY(-50%);
}

.next {
  width: 30px;
  height: 30px;
  right: -70px;
  border-bottom: 5px solid #07f;
  border-right: 5px solid #07f;
  transform: rotate(-45deg);
}

.prev {
  width: 30px;
  height: 30px;
  left: -70px;
  border-bottom: 5px solid #07f;
  border-left: 5px solid #07f;
  transform: rotate(45deg);
}

.dots__container {
  overflow: hidden;
  padding: 30px 0;
  scroll-behavior: smooth;
}

.dots__container::-webkit-scrollbar {
  display: none;
}

.dots {
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.dot__item {
  width: 180px;
  height: 101px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 0 10px;
  flex-shrink: 0;
}

.dot__image {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  border: 3px solid #fff;
  box-shadow: 8px 10px 15px rgba(0, 0, 0, 0.8);
}

.active {
  pointer-events: none;
}

.active .dot__image {
  box-shadow: 0 0 0 rgb(0 0 0 / 80%);
  box-sizing: border-box;
  border-color: #07f;
  transform: translate(2px, 2px);
}
</style>

<script>
import LazyImage from '@/elements/lazy-image/LazyImage.vue'
import Skeleton from '@/elements/skeleton/Skeleton.vue'

export default {
  components: {
    LazyImage,
    Skeleton
  },
  data() {
    return {
      current: 0,
      flag: true,
      wallpapers: [
        {
          image: 'ford'
        },
        {
          image: 'lamborghini'
        },
        {
          image: 'aston'
        },
        {
          image: 'bugatti'
        },
        {
          image: 'ford_3'
        },
        {
          image: 'camaro'
        },
        {
          image: 'lambo_concept'
        },
        {
          image: 'ferrari'
        },
        {
          image: 'ferrari_3'
        },
        {
          image: 'concept'
        },
        {
          image: 'ferrari_2'
        },
        {
          image: 'citroen'
        },
        {
          image: 'ford_2'
        },
        {
          image: 'corvette'
        },
        {
          image: 'mercedes'
        },
        {
          image: 'huracan'
        },
        {
          image: 'porshe_2'
        },
        {
          image: 'mclaren'
        }
      ]
    }
  },
  watch: {
    current(val) {
      this.centeringActive(val)
    }
  },
  methods: {
    centeringActive(current) {
      const container = this.$refs.dotsContainer
      const active = this.$refs.dotItem.find((el) => el.classList.contains('active'))

      container.scrollLeft = active.offsetWidth * current - container.offsetWidth / 2 + active.offsetWidth / 2
    },

    toNextSlide() {
      if (!this.flag) return false
      this.current++
      this.flag = false
      if (this.current > this.wallpapers.length - 1) {
        this.current = 0
      }

      setTimeout(() => {
        this.flag = true
      }, 400)
    },

    toPrevSlide() {
      if (!this.flag) return false
      this.current--
      this.flag = false
      if (this.current < 0) {
        this.current = this.wallpapers.length - 1
      }

      setTimeout(() => {
        this.flag = true
      }, 400)
    },

    chooseSlide(index) {
      if (!this.flag) return false
      this.flag = false
      this.current = index

      setTimeout(() => {
        this.flag = true
      }, 400)
    },
    getImage(item) {
      return require(`@/assets/img/${item.image}.jpg`)
    }
  },
  computed: {
    imgUrl() {
      return require(`@/assets/img/${this.wallpapers[this.current].image}.jpg`)
    }
  }
}
</script>
