<template>
  <svg class="p-icon" xmlns="http://www.w3.org/2000/svg">
    <use :xlink:href="`${iconUrl}#${name}`" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
  },
  computed: {
    iconUrl() {
      return require(`@/assets/img/${this.name}.svg`)
    }
  }
}
</script>

<style lang="stylus">
.p-icon
  flex-shrink 0
  fill currentColor
  stroke currentColor
  width 20px
  height 20px
</style>
