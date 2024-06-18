<template>
  <div class="main">
    <luckyHeader :title="config.title" />
    <countDown />
    <Lottery :help-info="config.help" />
    <historyBar :record-title="config.recordTitle" />
    <historyList />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useLotteryStore } from "@/stores/lottery";
import { onMounted } from "vue";

import luckyHeader from "@/components/luckyHeader.vue";
import countDown from "@/components/countDown.vue";
import Lottery from "@/components/Lottery.vue";
import historyBar from "@/components/historyBar.vue";
import historyList from "@/components/historyList.vue";

const lotteryStore = useLotteryStore();
const { config } = storeToRefs(lotteryStore);

onMounted(() => {
  lotteryStore.fetchConfigAction();
});
</script>

<style lang="less" scoped></style>
