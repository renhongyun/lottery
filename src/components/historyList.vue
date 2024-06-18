<template>
  <div class="table-container">
    <div v-for="(row, rowIndex) in tableData" :key="rowIndex" class="table-row">
      <div
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        :class="['table-cell', { 'gray-background': rowIndex % 2 === 1 }]"
      >
        <template v-if="cell">
          <span class="name">{{ cell.name }}</span>
          <img
            :src="getBallImageUrl(cell.number)"
            :alt="cell.number"
            class="ball-image"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useLotteryStore } from "@/stores/lottery";

const lotteryStore = useLotteryStore();
const { historyList } = storeToRefs(lotteryStore);

const fetchHistoryData = async () => {
  await lotteryStore.fetchHistoryAction();
};

fetchHistoryData();

const getBallImageUrl = (number) => {
  return new URL(`../assets/img/${number}.png`, import.meta.url).href;
};

const tableData = computed(() => {
  const reversedHistory = [...historyList.value].reverse();
  const rows = [];
  for (let i = 0; i < reversedHistory.length; i += 3) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      if (i + j < reversedHistory.length) {
        const history = reversedHistory[i + j];
        row.push({ name: history.name, number: history.number });
      } else {
        row.push(null);
      }
    }
    rows.push(row);
  }
  return rows;
});

watch(historyList, () => {
  tableData.value;
});
</script>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin: 0 auto;
}

.table-row {
  display: flex;
  width: 100%;
}

.table-cell {
  flex: 1;
  width: 33.33vw;
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.gray-background {
  background-color: #f0f0f0;
}

.ball-image {
  width: 20px;
  height: 20px;
  /* margin-right: 8px; */
}

.name {
  display: inline-block;
  width: 40px;
  text-align: right;
  padding-right: 5px;
}
</style>
