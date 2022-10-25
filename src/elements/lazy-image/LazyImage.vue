<template>
  <div class="lazy-image">
    <img class="lazy-image_image" :class="{ 'lazy-image_loaded': show }" :src="path" loading="lazy" @load="isLoaded" />
    <div v-if="!show" class="lazy-image__poster"></div>
  </div>
</template>

<script>
export default {
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

.lazy-image__poster {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 105%;
  height: 105%;
  filter: blur(15px);
  background: url('@/assets/img/blue_wallpaper.jpg') no-repeat center;
  background-size: cover;
}
</style>
