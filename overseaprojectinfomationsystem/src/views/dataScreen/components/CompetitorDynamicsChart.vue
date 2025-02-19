<template>
  <!-- 年度使用 -->
  <div class="echarts">
    <ECharts :option="option" :resize="false" />
  </div>
</template>

<script setup lang="ts">
import ECharts from "@/components/ECharts/index.vue";
import { getMarketActiveData } from "@/api/modules/leader";
import { onMounted, ref } from "vue";

const option = ref<any>({
  // title: {
  //   text: "市场活跃度指数",
  //   textStyle: {
  //     color: "#ffffff",
  //   },
  //   left: "center",
  // },
  grid: {
    top: "15%",
    left: "5%",
    right: "0%",
    bottom: "5%",
    containLabel: true
  },
  color: ["#0E7CE2"],
  xAxis: {
    type: "category",
    data: [],
    axisTick: {
      //去掉x轴刻度
      show: false
    },
    axisLine: {
      lineStyle: {
        color: "#8595a8"
      }
    },
    axisLabel: {
      //x轴文字的配置
      show: true,
      interval: 0, //使x轴文字显示全
      fontSize: 18,
      fontFamily: 'Simsun'
    }
    // name: '月份'
  },
  yAxis: {
    type: "value",
    // name: "百万",
    // max: function (value: any) {
    //   return value.max + 0.5 * value.max
    // },
    //去除网格线
    splitLine: {
      show: true,
      lineStyle: {
        color: "#315070"
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#8595a8"
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: "#fff",
      align: "right",
      fontSize: 18,
      fontFamily: 'Simsun'
    },
    //最小刻度设置为1
    minInterval: 1
  },
  series: [
    {
      data: [],
      type: "line",
      barwidth: "60%",
      label: {
        normal: {
          show: true,
          color: "white",
          fontSize: 18,
          fontFamily: "Simsun"
        }
      }
    }
  ],
  tooltip: {
    trigger: "item",
    textStyle: {
      fontSize: 18,
      fontFamily: "Simsun"
    }
  }
});

async function getChartData() {
  const chartData = ref<any>((await getMarketActiveData()).result);
  const xData = chartData.value.Months;
  const yData = chartData.value.marketActive;
  option.value.xAxis.data = xData;
  option.value.series[0].data = yData;
}

onMounted(() => {
  getChartData();
});

</script>

<style lang="scss" scoped>
.echarts {
  // margin-bottom: 100px;
  width: 90%;
  height: 100%;
}
</style>
