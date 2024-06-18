<template>
  <div class="count-down">
    <span class="countdown"
      >距离{{ lastTaskName }}开奖剩余时间还有{{ hours }}时{{ minutes }}分{{
        seconds
      }}秒</span
    >
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLotteryStore } from "@/stores/lottery";

const lotteryStore = useLotteryStore();
const { taskList } = storeToRefs(lotteryStore);
lotteryStore.fetchLatestLotteryTime();

const hours = ref("00");
const minutes = ref("00");
const seconds = ref("00");

let intervalId;

const lastTaskName = computed(() => {
  if (taskList.value.length === 0) return "";
  return taskList.value[taskList.value.length - 1].name;
});

const updateCountdown = () => {
  if (taskList.value.length === 0) return;
  const lastTask = taskList.value[taskList.value.length - 1];
  const endTime = new Date(lastTask.startTime);

  const startTime = new Date();
  const remainingTime = endTime - startTime;

  if (remainingTime <= 0) {
    clearInterval(intervalId);
    hours.value = "00";
    minutes.value = "00";
    seconds.value = "00";
  } else {
    hours.value = String(Math.floor(remainingTime / 3600000)).padStart(2, "0");
    minutes.value = String(
      Math.floor((remainingTime % 3600000) / 60000)
    ).padStart(2, "0");
    seconds.value = String(Math.floor((remainingTime % 60000) / 1000)).padStart(
      2,
      "0"
    );
  }
};

onMounted(() => {
  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style lang="less" scoped>
.count-down {
  background-color: #424652;
  color: #fff;
  font-weight: 300;
  font-size: 11px;
  height: 3.5vh;
  line-height: 3.5vh;
}
</style>
