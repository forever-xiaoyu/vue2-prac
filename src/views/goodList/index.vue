<template>
  <div class="good-list" ref="goodList">
    <div class="list-wrapper">
      <div
        class="list-good"
        v-for="(good, goodIndex) in goodList"
        :key="goodIndex"
        @click="goToGoodPage"
      >
        <div class="good-left">
          <img :src="good.img" class="left-img" />
        </div>
        <div class="good-right">
          <div class="right-top">
            <span class="top-txt">{{good.name}}</span>
          </div>
          <div class="right-bottom">
            <span class="bottom-price">¥{{good.price}}</span>
          </div>
        </div>
      </div>
      <div class="list-loading">正在加载更多商品...</div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/request"
import getScreenHeight from "@/mixins/getScreenHeight"
import { throttle } from "@/utils/tool"

export default {
  mixins: [
    getScreenHeight
  ],

  data () {
    return {
      goodList: [],

      isLoading: false,
      isEnd: false,
    }
  },

  created () {
    this.getScrollEvent()
    this.getGoodList()
  },

  methods: {
    // 获取商品列表
    async getGoodList() {
      if (this.isLoading) return

      this.isLoading = true

      let res = await axios({ url: '/good/list' })
      let goodList = res.data || []
      
      if (Array.isArray(goodList)) {
        this.goodList.push(...goodList)
      } else {
        this.$toast('加载商品列表失败，请稍后再试')
        throw new Error(res.msg)
      }

      this.isLoading = false
    },

    // 跳转商详
    async goToGoodPage () {
      await this.$dialog.confirm({
        message: '确定去商详吗',
      })

      this.$toast('好的')
    },

    // 滚动处理函数
    getScrollEvent () {
      // 滚动节流
      this.scrollEvent = throttle(() => {
        let $goodList = this.$refs.goodList
        // 注意避免使用 getBoundingClientRect 的 x、y 值，在部分机型中不存在这两个属性
        let goodListRect = $goodList.getBoundingClientRect()

        // 分页加载
        if (Math.abs(goodListRect.bottom - this.screenHeight) < 50) {
          this.getGoodList()
        }
      }, 50)
      
      document.addEventListener('scroll', this.scrollEvent)
      this.$once('hook:beforeDestroy', () => document.removeEventListener('scroll', this.scrollEvent))
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>