<template>
  <div class="activities">
    <div class="activities__title">Project Activities</div>
    <div class="user-item">
      <Avatar image="ava17.png" />
      <div class="user-item__text">
        <div class="user-item__name">Tanjimul Alam</div>
        <div class="user-item__desc">Completed Task: Update of Project Alfa</div>
        <div class="user-item__time">11 min ago</div>
      </div>
    </div>
    <div class="user-item">
      <Avatar image="ava1.png" />
      <div class="user-item__text">
        <div class="user-item__name">Sarah Rahman</div>
        <div class="user-item__desc">Request for HR Support: Update of Project X</div>
        <div class="user-item__time">53 min ago</div>
      </div>
    </div>
    <div class="user-item">
      <Avatar image="ava14.png" />
      <div class="user-item__text">
        <div class="user-item__name">Anika Tabassum</div>
        <div class="user-item__desc">Completed Task: Update of Project Remax</div>
        <div class="user-item__time">1 hours ago</div>
      </div>
    </div>
    <div class="user-item">
      <Avatar image="ava15.png" />
      <div class="user-item__text">
        <div class="user-item__name">Raiyan Khan</div>
        <div class="user-item__desc">QA Part Done: Update of Project Sonic</div>
        <div class="user-item__time">2 min ago</div>
      </div>
    </div>
    <div class="user-item">
      <Avatar image="ava16.png" />
      <div class="user-item__text">
        <div class="user-item__name">Salma Hayek</div>
        <div class="user-item__desc">Request for system Support: Update of Project Alfa</div>
        <div class="user-item__time">11 min ago</div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'

export default {
  components: {
    Avatar
  }
}
</script>

<style scoped>
.activities {
  padding: 30px 27px;
  background: var(--bg);
  box-shadow: var(--shadow);
  border-radius: 8px;
  letter-spacing: 1px;
}

.activities__title {
  margin-bottom: 25px;
  font-size: 14px;
  line-height: 17px;
}

.user-item {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
}

.user-item:last-of-type {
  margin-bottom: 0;
}

.user-item__text {
  margin-left: 8px;
}

.user-item__name {
  font-weight: 600;
  font-size: 13px;
  line-height: 15px;
  margin-bottom: 8px;
}

.user-item__desc {
  font-size: 11px;
  line-height: 16px;
  margin-bottom: 8px;
}

.user-item__time {
  font-size: 10px;
  line-height: 12px;
}
</style>
>
