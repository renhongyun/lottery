<template>
  <div class="luncky-header">
    {{ title }}
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: "tltle",
  },
});
</script>

<style lang="less" scoped>
.luncky-header {
  height: 5vh;
  width: 100vw;
  background-color: #444653;
  color: #fff;
  text-align: center;
  line-height: 5vh;
}
</style>
