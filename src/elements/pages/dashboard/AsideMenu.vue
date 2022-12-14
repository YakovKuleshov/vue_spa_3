<template>
  <div class="aside-menu">
    <shadow-button>
      <p-icon name="btn1" viewBox="0 0 37 38" />
    </shadow-button>
    <shadow-button>
      <p-icon name="btn2" viewBox="0 0 35 35" />
    </shadow-button>
    <shadow-button>
      <p-icon name="btn3" viewBox="0 0 39 32" />
    </shadow-button>
    <shadow-button>
      <p-icon name="btn4" viewBox="0 0 35 36" />
    </shadow-button>
    <shadow-button>
      <p-icon name="btn5" viewBox="0 0 35 35" />
    </shadow-button>
    <shadow-button class="aside-menu__logout">
      <p-icon name="btn6" viewBox="0 0 37 36" />
    </shadow-button>
  </div>
</template>

<script>
import ShadowButton from './ShadowButton'
import PIcon from '@/elements/p-icon/PIcon.vue'

export default {
  components: {
    ShadowButton,
    PIcon
  }
}
</script>

<style scoped>
.aside-menu {
  width: 150px;
  border-radius: 24px 24px 0 0;
  box-shadow: var(--shadow);
  height: 1200px;
  padding: 102px 35px 102px 25px;
  display: flex;
  flex-direction: column;
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
</style>
