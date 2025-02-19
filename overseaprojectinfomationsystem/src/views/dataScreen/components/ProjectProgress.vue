<template>
  <!-- 平台来源 -->

  <!-- <ECharts :option="option" :resize="false" /> -->
  <div ref="Chart1" style="height: 250px"></div>
</template>

<script setup lang="ts">
import echarts from "@/components/ECharts/config";
import { onMounted, ref } from "vue";

const Chart1 = ref<HTMLElement>();
const myChart1 = ref<any>();

async function getChart1Date() {
  const data = [
    {
      name: "A项目",
      legendName: "调研",
      value: 54
    },
    {
      name: "B项目",
      legendName: "审批",
      value: 44
    },
    {
      name: "C项目",
      legendName: "执行",
      value: 35
    },
    {
      name: "D项目",
      legendName: "确定",
      value: 30
    },
    {
      name: "F项目",
      legendName: "验收",
      value: 30
    }
  ];

  const titleArr: any = [];
  const seriesArr: any = [];
  const colors = [
    ["#389af4", "#dfeaff"],
    ["#ff8c37", "#ffdcc3"],
    ["#ffc257", "#ffedcc"],
    ["#fd6f97", "#fed4e0"],
    ["#a181fc", "#e3d9fe"],
    ["#389af4", "#dfeaff"],
    ["#ff8c37", "#ffdcc3"],
    ["#ffc257", "#ffedcc"],
    ["#fd6f97", "#fed4e0"],
    ["#a181fc", "#e3d9fe"]
  ];
  data.forEach(function (item, index) {
    titleArr.push({
      text: item.name,
      x: index * 22 + 15 + "%",
      y: "75%",
      // top: '65%',
      textAlign: "center",
      textStyle: {
        fontWeight: "normal",
        fontSize: 20,
        color: colors[index][0],
        textAlign: "center",
        fontFamily: "Simsun"
      }
    });
    seriesArr.push({
      name: item.legendName,
      type: "pie",
      clockWise: false,
      radius: [35, 45],
      itemStyle: {
        normal: {
          color: colors[index][0],
          shadowColor: colors[index][0],
          shadowBlur: 0,
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      hoverAnimation: false,
      center: [index * 22 + 16 + "%", "55%"],
      data: [
        {
          value: item.value,
          label: {
            normal: {
              formatter: function (params: { value: string }) {
                return params.value + "%";
              },
              position: "center",
              show: true,
              textStyle: {
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Simsun",
                color: colors[index][0]
              }
            }
          }
        },
        {
          value: 100 - item.value,
          name: "invisible",
          itemStyle: {
            normal: {
              color: colors[index][1]
            },
            emphasis: {
              color: colors[index][1]
            }
          }
        }
      ]
    });
    if (index == data.length - 1) {
      seriesArr[index].data = [];
      seriesArr[index].radius = [];
      titleArr[index].text = "";
    }
  });

  const option = {
    // backgroundColor: "#fff",
    title: titleArr,
    legend: {
      show: true,
      top: 30,
      left: 40,
      orient: "horizontal",
      align: "auto",
      itemWidth: 10,
      textStyle: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "Simsun"
      },
      itemGap: 20,
      data: ["调研", "审批", "执行", "确定", "验收"]
    },
    series: seriesArr
  };

  myChart1.value = echarts.init(Chart1.value!); // 重点
  myChart1.value.setOption(option);
}
onMounted(() => {
  getChart1Date();
});
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
