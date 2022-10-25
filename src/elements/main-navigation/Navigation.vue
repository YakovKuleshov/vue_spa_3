<template>
  <div class="menu" ref="menu">
    <div v-if="lineWidth" class="shadow__line" :style="{ width: lineWidth + 'px', left: lineLeft + 'px' }" />
    <template v-for="item in filteredList" :key="item.id">
      <div class="menu__item" ref="menuItem">
        <router-link :exact="item.exact" :to="item.id">
          <p-icon :name="item.icon.name" :viewBox="item.icon.viewBox"/>
          {{ item.name }}
        </router-link>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PIcon from '@/elements/p-icon/PIcon.vue'

export default {
  components: {
    PIcon
  },
  data() {
    return {
      lineWidth: 0,
      lineLeft: 0
    }
  },
  watch: {
    $route(route) {
      if (window.innerWidth > 1220) {
        const items = this.$refs.menuItem
        const activeItem = items.find((el) => el.children[0].getAttribute('href') === route.path)

        setTimeout(() => {
          if (activeItem) {
            this.lineWidth = activeItem.offsetWidth
            this.lineLeft = activeItem.offsetLeft
          }
        })
      }
    }
  },
  computed: {
    ...mapState('mainStore', ['menuList']),
    ...mapGetters('mainStore', ['isDev']),
    filteredList() {
      return this.menuList.filter((el) => (this.$isMobile ? el.id !== '/other' : el))
    }
  }
}
</script>

<style scoped>
.menu {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
}

.shadow__line {
  transition: 0.2s;
  position: absolute;
  height: 2px;
  bottom: 0px;
  background: #f90;
}

.menu__item {
  position: relative;
  cursor: pointer;
  font-size: 18px;
  text-decoration: none;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-right: 25px;
}

.menu__item a {
  color: #fff;
  transition: 0.1s;
  display: flex;
  align-items: center;
}

.p-icon {
  margin-right: 8px;
  width: 18px;
  height: 18px;
}

.menu__item:after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -15px;
  width: 1px;
  height: 110%;
  background: linear-gradient(to top, transparent 0%, #fff 50%, transparent 100%);
}

.menu__item:last-of-type {
  margin-right: 0;
}

.menu__item:last-of-type:after {
  display: none;
}

.router-link-exact-active {
  color: #f90 !important;
}
</style>
