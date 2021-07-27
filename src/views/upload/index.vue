<template>
  <!-- 
    Vue组件可能会有这样的需求：在某种情况下，需要重置Vue组件的data数据。
    此时，我们可以通过this.$data获取当前状态下的data，
    通过this.$options.data()获取该组件初始状态下的data。
    然后只要使用 Object.assign(this.$data, this.$options.data())
    就可以将当前状态的data重置为初始状态，非常方便！
    如果只想让一个数据恢复到以前: this.attr = this.$options.data().attr
  -->
  <div class="about">
    <!-- provide/inject -->
    <provide-test></provide-test>

    <!-- auto focus by custom directive -->
    <input
      type="text"
      placeholder="auto focus"
      v-focus
    />

    <!-- upload file by En language -->
    <!-- upload img common type: image/gif, image/jpg, image/jpeg, image/png -->
    <!-- compatible with some Android WeChat, the picture cannot be selected, 
         the 'accept' needs to be set to 'img/*' -->
    <!-- add attr 'capture' to enable rear camera and can't select img -->
    <!-- add attr 'capture="user"' to enable front camer and can't select img -->
    <!-- add attr multiple to be able to select more images -->
    <input
      type="file"
      accept="image/*"
      @change="uploadImg"
    />
  </div>
</template>

<script>
import ProvideTest from '@/components/ProvideTest'
export default {
  name: 'about',
  components: {
    ProvideTest
  },

  data () {
    return {
      sdata: null,
      val: '',
      obj: {
        val: ''
      }
    }
  },

  provide () {
    return {
      injectData: 'this is an injectData',
      injectVal: this.val,
      injectObj: this.obj
    }
  },

  created () {
    // provide/inject 本身不支持响应式
    // 如果注入的值本身是响应式的则可以响应
    // 如注入一个响应式对象 injectObj
    setTimeout(() => {
      this.val = 'this is val'
      this.obj.val = 'this is a val of Object obj'
    }, 3000)
  },

  mounted () {
    // Cannot read property 'name' of null"
    // console.log('this.sdata: ', this.sdata.name)
    
    // 可选链操作符 目前在 stage-4 阶段，babel 可用
    // 相当于 this.sdata && this.sdata.name
    console.log('this.sdata: ', this.sdata?.name)
  },

  methods: {
    // 断点续传核心是利用 Blob.prototype.slice 方法，和数组的 slice 方法相似
    // 调用的 slice 方法可以返回原文件的某个切片
    uploadImg (e) {
      let [file] = e.target.files
      if (!file) return

      console.log(file)
      console.log(file.slice(0, 10))
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        let res = fileReader.result
        console.log(res)
      }
    }
  }
}
</script>

<style lang="scss" scope>
  input {
    margin-top: 20px;
  }
</style>