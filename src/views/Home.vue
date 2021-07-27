<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from '@/api/request'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },

  created () {
    this.getTestData()
  },

  methods: {
    async getTestData () {
      console.dir(axios)
      let res = await axios.request({
        url: 'test'
      })
      console.log(res)
    }
  }
}
</script>
