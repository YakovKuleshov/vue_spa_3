<template>
  <div class="dashboard" :class="lightTheme" @click="testFn">
    <h2 class="page__title">Дэшборд</h2>
    <div class="dashboard__content">
      <div class="dashboard__container">
        <div class="dashboard__header">
          <div class="dashboard__logo">DBM.</div>
          <div class="dashboard__nav">
            <shadow-button>Dashboard</shadow-button>
            <shadow-button>Message</shadow-button>
            <shadow-button>Help</shadow-button>
            <div class="dashboard__user">
              <div class="dashboard__notifications">
                <p-icon name="bell" viewBox="0 0 23 24" />
              </div>
              <Avatar image="ava1.png" />
              <div class="dashboard__user__name">Simrah Shah</div>
            </div>
          </div>
        </div>
        <div class="dashboard__row">
          <div class="dashboard__aside">
            <aside-menu />
          </div>
          <div class="dashboard__center">
            <div class="section">
              <div class="dashboard__projects">
                <project-banner v-for="project in projectsList" :key="project.id" :project="project" />
              </div>
            </div>
            <div class="section">
              <project-table />
            </div>
            <div class="section">
              <div class="dashboard__subtitle">Project Overview</div>
              <div class="dashboard__statistics">
                <project-status />
                <Views />
                <Estimation />
              </div>
            </div>
          </div>
          <div class="dashboard__right">
            <Activities />
            <Schedule />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShadowButton from './ShadowButton'
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
import saveScroll from '@/mixins/saveScroll'

export default {
  mixins: [saveScroll],
  components: {
    ShadowButton,
    PIcon,
    Avatar,
    AsideMenu,
    ProjectBanner,
    Activities,
    ProjectTable,
    ProjectStatus,
    Views,
    Estimation,
    Schedule
  },
  data() {
    return {
      lightTheme: 'dark',
      projectsList
    }
  },
  methods: {
    testFn() {
      this.lightTheme = this.lightTheme === 'dark' ? 'light' : 'dark'
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

.section {
  margin-bottom: 60px;
}

.page__title {
  margin-bottom: 40px;
  font-size: 40px;
}

.dashboard__content {
  background: var(--bg);
  color: var(--color);
  border-radius: 20px;
  box-shadow: 10px 21px 43px rgb(0, 0, 0, 0.6);
  overflow: hidden;
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
}

.dashboard__logo {
  box-shadow: var(--shadow);
  border-radius: 24.8921px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: bold;
  width: 105px;
  height: 90px;
  margin-left: 21px;
  flex-shrink: 0;
}

.dashboard__nav {
  margin-left: 78px;
  box-shadow: var(--shadow);
  height: 100%;
  flex-grow: 1;
  border-radius: 0 0 0 24px;
  padding: 0 33px 0 86px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.dashboard__nav .shadow-button {
  color: var(--color);
}

.dashboard__nav .shadow-button:not(:last-of-type) {
  margin-right: 50px;
}

.dashboard__user {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.dashboard__notifications {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard__notifications .p-icon {
  width: 22px;
  height: 24px;
}

.dashboard__nav .avatar {
  margin: 0 20px 0 40px;
}

.dashboard__user__name {
  box-shadow: var(--shadow);
  width: 274px;
  height: 60px;
  font-size: 25px;
  line-height: 60px;
  padding: 0 36px;
  flex-shrink: 0;
  border-radius: 50px;
}

.dashboard__row {
  display: flex;
  padding-right: 30px;
}

.dashboard__center {
  margin: 0 28px 0 53px;
}

.dashboard__projects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 28px;
}

.dashboard__right {
  flex-grow: 1;
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
</style>
