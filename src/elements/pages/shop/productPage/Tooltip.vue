<template>
  <div class="tooltip">
    <svg class="arrow" width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.1 0.300001L8.1 8.3L8.5 8.83333L8.9 8.3L14.9 0.3L15.5 -0.5L14.5 -0.5L2.5 -0.499999L1.5 -0.499999L2.1 0.300001ZM2.1 0.300001L2.5 1.08778e-06V0L2.1 0.300001Z"
        fill="white"
        stroke="#E5E5E9"
      />
    </svg>
    <div class="tooltip__overlay">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  position: absolute;
  bottom: 33px;
  left: 50%;
  color: #7b7b85;
  font-size: 14px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s;
  transform: translateX(-50%);
  filter: drop-shadow(0px 6px 16px rgba(5, 2, 55, 0.1));
  background: #ffffff;
  border: 1px solid #e5e5e9;
  border-radius: 4px;
  letter-spacing: 0.5px;
  line-height: 18px;
}

.tooltip_active {
  visibility: visible;
  opacity: 1;
}

.tooltip__not__match__right {
  left: -60px;
  transform: translateX(0px);
}

.tooltip__not__match__right .arrow {
  left: 59px;
  transform: translateX(0px);
}

.tooltip__adaptive_left {
  left: 60px;
  transform: translateX(0px);
}

.tooltip__adaptive_left .arrow {
  left: 59px;
  transform: translateX(0px);
}

.tooltip__adaptive_right {
  left: auto;
  right: -35px;
  transform: translateX(0px);
}

.tooltip__adaptive_right .arrow {
  left: auto;
  right: 33px;
  transform: translateX(0px);
}

.fbs__tooltip__adaptive_right {
  left: auto;
  right: -102px;
  transform: translateX(0px);
}

.fbs__tooltip__adaptive_right .arrow {
  left: auto;
  right: 100px;
  transform: translateX(0px);
}

.arrow_right .arrow {
  left: auto;
  right: 33px;
  transform: translateX(0px);
}

.arrow__offset .arrow {
  left: auto;
  right: 70px;
  transform: translateX(0px);
}

.centered__text {
  text-align: center;
}

.no__wrapp {
  white-space: nowrap;
}

.tooltip__overlay {
  padding: 12px;
  background: #fff;
  border-radius: 4px;
  display: flex;
  user-select: none;
}

.arrow {
  position: absolute;
  bottom: -10px;
  left: 50%;
  z-index: -1;
  transform: translateX(-50%);
}

.tooltip__toright .arrow {
  left: 30px;
  transform: none;
}
</style>
