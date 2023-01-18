<template>
  <div class="lazy-image">
    <img class="lazy-image_image" :class="{ 'lazy-image_loaded': show }" loading="lazy" @load="isLoaded" @error="loadError" />
    <Skeleton v-if="!show" />
    <div v-if="name" class="lazy-image__title">{{ name }}</div>
  </div>
</template>

<script>
import Skeleton from '@/elements/skeleton/Skeleton.vue'

export default {
  components: {
    Skeleton
  },
  props: {
    path: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    isLoaded() {
      this.show = true
    },
    loadError() {
      this.$emit('error')
    }
  },
  mounted() {
    const img = this.$el.querySelector('.lazy-image_image')
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            img.setAttribute('src', this.path)
            observer.unobserve(en.target)
          }
        })
      },
      { threshold: 0 }
    )

    observer.observe(this.$el)
  }
}
</script>

<style>
.lazy-image {
  height: 100%;
  width: 100%;
  transition: 0.3s;
  position: relative;
  overflow: hidden;
}

.lazy-image_image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
}

.lazy-image_loaded {
  opacity: 1;
  z-index: 1;
}

.lazy-image__title {
  position: absolute;
  bottom: 0;
  z-index: 1;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  color: #ffc97f;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  letter-spacing: 0.5px;
}
</style>
