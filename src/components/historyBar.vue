<template>
  <div class="history-bar">
    {{ recordTitle }}
  </div>
</template>
<script setup>
defineProps({
  recordTitle: {
    type: String,
    default: "tltle",
  },
});
</script>
<style lang="less" scoped>
.history-bar {
  height: 4vh;
  line-height: 4vh;
  background-color: #424652;
  color: #fff;
  font-size: 12px;
}
</style>
