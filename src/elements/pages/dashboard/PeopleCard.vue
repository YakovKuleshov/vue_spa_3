<template>
  <div class="people-card">
    <div class="people-card__img" :style="{ background: `url(${userAvatar}) no-repeat center`, backgroundSize: 'contain' }"></div>
    <div class="people-card__name">{{ cardData.name }}</div>
    <div class="people-card__desc">{{ cardData.position }}</div>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    userAvatar() {
      return require(`@/assets/img/${this.cardData.ava}.png`)
    }
  }
}
</script>

<style scoped>
.people-card {
  box-shadow: var(--shadow);
  border-radius: 8px;
  padding: 20px;
}

.people-card__img {
  height: 150px;
  margin-bottom: 30px;
}

.people-card__name {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 1px;
  margin-bottom: 15px;
}

.people-card__desc {
  text-align: center;
  letter-spacing: 1px;
  opacity: 0.5;
}
</style>
