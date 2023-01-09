<template>
  <div class="dashboard" :class="{ dark: !lightTheme, light: lightTheme }" @click="hideMenu">
    <h2 class="page__title">Дэшборд</h2>
    <div class="dashboard__content">
      <div class="dashboard__container">
        <div class="dashboard__header">
          <theme-switcher v-model="lightTheme" />
          <div class="dashboard__user">
            <Avatar image="ava1.png" />
            <div class="dashboard__user__name">Simrah Shah</div>
          </div>
        </div>
        <div class="dashboard__row">
          <div class="dashboard__aside">
            <aside-menu :selected-menu="selectedMenu" @selectMenu="selectMenu" ref="aside" />
          </div>
          <div class="dashboard__center">
            <div v-if="selectedMenu === 'main'" class="section">
              <div class="dashboard__projects">
                <project-banner v-for="project in projectsList" :key="project.id" :project="project" />
              </div>
            </div>
            <div v-if="selectedMenu === 'main' || selectedMenu === 'projects'" class="section">
              <project-table />
            </div>
            <div v-if="selectedMenu === 'main' || selectedMenu === 'status'" class="section">
              <div class="dashboard__subtitle">Project Overview</div>
              <div
                class="dashboard__statistics"
                :class="{ dashboard__statistics_wide: selectedMenu === 'status' }"
                :key="statusKey"
              >
                <project-status />
                <Views />
                <Estimation />
              </div>
            </div>
            <Members v-if="selectedMenu === 'members'" />
          </div>
          <div v-if="selectedMenu !== 'members'" class="dashboard__right">
            <Activities ref="activities" />
            <Schedule ref="schedule" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PIcon from '@/elements/p-icon/PIcon.vue'
import Avatar from './Avatar.vue'
import AsideMenu from './AsideMenu.vue'
import ProjectBanner from './ProjectBanner.vue'
import Activities from './Activities.vue'
import { projectsList } from './constants/index'
import ProjectTable from './ProjectTable'
import ProjectStatus from './ProjectStatus.vue'
import Views from './Views.vue'
import Estimation from './Estimation.vue'
import Schedule from './Schedule.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import Members from './Members.vue'
import saveScroll from '@/mixins/saveScroll'

