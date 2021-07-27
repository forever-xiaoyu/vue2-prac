<template>
  <div class="good-list" ref="goodList">
    <input v-model="input" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: 0,
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>