<template>
  <div class="aside-menu" :class="{ 'aside-menu_active': showMenu }" @click.stop="showMenu = !showMenu">
    <shadow-button
      v-for="item in menuList"
      :key="item.id"
      :class="{ 'shadow-button_active': selectedMenu === item.id }"
      @click.stop="selectMenu(item.id)"
    >
      <p-icon :name="item.icon" :viewBox="item.viewBox" />
    </shadow-button>

    <!-- <shadow-button class="aside-menu__logout">
      <p-icon name="btn6" viewBox="0 0 37 36" />
    </shadow-button> -->
  </div>
</template>

<script>
import ShadowButton from './ShadowButton'
import PIcon from '@/elements/p-icon/PIcon.vue'
import { menuList } from './constants/index'

export default {
  components: {
    ShadowButton,
    PIcon
  },
  props: {
    selectedMenu: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      menuList,
      showMenu: false
    }
  },
  methods: {
    selectMenu(id) {
      this.$emit('selectMenu', id)
    }
  }
}
</script>

<style scoped>
.aside-menu {
  width: 150px;
  border-radius: 0 24px 24px 0;
  box-shadow: var(--shadow);
  background: var(--bg);
  height: 100%;
  padding: 102px 35px 102px 25px;
  display: flex;
  flex-direction: column;
  transition: left 0.3s;
}

.aside-menu .shadow-button {
  width: 90px;
  height: 90px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.aside-menu .shadow-button:last-of-type {
  margin-bottom: 0;
}

.aside-menu__logout {
  margin-top: auto;
}

.aside-menu .shadow-button .p-icon {
  width: 35px;
  height: 35px;
}

.shadow-button_active {
  box-shadow: var(--inset-shadow);
  color: #1a91fa !important;
  transform: translate(1px, 1px);
  pointer-events: none;
}

@media (max-width: 1880px) {
  .aside-menu {
    top: 300px;
    left: -125px;
    position: absolute;
    z-index: 1;
    height: 700px;
  }

  .aside-menu_active {
    left: 0;
  }

  .aside-menu:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 5px;
    height: 50px;
    border-radius: 5px;
    background: #07f;
  }
}
</style>
