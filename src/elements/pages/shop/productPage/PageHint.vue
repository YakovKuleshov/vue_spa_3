<template>
  <div class="page__hint">
    <p-icon name="info" viewBox="0 0 24 24"></p-icon>
    <p v-if="text" class="page__hint__text">{{ text }}</p>
    <slot></slot>
  </div>
</template>

<style scoped>
.page__hint {
  border-radius: 4px;
  padding: 9.35px;
  display: flex;
  align-items: center;
  background-color: #e1f7fa;
  color: #2195f3;
}

.page__hint__text {
  color: grey;
  font-size: 15px;
  line-height: 18px;
  margin: 0 0 0 8px;
  letter-spacing: 0.5px;
}

.p-icon {
  width: 16px;
  height: 16px;
}
</style>

<script>
import PIcon from '@/elements/p-icon/PIcon.vue'

export default {
  components: {
    PIcon
  },
  props: {
    text: {
      type: String
    }
  }
}
</script>
