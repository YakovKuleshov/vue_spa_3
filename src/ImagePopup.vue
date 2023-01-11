<template>
  <div class="overlay" @click="clearImgUrl" @mousemove="resetCoords">
    <div class="content" :style="{ transform: `rotateX(${x}deg) rotateY(${y}deg)` }" @mousemove="rotateContent" ref="content">
      <lazy-image class="image" :path="url" @click="changeMainBg(url)" />
    </div>
  </div>
</template>

<style scoped>
.overlay {
  perspective: 800px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 5;
  padding: 20px;
}

.content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1290px;
  max-height: 730px;
  box-shadow: 10px 12px 20px rgba(0, 0, 0, 0.6);
  padding: 10px;
  transform-style: preserve-3d;

  box-sizing: border-box;
  background: #fff;
  border-radius: 10px;
  transition: 0.2s;
}

.image {
  cursor: pointer;
  transform: translateZ(176px);
  height: 73%;
  width: 75%;
  box-shadow: 10px 10px 13px rgba(0, 0, 0, 0.6);
  overflow: visible;
}
</style>

<script>
import { mapMutations } from 'vuex'
import LazyImage from '@/elements/lazy-image/LazyImage.vue'

export default {
  props: ['url'],
  components: {
    LazyImage
  },
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  methods: {
    ...mapMutations('mainStore', ['changeMainBg']),
    clearImgUrl() {
      this.$emit('clearImgUrl')
    },
    rotateContent(e) {
      let block = this.$refs.content
      if (block) {
        let height = block.offsetHeight / 2
        let width = block.offsetWidth / 2
        this.x = -(e.clientY - block.getBoundingClientRect().top - height) / 50
        this.y = (e.clientX - block.getBoundingClientRect().left - width) / 50
      }
    },
    resetCoords(e) {
      if (e.target.classList.contains('overlay')) {
        this.x = 0
        this.y = 0
      }
    }
  },

  mounted() {
    document.body.style.overflow = 'hidden'
  },
  beforeUnmount() {
    document.body.removeAttribute('style')
  }
}
</script>
