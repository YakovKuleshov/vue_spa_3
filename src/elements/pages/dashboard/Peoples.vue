<template>
  <div class="peoples">
    <people-card v-for="user in usersList" :key="user.id" :card-data="user" />
  </div>
</template>

<script>
import PeopleCard from './PeopleCard.vue'
import { projectsList } from './constants/index'

export default {
  components: {
    PeopleCard
  },
  computed: {
    usersList() {
      return projectsList.map((el) => el.users).flat()
    }
  }
}
</script>

<style scoped>
.peoples {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  grid-auto-rows: 300px;
}

@media (max-width: 1200px) {
  .peoples {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .peoples {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .peoples {
    grid-template-columns: 1fr;
  }
}
</style>
