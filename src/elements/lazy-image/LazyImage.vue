<template>
  <div class="lazy-image">
    <img class="lazy-image_image" :class="{ 'lazy-image_loaded': show }" :src="path" loading="lazy" @load="isLoaded" />
    <Skeleton v-if="!show" />
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
    }
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
}
</style>
