<template>
  <div class="keyfor-loop" ref="keyForLoop">
    <div @click="changeData">切换数据</div>
    <!-- :key="item.id" -->
    <!--
      has key 1557ms
      not key 662ms
      -->
    <li v-for="item in list">{{ item.text }}</li>     
  </div>
</template>

<script>

export default {
  data () {
    return {
      list: [],
      list1: [],
      list2: [],
      nowDate: '',
      updateDate: '',
    }
  },

  created () {
    for (let i = 0; i <= 100000; i++) {
      this.list1.push({
        id: i,
        text: i
      })
      this.list2.push({
        id: i * 2,
        text: 100000 - i
      })
    }
    this.list = this.list1
  },

  updated () {
    const date = Date.now();
    console.log(`updateTime: ${date - this.nowDate}`);
  },

  methods: {
    changeData () {
      this.nowDate = Date.now();
      this.list = this.list2;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>