<template>
  <div class="qr-modal" @click="closePopup">
    <div
      class="qr-modal__content"
      :class="{ 'qr-modal__content_bunceIn': bunceIn, 'qr-modal__content_bunceout': bunceout, hidden: unmounted }"
    >
      <div class="qr-modal__padding">
        <img class="qr-modal__img" src="@/assets/img/qr.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bunceIn: false,
      bunceout: false,
      unmounted: false,
      flag: false
    }
  },
  methods: {
    closePopup() {
      if (!this.flag) return
      this.bunceIn = false
      this.bunceout = true
      setTimeout(() => {
        this.unmounted = true
        setTimeout(() => {
          this.$emit('close')
        })
      }, 400)
    }
  },
  created() {
    this.bunceIn = true
    setTimeout(() => {
      this.flag = true
    }, 500)
  },
  mounted() {
    document.body.style.overflow = 'hidden'
  },
  beforeUnmount() {
    document.body.removeAttribute('style')
  }
}
</script>

<style scoped>
.qr-modal {
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

.qr-modal__content {
  background: #fff;
  box-shadow: 30px 30px 70px rgb(0, 0, 0, 0.6);
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  will-change: transform;
  transition: 0.1s;
}

.qr-modal__content_bunceIn {
  animation: bounceIn 0.5s;
}

.qr-modal__content_bunceout {
  animation: bounceOut 0.5s;
}

.qr-modal .hidden {
  transform: scale3d(0, 0, 0);
}

.qr-modal__padding {
  position: relative;
  padding-top: 100%;
}

.qr-modal__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
}

@keyframes bounceIn {
  0%,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    opacity: 1;
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
}

@keyframes bounceOut {
  20% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  50%,
  55% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
}
</style>
