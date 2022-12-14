<template>
  <div class="theme-switcher" :class="{ 'theme-switcher_active': modelValue }" @click="$emit('update:modelValue', !modelValue)">
    <p-icon name="theme-dark" viewBox="0 0 16 16" />
    <p-icon name="theme-light" viewBox="0 0 16 16" />
  </div>
</template>

<script>
import PIcon from '@/elements/p-icon/PIcon.vue'

export default {
  components: {
    PIcon
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.theme-switcher {
  position: relative;
  width: 70px;
  height: 35px;
  border-radius: 20px;
  border: 2px solid #ccc;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.theme-switcher:before {
  content: '';
  position: absolute;
  top: 1px;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #cedbdc;
  box-shadow: var(--shadow);
  z-index: 0;
  transition: left 0.3s;
}

.theme-switcher .p-icon {
  z-index: 1;
}

.theme-switcher_active:before {
  left: 35px;
  background: #ccc;
}

.p-icon:nth-child(1) {
  color: #07f;
}

.theme-switcher_active .p-icon:nth-child(2) {
  color: #07f;
}

.theme-switcher_active .p-icon:nth-child(1) {
  color: var(--color);
}
</style>
