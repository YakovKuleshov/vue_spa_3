export default {
  data() {
    return {
      touchPosition: 0
    }
  },
  methods: {
    startScroll(e) {
      const valid = e.composedPath().some((el) => {
        if (el.classList) return el.classList.contains('list__wrapper')
      })
      const valid2 = e.composedPath().some((el) => {
        if (el.classList) return el.classList.contains('list__header')
      })

      if (valid && !valid2) {
        const scrollLength = this.$refs.scrollingContainer?.scrollWidth - this.$refs.scrollingContainer?.offsetWidth
        const ratio = scrollLength / this.$refs.mainContainer?.offsetWidth
        const startCoordinates = e.clientX - this.$refs.mainContainer?.getBoundingClientRect().left

        this.touchPosition = (scrollLength - startCoordinates * ratio) / ratio - this.$refs.scrollingContainer?.scrollLeft

        window.addEventListener('mousemove', this.moveMouse)
        window.addEventListener('mouseup', this.removeMouseMove)
      }
    },
    moveMouse(e) {
      const scrollLength = this.$refs.scrollingContainer?.scrollWidth - this.$refs.scrollingContainer?.offsetWidth
      const ratio = scrollLength / this.$refs.mainContainer?.offsetWidth
      const startCoordinates = e.clientX - this.$refs.mainContainer?.getBoundingClientRect().left

      if (this.$refs.scrollingContainer) {
        this.$refs.scrollingContainer.scrollLeft = (scrollLength - startCoordinates * ratio) / ratio - this.touchPosition
      }
    },
    removeMouseMove() {
      window.removeEventListener('mousemove', this.moveMouse)
    }
  },
  mounted() {
    window.addEventListener('mousedown', this.startScroll)
  },
  beforeDestroy() {
    window.removeEventListener('mousedown', this.startScroll)
    window.removeEventListener('mouseup', this.removeMouseMove)
  },
  activated() {
    window.addEventListener('mousedown', this.startScroll)
  },
  deactivated() {
    window.removeEventListener('mousedown', this.startScroll)
    window.removeEventListener('mouseup', this.removeMouseMove)
  }
}
