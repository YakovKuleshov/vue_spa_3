<template>
  <div class="skeleton">
    <div class="skeleton__wrap">
      <div class="skeleton__img"></div>
    </div>
    <div class="skeleton__item"></div>
    <div class="skeleton__item"></div>
    <div class="skeleton__item"></div>
  </div>
</template>

<style scoped>
.skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 20px;
}

.skeleton__wrap {
  position: relative;
  width: 30%;
  padding-top: 30%;
  margin: 0 auto;
}

.skeleton__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #e4e4e4;
}

.skeleton__item {
  position: relative;
  height: 10%;
  border-radius: 5px;
  background: #e4e4e4;
  margin-top: 10px;
  overflow: hidden;
}
</style>
