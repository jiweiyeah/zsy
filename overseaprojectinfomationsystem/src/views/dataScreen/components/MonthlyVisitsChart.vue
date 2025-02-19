<template>
  <!-- 平台来源 -->
  <div class="echarts">
    <ECharts :option="option" :resize="false" />
  </div>
</template>

<script setup lang="ts">
import ECharts from "@/components/ECharts/index.vue";
import { onMounted, ref } from "vue";
import { getMonthVisits } from "@/api/modules/screen";
interface ChartProp {
  name: string;
  value: number;
  percentage: string;
}

const data = ref<any>([
  { name: "阿布扎比", percentage: "40.1%" },
  { name: "AI Yasat", percentage: "10.1%" },
  { name: "科威特", percentage: "20.1%" },
  { name: "巴基斯坦", percentage: "30.1%" },
  { name: "东南亚", percentage: "40.1%" },
  { name: "AMG", percentage: "20.1%" },
  { name: "PKKR", percentage: "30.1%" },
  { name: "ALM", percentage: "40.1%" },
  { name: "阿尔及利亚", percentage: "10.1%" },
  { name: "利比亚", percentage: "20.1%" },
  { name: "尼日尔", percentage: "30.1%" },
  { name: "乍得", percentage: "40.1%" },
  { name: "尼日利亚", percentage: "10.1%" },
  { name: "南美", percentage: "20.1%" }
]);

const option = ref<any>({
  grid: {
    top: "0%",
    left: "2%",
    right: "2%",
    bottom: "0%"
  },
  tooltip: {
    trigger: "item",
    formatter: "{b} :  {c}人",
    textStyle: {
      fontSize: 20,
      fontFamily: "Simsun"
    }
  },
  legend: {
    show: false,
    top: "bottom",
    left: "20px",
    icon: "circle",
    orient: "horizontal",
    align: "auto",
    itemWidth: 10,
    textStyle: {
      color: "#fff",
      fontSize: 20,
      fontFamily: "Simsun"
    },
    itemGap: 20,
    formatter: function (name: string) {
      let text = "";
      data.value.forEach((val: ChartProp) => {
        if (val.name === name) {
          text = name + " --- " + val.percentage;
        }
      });
      return text;
    },
    data: data.value.map((val: ChartProp) => val.name)
  },

  series: [
    {
      type: "pie",
      radius: ["40%", "60%"],
      center: ["50%", "50%"],
      color: ["#0E7CE2", "#FF8352", "#E271DE", "#F8456B", "#00FFFF", "#4AEAB0"],
      itemStyle: {
        borderColor: "#031845",
        borderWidth: 10
      },
      data: data,
      labelLine: {
        show: false,
        // lineStyle: {
        //   width: 4
        // }
        length: 20, //第一段线长
        length2: 10 //第二段线长
      },
      // labelLayout: {
      //   verticalAlign: "bottom",
      //   dy: 30,
      //   dx: -10,

      // },
      label: {
        show: true,
        padding: [30, -20, 30, -10],
        formatter: function (params: any) {
          if (params.percent >= 7) {
            //为0时不显示
            return params.name + "\n(" + params.percent.toFixed(1) + "%)";
          } else return "";
        },
        rich: {
          dark: {
            color: "#fff"
          },
          color: {
            color: "#309cfe"
          }
        },
        textStyle: {
          color: "#fff",
          fontSize: 20,
          fontFamily: "Simsun"
        },
        overflow: "none" //标签过长不省略
      }
    }
  ]
});

async function getChartData() {
  const chartData = ref<any>((await getMonthVisits()).result);
  for (let i = 0; i < chartData.value.length; i++) {
    data.value[i].value = chartData.value[i]
  }
}

onMounted(() => {
  getChartData();
});
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
