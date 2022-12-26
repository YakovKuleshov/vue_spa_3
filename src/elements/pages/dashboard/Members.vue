<template>
  <div class="members">
    <member-card v-for="user in usersList" :key="user.id" :card-data="user" />
  </div>
</template>

<script>
import MemberCard from './MemberCard.vue'
import { projectsList } from './constants/index'

export default {
  components: {
    MemberCard
  },
  computed: {
    usersList() {
      return projectsList.map((el) => el.users).flat()
    }
  }
}
</script>

<style scoped>
.members {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  grid-auto-rows: 300px;
}

@media (max-width: 1200px) {
  .members {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .members {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .members {
    grid-template-columns: 1fr;
  }
}
</style>
