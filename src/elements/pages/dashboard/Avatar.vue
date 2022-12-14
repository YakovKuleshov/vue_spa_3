<template>
  <div class="avatar">
    <div class="avatar__image" :style="{ backgroundImage: `url(${imgPath})` }" />
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    }
  },
  computed: {
    imgPath() {
      return require(`@/assets/img/${this.image}`)
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow: var(--shadow-avatars);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar__image {
  width: 53px;
  height: 53px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 64px 64px;
}
</style>
