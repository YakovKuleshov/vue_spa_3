<template>
  <div class="estimation">
    <div class="estimation__title">Feature Effort Estimation</div>
    <div
      class="estimation__progress"
      :class="{ estimation__progress_active: animateClass }"
      :style="{ background: `conic-gradient(${colorsString})` }"
    >
      <div class="estimation__bg">{{ percentValue }}</div>
    </div>
    <div class="estimation-labels">
      <div
        v-for="item in list"
        class="estimation-labels__item"
        :class="{ 'estimation-labels__item_active': animateClass }"
        :key="item.id"
        @mouseenter="selectItem(item)"
        @mouseleave="clearAllColors"
        @animationend="addClassVisible"
      >
        <div class="estimation-labels__color" :style="{ backgroundColor: item.color }" />
        <div class="estimation-labels__name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentValue: '',
      animateClass: false,
      list: [
        {
          id: 1,
          name: 'Planning',
          percent: 40,
          color: '#155EB0'
        },
        {
          id: 2,
          name: 'Development',
          percent: 25,
          color: '#2E81DF'
        },
        {
          id: 3,
          name: 'Design',
          percent: 20,
          color: '#7195BD'
        },
        {
          id: 4,
          name: 'Testing',
          percent: 15,
          color: '#B3D2F5'
        }
      ],
      copyList: []
    }
  },
  methods: {
    selectItem(item) {
      item.color = 'tomato'
      this.percentValue = `${item.percent}%`
    },
    clearAllColors() {
      this.list = JSON.parse(JSON.stringify(this.copyList))
      this.percentValue = ''
    },
    animateElems() {
      let observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              this.animateClass = true
              observer.unobserve(en.target)
            }
          })
        },
        { threshold: 0.5 }
      )

      observer.observe(this.$el)
    },
    addClassVisible(e) {
      e.target.classList.add('estimation-labels__item_visible')
    }
  },
  computed: {
    colorsString() {
      let prevItemPercent = 0
      const arr = this.list.map((el, index, list) => {
        prevItemPercent += list[index - 1]?.percent || 0

        if (index === list.length - 1) return `${el.color} 0`
        return `${el.color} 0 ${el.percent + prevItemPercent}%`
      })
      return arr.join(',')
    }
  },
  created() {
    this.copyList = JSON.parse(JSON.stringify(this.list))
  },
  activated() {
    this.animateElems()
  },
  deactivated() {
    this.animateClass = false
  }
}
</script>

<style scoped>
.estimation {
  padding: 24px;
  box-shadow: var(--shadow);
  border-radius: 8px;
}

.estimation__title {
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.7px;
  margin-bottom: 25px;
}

.estimation__progress {
  position: relative;
  width: 164px;
  height: 164px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 1s;
  margin: 0 auto 24px;
  box-shadow: var(--shadow);
  transform: rotateZ(-720deg);
}

.estimation__progress_active {
  transform: rotateZ(0);
}

.estimation__bg {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
}

.estimation-labels {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 9px;
}

.estimation-labels__item {
  display: flex;
  align-items: center;
  opacity: 0;
}

.estimation-labels__item_visible {
  opacity: 1;
}

.estimation-labels__item_active {
  animation: bounceIn 0.5s;
}

.estimation-labels__item_active:nth-child(1) {
  animation-delay: 1s;
}

.estimation-labels__item_active:nth-child(2) {
  animation-delay: 1.3s;
}

.estimation-labels__item_active:nth-child(3) {
  animation-delay: 1.6s;
}

.estimation-labels__item_active:nth-child(4) {
  animation-delay: 1.9s;
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

.estimation-labels__color {
  width: 37px;
  height: 18px;
  border-radius: 20px;
  box-shadow: var(--shadow);
  margin-right: 5px;
  transition: background-color 0.3s;
}

.estimation-labels__name {
  font-size: 9px;
  line-height: 10px;
}
</style>
