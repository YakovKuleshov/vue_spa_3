<template>
  <div class="x-tabs">
    <div
      v-for="item in tabs"
      class="x-tibs__item"
      :class="{ 'x-tibs__item_active': item.id === selected }"
      :key="item.id"
      @click="$emit('change', item.id)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    selected: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.x-tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e9;
  height: 25px;
  margin-bottom: 12px;
}

.x-tibs__item {
  position: relative;
  margin-right: 28px;
  cursor: pointer;
  font-weight: bold;
  color: #595959;
  height: 100%;
}

.x-tibs__item:last-of-type {
  margin: 0;
}

.x-tibs__item:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #07f;
  transition: 0.3s;
  transform: scale(0);
  transform-origin: center;
}

.x-tibs__item_active:after {
  transform: scale(1);
}

@media (max-width: 576px) {
  .x-tabs {
    white-space: nowrap;
  }
}
</style>
