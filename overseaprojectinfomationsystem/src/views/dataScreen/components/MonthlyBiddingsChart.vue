<template>
  <!-- 热门板块 -->
  <!-- <div class="echarts-header">
    <span>排名</span>
    <span>景区</span>
    <span>预约数量</span>
  </div> -->
  <div class="echarts">
    <ECharts :option="option" :resize="false" />
  </div>
</template>

<script setup lang="ts">
import ECharts from "@/components/ECharts/index.vue";
import { onMounted, ref } from "vue";
import { getMonthBids } from "@/api/modules/screen";

interface ChartProp {
  name: string;
  value: number;
  percentage: string;
  maxValue: number;
}

const data = ref<any>([
  {
    name: "阿布扎比",
  },
  {
    name: "AI Yasat",
  },
  {
    name: "科威特",
  },
  {
    name: "巴基斯坦",
  },
  {
    name: "东南亚",
  },
  {
    name: "哈萨克AMG",
  },
  {
    name: "哈萨克PKKR",
  },
  {
    name: "阿拉木图ALM",
  },
  {
    name: "阿尔及利亚",
  },
  {
    name: "利比亚",
  },
  {
    name: "尼日尔",
  },
  {
    name: "乍得",
  },
  {
    name: "尼日利亚",
  },
  {
    name: "南美",
  }
]);

const colors = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];

const option = ref<any>({
  grid: {
    top: "2%",
    left: "-15%",
    right: "0%",
    bottom: "0%",
    containLabel: true
  },
  xAxis: {
    show: true,
    type: "value",
    axisLine: {
      show: true,
      lineStyle: {
        color: "white"
      }
    },
    nameGap: 1,
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    triggerEvent: false
  },
  yAxis: [
    {
      show: true,
      data: data.value.map((val: ChartProp) => val.name),
      inverse: true,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 120,
        color: "#fff",
        align: "left",
        fontSize: 20,
        fontFamily: 'Simsun'
      },
      triggerEvent: true
    },
    {
      show: false,
      inverse: true,
      data,
      axisLabel: {
        fontSize: 14,
        color: "#fff",
        margin: 20,
        formatter: (value: number) => {
          return value >= 10000 ? (value / 10000).toFixed(2) + "w" : value + "";
        }
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      triggerEvent: false
    }
  ],
  dataZoom: [
    {
      // 设置滚动条的隐藏或显示
      show: true,
      // 设置类型
      type: "slider",
      // 设置背景颜色
      backgroundColor: "rgb(255, 255, 255)",
      // 设置选中范围的填充颜色
      fillerColor: "rgb(16, 171, 198)",
      // 设置边框颜色
      borderColor: "rgb(19, 63, 100)",
      // 是否显示detail，即拖拽时候显示详细数值信息
      showDetail: false,
      // 数据窗口范围的起始数值
      startValue: 0,
      // 数据窗口范围的结束数值（一页显示多少条数据）
      endValue: 4,
      // 控制哪个轴，如果是number表示控制一个轴，
      // 如果是Array表示控制多个轴。此处控制第二根轴
      yAxisIndex: [0, 1],
      // empty：当前数据窗口外的数据，被设置为空。
      // 即不会影响其他轴的数据范围
      filterMode: "empty",
      // 滚动条高度
      width: 10,
      // 滚动条显示位置
      height: "100%",
      // 距离右边
      right: 0,
      // 控制手柄的尺寸
      handleSize: 0,
      // 是否锁定选择区域（或叫做数据窗口）的大小
      zoomLock: true,
      // 组件离容器上侧的距离
      // 如果top的值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐
      top: "middle",
      brushSelect: false
    },
    {
      // 没有下面这块的话，只能拖动滚动条，
      // 鼠标滚轮在区域内不能控制外部滚动条
      type: "inside",
      // 控制哪个轴，如果是number表示控制一个轴，
      // 如果是Array表示控制多个轴。此处控制第二根轴
      yAxisIndex: [0, 1],
      // 滚轮是否触发缩放
      zoomOnMouseWheel: false,
      // 鼠标移动能否触发平移
      moveOnMouseMove: true,
      // 鼠标滚轮能否触发平移
      moveOnMouseWheel: true
    }
  ],
  series: [
    {
      name: "条",
      type: "bar",
      yAxisIndex: 0,
      // data: data.value.map((val: ChartProp) => {
      //   return val.value;
      // }),
      data: data.value,
      barWidth: 15,
      itemStyle: {
        borderRadius: 30,
        color: function (params: any) {
          let num = colors.length;
          return colors[params.dataIndex % num];
        }
      },
      label: {
        show: true,
        position: [10, 0],
        lineHeight: 14,
        color: "#fff",
        fontSize: 18,
        fontFamily: 'Simsun',
        formatter: (params: any) => {
          return (params.data as ChartProp).value;
        }
      }
    },
    {
      name: "框",
      type: "bar",
      yAxisIndex: 1,
      // data: data.value.map((val: ChartProp) => {
      //   if (!val.maxValue) return 5;
      //   return val.maxValue;
      // }),
      data: [],
      barWidth: 20,
      itemStyle: {
        color: "none",
        borderColor: "#00c1de",
        borderWidth: 1,
        borderRadius: 15
      },
      silent: true
    }
  ]
});

async function getChartData() {
  const chartData = ref<any>((await getMonthBids()).result);
  for (let i = 0; i < chartData.value.length; i++) {
    data.value[i].value = chartData.value[i]
  }
  option.value.series[1].data = new Array(chartData.value.length).fill(Math.max(...JSON.parse(JSON.stringify(chartData.value))));
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
