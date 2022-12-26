<template>
  <div class="member-card">
    <div class="member-card__img" :style="{ background: `url(${userAvatar}) no-repeat center`, backgroundSize: 'contain' }"></div>
    <div class="member-card__name">{{ cardData.name }}</div>
    <div class="member-card__desc">{{ cardData.position }}</div>
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
.member-card {
  box-shadow: var(--shadow);
  border-radius: 8px;
  padding: 20px;
}

.member-card__img {
  height: 150px;
  margin-bottom: 30px;
}

.member-card__name {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 1px;
  margin-bottom: 15px;
}

.member-card__desc {
  text-align: center;
  letter-spacing: 1px;
  opacity: 0.5;
}
</style>