export default {
  mixins: [saveScroll],
  components: {
    PIcon,
    Avatar,
    AsideMenu,
    ProjectBanner,
    Activities,
    ProjectTable,
    ProjectStatus,
    Views,
    Estimation,
    Schedule,
    ThemeSwitcher,
    Members
  },
  data() {
    return {
      lightTheme: localStorage.getItem('lightTheme') === 'true' || false,
      projectsList,
      selectedMenu: 'main',
      statusKey: 0
    }
  },
  watch: {
    lightTheme(val) {
      localStorage.setItem('lightTheme', val)
    }
  },
  methods: {
    hideMenu() {
      if (this.$refs.aside) this.$refs.aside.showMenu = false
      if (this.$refs.activities) this.$refs.activities.hide = false
      if (this.$refs.schedule) this.$refs.schedule.hide = false
    },
    selectMenu(id) {
      this.selectedMenu = id
      if (id === 'status' || id === 'main') this.statusKey++
    }
  },
  beforeRouteLeave(to, { name }, next) {
    localStorage.setItem(`${name}_scroll`, 0)
    next()
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  letter-spacing: 0.5px;
}

.dashboard {
  max-width: 1920px;
  margin: 0 auto;
}

:root .dashboard.dark {
  --bg: #2c2f33;
  --color: #cedbdc;
  --shadow: -6.22302px -6.22302px 18.6691px #3b4451, 6.22302px 6.22302px 18.6691px #000000;
  --inset-shadow: inset -6.22302px -6.22302px 6.22302px #3b4451, inset 3.73381px 3.73381px 6.22302px #000000;
  --shadow-avatars: inset -12.446px -12.446px 31.1151px #3b4451, inset 12.446px 12.446px 31.1151px #000000;
}

:root .dashboard.light {
  --bg: linear-gradient(134.17deg, #eef0f5 4.98%, #e6e9ef 94.88%);
  --color: #686868;
  --shadow: -12px -12px 20px rgba(255, 255, 255, 0.8), 10px 10px 24px rgba(166, 180, 200, 0.7);
  --inset-shadow: inset -5px -5px 15px rgba(255, 255, 255, 0.75), inset 5px 5px 10px rgba(166, 180, 200, 0.75);
  --shadow-avatars: inset -5px -5px 15px rgba(255, 255, 255, 0.75), inset 5px 5px 10px rgba(166, 180, 200, 0.75);
}

.section:not(:last-of-type) {
  margin-bottom: 60px;
}

.page__title {
  margin-bottom: 40px;
  font-size: 40px;
}

.dashboard__content {
  position: relative;
  background: var(--bg);
  color: var(--color);
  border-radius: 20px;
  box-shadow: 10px 21px 43px rgb(0, 0, 0, 0.6);
  overflow: hidden;
  min-height: 1365px;
}

.dashboard__container {
  max-width: 1920px;
  margin: 0 auto;
}

.dashboard__header {
  height: 120px;
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  box-shadow: var(--shadow);
  border-radius: 0 0 24px 24px;
  padding: 0 40px;
}

.dashboard__header .avatar {
  margin: 0 10px 0 10px;
}

.dashboard__user {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.dashboard__user__name {
  box-shadow: var(--shadow);
  height: 60px;
  font-size: 25px;
  line-height: 60px;
  padding: 0 20px;
  flex-shrink: 0;
  border-radius: 50px;
}

.dashboard__row {
  display: flex;
  padding-right: 30px;
}

.dashboard__center {
  margin: 0 28px 0 53px;
  flex-grow: 1;
  padding-bottom: 40px;
}

.dashboard__projects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 28px;
}

.dashboard__right .activities {
  margin-bottom: 60px;
}

.dashboard__subtitle {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 20px;
}

.dashboard__statistics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
}

.dashboard__statistics_wide {
  grid-template-columns: 1fr;
}

.dashboard__statistics_wide .status {
  max-width: 100%;
}

.dashboard__statistics_wide:deep(.indicator__item) {
  width: 20%;
  align-items: center;
}

.dashboard__statistics_wide .views {
  width: 100%;
}

.dashboard__statistics_wide:deep(.estimation-labels) {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 1600px) {
  .dashboard__row {
    padding-right: 0;
  }

  .dashboard__center {
    margin: 0 auto;
    padding: 0 40px 40px;
    width: 100%;
  }
}

@media (max-width: 1400px) {
  .dashboard__statistics .status {
    max-width: 100%;
  }

  .dashboard__statistics:deep(.estimation-labels) {
    grid-template-columns: repeat(4, 1fr);
  }

  .dashboard__statistics:deep(.indicator__item) {
    width: 20%;
    align-items: center;
  }

  .dashboard__statistics {
    grid-template-columns: 100%;
  }
}

@media (max-width: 992px) {
  .dashboard__projects {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .dashboard__projects {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .dashboard__statistics_wide:deep(.estimation-labels) {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard__statistics:deep(.estimation-labels) {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard__header {
    padding: 0 20px;
    height: 80px;
  }

  .dashboard__user__name {
    height: auto;
    padding: 10px;
    font-size: 17px;
    line-height: normal;
  }

  .dashboard__user .avatar {
    width: 50px;
    height: 50px;
  }

  .dashboard__user:deep(.avatar__image) {
    width: 45px;
    height: 45px;
    background-size: 100% 100%;
  }

  .section:nth-child(3) {
    margin: 0 -15px;
  }
}

@media (max-width: 380px) {
  .dashboard__statistics:deep(.estimation-labels) {
    grid-template-columns: 1fr;
    grid-gap: 15px;
  }

  .estimation-labels__name {
    font-size: 11px;
  }
}
</style>
