<template>
  <div class="x-img">
    <img v-if="src" v-show="loaded && !error" v-bind="$attrs" :src="src" class="x-img__img" @load="onLoad" @error="onError" />
    <p-icon v-if="!src || (loaded && error)" viewBox="0 0 24 24" class="x-img__icon" name="camera-off" />
    <x-loader v-if="!!src && !loaded && !error" color="gray" class="x-img__loader" />
  </div>
</template>

<script>
import PIcon from '@/elements/p-icon/PIcon.vue'
import XLoader from './XLoader.vue'

export default {
  inheritAttrs: false,
  components: {
    PIcon,
    XLoader
  },
  props: {
    src: String,
    size: {
      type: [Number, String],
      default: 68
    }
  },
  data: () => ({
    loaded: false,
    error: false
  }),
  watch: {
    src() {
      this.loaded = false
      this.error = false
    }
  },
  methods: {
    onLoad() {
      this.error = false
      this.loaded = true
    },
    onError() {
      this.error = true
      this.loaded = true
    }
  }
}
</script>

<style scoped>
.x-img {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #c0c0c0;
  border-radius: 10px;
  overflow: hidden;
  width: 177px;
  height: 177px;
}

.x-img::after {
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 1px;
  border-color: #e5e5e9;
  border-radius: 10px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}

.x-img__img {
  background-color: #fff;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.x-img__icon,
.x-img__loader .x-loader__wrapper {
  width: 177px;
  height: 177px;
}

.p-icon {
  width: 70px;
  height: 70px;
}
</style>
