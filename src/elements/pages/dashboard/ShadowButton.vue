<template>
  <button class="shadow-button" @click.stop>
    <slot></slot>
  </button>
</template>

<style scoped>
.shadow-button {
  box-shadow: var(--shadow);
  background: var(--bg);
  color: var(--color);
  width: 230px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 24px;
  transition: transform 0.2s;
}
</style>
