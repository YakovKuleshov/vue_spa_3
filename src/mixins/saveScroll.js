export default {
  activated() {
    const scroll = localStorage.getItem(
      `${this.$route.path.replace('/', '')}_scroll`
    )

    if (scroll) {
      window.scrollTo({ top: +scroll })
      // setTimeout(() => {
      //   window.scrollTo({ top: +scroll })
      // })
    }
  }
  // НЕ РАБОТАЕТ В VUE 3
  // beforeRouteLeave(to, { name }, next) {
  //   console.log(name)
  //   localStorage.setItem(`${name}_scroll`, window.scrollY)
  //   next()
  // }
}
