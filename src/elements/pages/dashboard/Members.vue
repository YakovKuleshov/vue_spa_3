<template>
  <div class="members">
    <div class="members__filters">
      <x-select v-model="selectedPosition" :list="positions" />
    </div>
    <div class="members__list">
      <member-card v-for="user in filteredList" :key="user.id" :card-data="user" />
    </div>
  </div>
</template>

<script>
import MemberCard from './MemberCard.vue'
import XSelect from './XSelect.vue'
import { projectsList, positions } from './constants/index'

export default {
  components: {
    MemberCard,
    XSelect
  },
  data() {
    return {
      positions,
      selectedPosition: {}
    }
  },
  computed: {
    usersList() {
      return projectsList.map((el) => el.users).flat()
    },
    filteredList() {
      return this.usersList.filter((el) => (this.selectedPosition.id ? el.pos_id === this.selectedPosition.id : el))
    }
  }
}
</script>

<style scoped>
.members__filters {
  margin-bottom: 20px;
}

.members__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  grid-auto-rows: 300px;
}

@media (max-width: 1200px) {
  .members__list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .members__list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .members__list {
    grid-template-columns: 1fr;
  }
}
</style>
