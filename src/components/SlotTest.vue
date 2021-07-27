<template>
  <div class="slot-test">
    <p>this is the slot test</p>
    <slot name="top"></slot>
    <slot name="mid"></slot>
    <slot name="bottom" :msg="msg"></slot>
  </div>
</template>

<script>
export default {
  name: 'SlotTest',
  
  data () {
    return {
      msg: 'slotProps is here'
    }
  }
}
</script>

<style scope lang="scss">
</style>