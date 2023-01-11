<template>
  <div class="preloader">
    <svg>
      <defs>
        <filter id="dropshadow" x="-40%" y="-40%" width="180%" height="180%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <!-- stdDeviation is how much to blur -->
          <feOffset dx="5" dy="5" result="offsetblur" />
          <feOffset dx="-5" dy="-5" result="offsetblur" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle class="c1" cx="50%" cy="50%" r="20" style="filter: url(#dropshadow)" />
    </svg>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preloader svg {
  width: 69%;
  height: 69%;
  animation: rotatePreloader 0.5s linear infinite;
}

.c1 {
  stroke: #44c3ff;
  stroke-dasharray: 138%;
  fill: none;
  stroke-width: 5px;
  stroke-linecap: round;
}

@keyframes rotatePreloader {
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
