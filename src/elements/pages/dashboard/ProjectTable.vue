<template>
  <div class="project-table">
    <div class="project-table__head">
      <div class="project-table__head-item">RECENT PROJECTS</div>
      <div class="project-table__head-item">CREATED</div>
      <div class="project-table__head-item">TEAM LEADER</div>
      <div class="project-table__head-item">DUE</div>
      <div class="project-table__head-item">STATUS</div>
    </div>
    <div v-for="project in projectHistoryList" class="project-table__item" :key="project.id">
      <div
        class="project-table__cell project-table__cell_image"
        :style="{ backgroundImage: `url(${getProjectName(project.name)})` }"
      />
      <div class="project-table__cell">{{ project.created }}</div>
      <div class="project-table__cell">{{ project.team_leader }}</div>
      <div class="project-table__cell">{{ project.execution_term }}</div>
      <div class="project-table__cell">{{ project.status }}</div>
    </div>
  </div>
</template>

<script>
import { projectHistoryList } from './constants/index'

export default {
  data() {
    return {
      projectHistoryList
    }
  },
  methods: {
    getProjectName(name) {
      return require(`@/assets/img/${name}.svg`)
    }
  }
}
</script>

<style scoped>
.project-table__head {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 150px;
  margin-bottom: 20px;
  padding: 0 0 0 32px;
}

.project-table__head-item {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 0 5px;
}

.project-table__item {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 150px;
  align-items: center;
  grid-auto-rows: 60px;
  border-radius: 50px;
  box-shadow: var(--shadow);
  margin-bottom: 25px;
  font-size: 14px;
  line-height: 17px;
  padding: 0 0 0 32px;
}

.project-table__item:last-of-type {
  margin-bottom: 0;
}

.project-table__cell_image {
  background-size: contain;
  background-position: left;
  background-repeat: no-repeat;
  height: 30px;
}

.project-table__cell {
  padding: 0 5px;
}
</style>
