import { defineStore } from "pinia";
import {
  getLatestLottery,
  getLotteryHistory,
  getTaskList,
  getConfigInfo,
} from "@/service";
import { ref } from "vue";
export const useLotteryStore = defineStore("lottery", () => {
  const historyList = ref([]);

  const fetchHistoryAction = async () => {
    const res = await getLotteryHistory();
    historyList.value = res.data;
    console.log("历史记录", historyList.value);
  };

  const latestLottery = ref({});
  const fetchLatestLottery = async () => {
    const res = await getLatestLottery();
    latestLottery.value = res.data;
    console.log(latestLottery.value);
  };

  const taskList = ref([]);
  const fetchLatestLotteryTime = async () => {
    const res = await getTaskList();
    taskList.value = res.data;
    console.log("任务列表", taskList.value);
  };

  const config = ref({});
  const fetchConfigAction = async () => {
    const res = await getConfigInfo();
    config.value = res.data;
    console.log(config.value);
  };

  return {
    latestLottery,
    historyList,
    fetchHistoryAction,
    fetchLatestLottery,
    taskList,
    fetchLatestLotteryTime,
    config,
    fetchConfigAction,
  };
});
