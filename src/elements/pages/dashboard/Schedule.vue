<template>
  <div class="schedule" :class="{ schedule_active: hide }" @click.stop="hide = !hide">
    <div class="schedule__title">Today’s Schedule</div>
    <div class="schedule-item">
      <Avatar image="img1.svg" />
      <div class="schedule-item__text">
        <div class="schedule-item__time">9.20-10.20 am</div>
        <div class="schedule-item__name">Meeting With Team X</div>
        <div class="schedule-item__desc">at Meeting Room</div>
      </div>
    </div>
    <div class="schedule-item">
      <Avatar image="img2.svg" />
      <div class="schedule-item__text">
        <div class="schedule-item__time">12.30-1.30 am</div>
        <div class="schedule-item__name">Presentation Demo On Target Project</div>
        <div class="schedule-item__desc">at Conference Room 2</div>
      </div>
    </div>
    <div class="schedule-item">
      <Avatar image="img1.svg" />
      <div class="schedule-item__text">
        <div class="schedule-item__time">12.30-1.30 pm</div>
        <div class="schedule-item__name">Meeting With CEO</div>
        <div class="schedule-item__desc">at CEO’s Room</div>
      </div>
    </div>
    <div class="schedule-item">
      <Avatar image="img3.svg" />
      <div class="schedule-item__text">
        <div class="schedule-item__time">4.30-5.00 pm</div>
        <div class="schedule-item__name">Daily Standup Meet</div>
        <div class="schedule-item__desc">at Conference Room 1</div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'

export default {
  components: {
    Avatar
  },
  data() {
    return {
      hide: false
    }
  }
}
</script>

<style scoped>
.schedule {
  padding: 25px 27px;
  box-shadow: var(--shadow);
  background: var(--bg);
  border-radius: 8px;
}

.schedule__title {
  margin-bottom: 25px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
}

.schedule-item {
  display: flex;
  align-items: center;
  margin-bottom: 41px;
}

.schedule-item:last-of-type {
  margin-bottom: 0;
}

.schedule-item__text {
  margin-left: 8px;
}

.schedule-item__time {
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 4px;
}

.schedule-item__name {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 10px;
}

.schedule-item__desc {
  font-size: 10px;
  line-height: 12px;
}

.schedule:deep(.avatar__image) {
  background-size: cover;
}

@media (max-width: 1700px) {
  .schedule {
    position: absolute;
    top: 850px;
    right: -295px;
    z-index: 1;
    width: 320px;
    transition: right 0.3s;
  }

  .schedule_active {
    right: 0;
  }

  .schedule:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 5px;
    height: 50px;
    border-radius: 5px;
    background: #07f;
  }
}
</style>
