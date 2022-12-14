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
  transition: box-shadow transform 0.1s;
}

.shadow-button:active {
  box-shadow: var(--inset-shadow);
  color: #1a91fa !important;
  transform: translate(1px, 1px);
}
</style>
