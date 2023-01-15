<template>
  <div class="swiper-vue">
    <div class="coverflow-example">
      <swiper
        class="swiper"
        :modules="modules"
        :init="true"
        :speed="700"
        :effect="'coverflow'"
        :grab-cursor="false"
        :centered-slides="true"
        :space-between="20"
        :slides-per-view="3"
        :loop="true"
        :pagination="{
          clickable: true
        }"
        :coverflow-effect="{
          rotate: 50,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true
        }"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          breakpoints: {
            992: {
              slidesPerView: 1,
              spaceBetween: 10
            }
          }
        }"
      >
        <swiper-slide class="slide" v-for="slide in wallpapers" :key="slide.image">
          <lazy-image :path="imagePath(slide.image)" :name="slide.name" />
          <lazy-image class="swiper-slide__shadow" :path="imagePath(slide.image)" :name="slide.name" />
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import LazyImage from '@/elements/lazy-image/LazyImage.vue'
import { Pagination, EffectCoverflow, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export default {
  components: {
    LazyImage,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Pagination, EffectCoverflow, Navigation],
      wallpapers: [
        {
          image: 'ford',
          name: 'FORD GT40'
        },
        {
          image: 'lamborghini',
          name: 'LAMBORGHINI AVENTADOR'
        },
        {
          image: 'aston',
          name: 'ASTON MARTIN'
        },
        {
          image: 'bugatti',
          name: 'BUGATTI VEYRON'
        },
        {
          image: 'ford_3',
          name: 'FORD GT40'
        },
        {
          image: 'camaro',
          name: 'SHEVROLET COMARO'
        },
        {
          image: 'lambo_concept',
          name: 'LAMBORGHINI CONCEPT'
        },
        {
          image: 'ferrari',
          name: 'FERRARI 488 GT3'
        },
        {
          image: 'ferrari_3',
          name: 'FERRARI 458 ITALIA'
        },
        {
          image: 'concept',
          name: 'CONCEPT'
        },
        {
          image: 'ferrari_2',
          name: 'FERRARI 488'
        },
        {
          image: 'citroen',
          name: 'CITROEN'
        },
        {
          image: 'ford_2',
          name: 'FORD GT40'
        },
        {
          image: 'corvette',
          name: 'CHEVROLET CORVETTE'
        },
        {
          image: 'mercedes',
          name: 'MERCEDES AMG SLS'
        },
        {
          image: 'huracan',
          name: 'LAMBORGHINI HURACAN'
        },
        {
          image: 'porshe_2',
          name: 'PORSHE 911'
        },
        {
          image: 'mclaren',
          name: 'MCLAREN 650S'
        }
      ]
    }
  },
  methods: {
    imagePath(img) {
      return require(`@/assets/img/${img}.jpg`)
    }
  }
}
</script>

<style scoped>
.swiper-vue {
  max-width: 1920px;
  margin: 0 auto;
}

.coverflow-example {
  height: 600px;
  position: relative;
}

.swiper-button-prev {
  position: absolute;
  width: 35px;
  height: 35px;
  left: 10%;
  border-bottom: 5px solid #fff;
  border-left: 5px solid #fff;
  cursor: pointer;
  border-radius: 5px;
  top: 50%;
  transform: translate(10px, -50%) rotate(45deg);
  z-index: 1;
  transition: 0.5s;
  opacity: 0;
}

.swiper-button-next {
  position: absolute;
  width: 35px;
  height: 35px;
  right: 10%;
  border-bottom: 5px solid #fff;
  border-right: 5px solid #fff;
  cursor: pointer;
  border-radius: 5px;
  top: 50%;
  transform: translate(-10px, -50%) rotate(-45deg);
  z-index: 1;
  transition: 0.5s;
  opacity: 0;
}

.coverflow-example:hover .swiper-button-prev {
  transform: translate(0px, -50%) rotate(45deg);
  opacity: 1;
}

.coverflow-example:hover .swiper-button-next {
  transform: translate(0px, -50%) rotate(-45deg);
  opacity: 1;
}

.swiper {
  height: 100%;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide {
  position: relative;
  width: 200px;
  height: 300px;
}

.swiper-slide__shadow {
  position: absolute;
  left: 0px;
  top: 100%;
  width: 100%;
  height: 100%;
  transform: scale(1, -1);
  opacity: 0.2;
}

.swiper-vue:deep(.swiper-pagination-bullet) {
  width: 15px;
  height: 15px;
}

.swiper-vue:deep(.swiper-pagination-bullet) {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #333;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 1px 2px 6px rgb(0, 0, 0, 0.7);
  transition: 0.5s;
  opacity: 1;
}

.swiper-vue:deep(.swiper-pagination-bullet-active) {
  background: #07f;
  box-shadow: 0 0 0 rgb(0, 0, 0, 0.7);
  pointer-events: none;
}

.swiper-vue:deep(.swiper-wrapper) {
  will-change: transform;
  height: 60%;
}
</style>
