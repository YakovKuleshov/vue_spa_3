<template>
  <div class="project-bunner">
    <div class="project-bunner__label">Project:</div>
    <div class="project-bunner__name" :style="{ backgroundImage: `url(${getProjectName})` }" />
    <div class="project-bunner__sublabel">Team Members:</div>
    <div class="members-list">
      <div v-for="user in project.users" class="members-list__item" :key="user.id">
        <div class="members-list__ava" :style="{ backgroundImage: `url(${getAvatar(user.ava)})` }" />
        <div class="members-list__name">{{ user.name }}</div>
        <div class="members-list__role">{{ user.position }}</div>
      </div>
    </div>
    <div class="project-bunner__progress">Project Progress:</div>
    <Progress :value="project.progress" />
  </div>
</template>

<script>
import Progress from './Progress.vue'

export default {
  components: {
    Progress
  },
  props: {
    project: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getAvatar(ava) {
      return require(`@/assets/img/${ava}.png`)
    }
  },
  computed: {
    getProjectName() {
      return require(`@/assets/img/${this.project.name}.svg`)
    }
  }
}
</script>

<style scoped>
.project-bunner {
  background: linear-gradient(138.69deg, #1d5ba9 0%, #0a325a 100%);
  box-shadow: 14px 14px 40px rgba(16, 16, 18, 0.75), -7px -7px 30px #262e32;
  border-radius: 8px;
  padding: 25px 30px;
}

.light .project-bunner {
  box-shadow: var(--shadow);
}

.project-bunner__label {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #f2f5f8;
}

.project-bunner__name {
  height: 30px;
  background: url('@/assets/img/autodesk.svg') no-repeat center;
  background-size: contain;
  margin-bottom: 24px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.project-bunner__sublabel {
  color: #c8d3f1;
  margin-bottom: 9px;
}

.members-list {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

.members-list__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
}

.members-list__ava {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 2px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.members-list__name {
  font-size: 11px;
  line-height: 12px;
  margin-bottom: 2px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  width: 100%;
  color: #ffffff;
}

.members-list__role {
  font-size: 10px;
  line-height: 10px;
  color: #8a88b7;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
}

.project-bunner__progress {
  font-size: 14px;
  line-height: 17px;
  color: #f2f5f8;
  margin-bottom: 9px;
}

.project-bunner .progress {
  margin: 0 auto;
}

@media (max-width: 1400px) {
  .members-list {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 400px) {
  .members-list__item {
    width: calc(100% / 2 - 10px);
  }
}
</style>
