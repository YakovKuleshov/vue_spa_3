<template>
  <div class="mobile-popup" @click="closeModal">
    <Navigation :class="{ menu__active: showMenu }" @click.stop />
  </div>
</template>
<script>
import Navigation from '@/elements/main-navigation/Navigation.vue'

export default {
  components: {
    Navigation
  },
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    closeModal() {
      this.showMenu = false
      setTimeout(() => {
        this.$emit('close')
      }, 300)
    }
  },
  mounted() {
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      this.showMenu = true
    }, 100)
  },
  beforeUnmount() {
    document.body.removeAttribute('style')
  }
}
</script>

<style scoped>
.mobile-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  /* backdrop-filter: blur(10px); */
  padding: 10px;
  z-index: 5;
}

.mobile-popup:deep(.menu) {
  padding-top: 30px;
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  background: #7660c9;
  height: 100%;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.5);
  transform: translateX(100%);
  width: 60%;
  transition: 0.3s;
}

.menu__active {
  transform: translateX(0) !important;
}

.mobile-popup:deep(.shadow__line) {
  display: none;
}

.mobile-popup:deep(.menu__item) {
  margin-bottom: 20px;
  padding: 0 20px;
}

.mobile-popup:deep(.menu__item:last-of-type) {
  margin: 0;
}

.mobile-popup:deep(.menu__item:after) {
  display: none;
}
</style>
