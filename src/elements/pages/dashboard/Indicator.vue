<template>
  <div class="progress-bar">
    <div class="progress-bar__indicator" :style="{ height: `${localValue}%` }" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      localValue: 0
    }
  },
  mounted() {
    // this.localValue = this.value
  }
}
</script>

<style>
.progress-bar {
  position: relative;
  height: 190px;
  width: 16px;
  box-shadow: var(--inset-shadow);
  border-radius: 30px;
  flex-shrink: 0;
  margin-bottom: 5px;
}

.progress-bar__indicator {
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 30px;
  width: 100%;
  transition: height 1s;
  background: #4aad6b;
}
</style>
