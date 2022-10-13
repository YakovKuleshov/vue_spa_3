<template>
  <div class="weather-popup" @click="$emit('close')">
    <div class="weather-popup__content" @click.stop>
      <div class="weather-popup__close" @click="$emit('close')"></div>
      <chart-view />
    </div>
  </div>
</template>

<script>
import ChartView from "@/elements/weather-now/ChartView";

export default {
  components: {
    ChartView
  },
  activated() {
    document.body.style.overflow = "hidden";
  },
  deactivated() {
    document.body.removeAttribute("style");
  }
};
</script>

<style scoped>
.weather-popup {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 10px;
  z-index: 5;
}

.weather-popup__content {
  position: relative;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1300px;
  max-height: 450px;
  padding: 15px;
  box-sizing: border-box;
  background: #6c879c;
  box-shadow: 30px 30px 70px rgb(0, 0, 0, 0.6);
  border-radius: 10px;
  overflow-y: auto;
}

.weather-popup__close {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 1;
  cursor: pointer;
}

.weather-popup__close:before {
  content: "";
  width: 100%;
  height: 2px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background: #333;
}

.weather-popup__close:after {
  content: "";
  width: 100%;
  height: 2px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  background: #333;
}
</style>
