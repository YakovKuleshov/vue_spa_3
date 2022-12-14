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
  margin: 0 auto;
  overflow: hidden;
}

.skeleton__img:after {
  content: '';
  position: absolute;
  top: 0;
  left: -100px;
  width: 30%;
  height: 100%;
  background: #fff;
  filter: blur(20px);
  transform: rotateZ(30deg);
  animation: animateBlick 0.5s infinite linear;
}

.skeleton__item {
  position: relative;
  height: 10%;
  border-radius: 5px;
  background: #e4e4e4;
  margin-top: 10px;
  overflow: hidden;
}

.skeleton__item:after {
  content: '';
  position: absolute;
  top: 50%;
  left: -100px;
  width: 20px;
  height: 50px;
  background: #ffffff;
  filter: blur(20px);
  transform: translateY(-50%) rotateZ(10deg);
  animation: animateBlick 0.5s infinite linear;
}

@keyframes animateBlick {
  100% {
    left: 110%;
  }
}
</style>
