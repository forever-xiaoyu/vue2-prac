<template>
  <div class="keyfor-loop" ref="keyForLoop">
    <div v-for="(item, index) in list">
      <good-list></good-list>     
      <button @click="deleteInput(index)">删除</button>
    </div>
  </div>
</template>

<script>
import goodList from './components/goodList'

export default {
  components: {
    goodList
  },

  data () {
    return {
      list: ['1', '2', '3']
    }
  },

  methods: {
     changeData() {
      this.nowDate = Date.now();
      this.list = this.list2;
    },
    deleteInput(index) {
      this.list.splice(index, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>