export default {
  methods: {
    /**
     * @desc 添加购物车通用动画
     * @param {*} startEl 起始目标元素 必传参数
     * @param {*} endEl 终点目标元素 可选
     * @param {*} delay 动画延迟时间 可选
     */
    addCartAnimation (startEl, endEl, delay = 400) {
      if (!startEl) return

      startEl = startEl.target ? startEl.target : startEl
      endEl = endEl && (endEl.target ? endEl.target : endEl)

      let $cartAniEl = document.createElement('div')
      let startElPos = startEl.getBoundingClientRect()
      let endElPos = endEl && endEl.getBoundingClientRect()

      $cartAniEl.style = `left:${startElPos.left + 7}px;top:${startElPos.top + 7}px;width: .12rem;height: .12rem;display: block;background: red;border-radius: 50%;position: fixed;-webkit-transition: left .4s linear,top .4s cubic-bezier(.58,-.42,1,.65);transition: left .4s linear,top .4s cubic-bezier(.58,-.42,1,.65);z-index: 999999;`
      document.body.appendChild($cartAniEl)

      setTimeout(function () {
        $cartAniEl.style.top = `${(endEl && (endElPos.top + endEl.offsetHeight / 2)) || (window.innerHeight - 45)}px`
        $cartAniEl.style.left = `${(endEl && (endElPos.left + endEl.offsetWidth / 2)) || 35}px`
        setTimeout(function () {
          document.body.removeChild($cartAniEl)
        }, delay)
      }, 0)
    }
  }
}