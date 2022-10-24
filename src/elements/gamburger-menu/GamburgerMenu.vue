<template>
  <div class="gamburger-menu">
    <div class="gamburger-menu__item"></div>
  </div>
</template>

<style scoped>
.gamburger-menu {
  position: relative;
  cursor: pointer;
  width: 35px;
  height: 35px;
  border-radius: 5px;
}

.gamburger-menu__item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 2px;
  border-radius: 2px;
  background: #fff;
}

.gamburger-menu__item:before {
  content: '';
  position: absolute;
  top: -7px;
  left: 0;
  width: 100%;
  height: inherit;
  background: inherit;
  border-radius: inherit;
}

.gamburger-menu__item:after {
  content: '';
  position: absolute;
  bottom: -7px;
  left: 0;
  width: 100%;
  height: inherit;
  background: inherit;
  border-radius: inherit;
}
</style>
