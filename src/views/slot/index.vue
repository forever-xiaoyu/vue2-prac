<template>
  <div class="slot">
    <!-- slot test
      slot属性弃用，具名插槽通过指令参数v-slot:插槽名 的形式传入，可以简化为 #插槽名。
      slot-scope属性弃用，作用域插槽通过v-slot:xxx="slotProps"的slotProps来获取子组件传出的属性
      v-slot属性只能在<template>上使用，但在【只有默认插槽时】可以在组件标签上使用
    -->
    <slot-test>
      <template v-slot:top>
        <div>this is the top slot</div>
      </template>
      <template #mid>
        <div>this is the mid slot</div>
      </template>
      <template #bottom="slotProps">
        <div>this is the bottom slot => {{slotProps.msg}}</div>
      </template>
    </slot-test>
  </div>
</template>

<script>
import SlotTest from '@/components/SlotTest'
export default {
  name: 'slots',
  components: {
    SlotTest
  },

  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scope>
</style>