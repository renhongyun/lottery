<template>
  <div class="lottery-container">
    <div
      v-for="(ball, index) in balls"
      :key="index"
      :class="['ball', { center: index === 11 }]"
      :style="getStyle(index)"
    >
      <img :src="`/${ball}.png`" :alt="`Ball ${ball}`" />
    </div>

    <div class="help" @click="showHelpInfo">
      <img src="@/assets/img/help.png" />
    </div>

    <div v-if="isHelpVisible" class="help-modal">
      <div class="help-modal-content">
        <span class="close-btn" @click="isHelpVisible = false">&times;</span>
        <p>{{ helpInfo }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useLotteryStore } from "@/stores/lottery";

defineProps({
  helpInfo: {
    type: String,
    default: "帮助信息",
  },
});

const lotteryStore = useLotteryStore();
const { latestLottery } = storeToRefs(lotteryStore);

const balls = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
const startAngle = ref(270);
const isHelpVisible = ref(false);

const getStyle = (index) => {
  const totalBalls = balls.value.length;
  const centerIndex = 11;
  const relativeIndex = (index - centerIndex + totalBalls) % totalBalls;

  const angle = (360 / totalBalls) * relativeIndex + startAngle.value;
  const radians = (angle * Math.PI) / 180;
  const x = 140 * Math.cos(radians);
  const y = -50 * Math.sin(radians);
  const scale = 1 + 0.28 * (1 - Math.sin(radians));

  return {
    transform: `translate(${x}px, ${y}px) scale(${scale})`,
    zIndex: Math.round(100 * scale),
  };
};

const showHelpInfo = () => {
  isHelpVisible.value = true;
};

watch(
  latestLottery,
  (newVal) => {
    const index = balls.value.indexOf(newVal.number);
    if (index !== -1) {
      const temp = balls.value[11];
      balls.value[11] = balls.value[index];
      balls.value[index] = temp;
    }
  },
  { immediate: true }
);

onMounted(() => {
  lotteryStore.fetchLatestLottery();
});
</script>

<style lang="less" scoped>
.lottery-container {
  position: relative;
  width: 100vw;
  height: 27vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #2a2b2f;

  .help {
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;

    img {
      width: 25px;
      height: 25px;
    }
  }
}

.ball {
  position: absolute;
  transition: transform 0.5s ease, z-index 0.5s ease;
}

.ball img {
  width: 50px;
  height: 50px;
}

.ball.center img {
  width: 57px;
  height: 57px;
}

.help-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.help-modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  width: 280px;
  top: -20%;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>
