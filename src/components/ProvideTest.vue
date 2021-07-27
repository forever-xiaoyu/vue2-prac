<template>
  <div class="hello">
    <h1>ProvideTest</h1>
    <p>{{injectObj && injectObj.val || ''}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  inject: {
    injectData: {
      default: null
    },
    injectVal: {
      default: undefined
    },
    injectObj: {
      default: {}
    }
  },
  // inject: [
  //   'injectData',
  //   'injectVal',
  //   'injectObj'
  // ],
  
  created () {
    console.log('injectData: ', this.injectData)
    console.log('injectVal: ', this.injectVal)
    console.log('injectObj: ', this.injectObj)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
