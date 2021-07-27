export default {
  data () {
    return {
      screenHeight: 0
    }
  },

  created () {
    this.getScreenHeight()
  },

  methods: {
    getScreenHeight () {
      this.screenHeight =
        window.innerHeight ||
        (window.screen && window.screen.height) ||
        667
    }
  }
}