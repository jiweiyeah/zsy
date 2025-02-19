<template>
  <div class="card table-main">
    <div ref="Chart1" class="leaderChart" v-show="selVal == 1"></div>
    <div ref="Chart2" class="leaderChart" v-show="selVal == 2"></div>
    <div ref="Chart3" class="leaderChart" v-show="selVal == 3"></div>
    <div ref="Chart4" class="leaderChart" v-show="selVal == 4"></div>
    <select v-model="selVal" size="large"
      style="position: absolute; right: 2%; width: auto; height: auto; font-size: 25px">
      <option style="font-size: 25px" v-for="item in instanceSelectArray" :key="item.key" :label="item.name"
        :value="item.key" />
    </select>
  </div>
  <!-- <div class="card content-box">
    <div ref="Chart1" style="width: 50%; height: 50%; float: left;"></div>
    <div ref="Chart2" style="width: 50%; height: 50%; float: left;"></div>
    <div ref="Chart3" style="width: 50%; height: 50%; float: left;"></div>
    <div ref="Chart2" class="quarter-div"></div>
    <div ref="Chart3" class="quarter-div"></div>
    <div ref="Chart4" class="quarter-div"></div>
  </div> -->
</template>

<script setup lang="ts" name="lineChart">
import echarts from "@/components/ECharts/config";
import { markRaw, onMounted, ref } from "vue";
import {
  getTotalBidNumData,
  getTotalBidMoneyData,
  getNewSignMoneyData,
  getPotMoneyData
} from "@/api/modules/leader";

const Chart1 = ref();
const myChart1 = ref();
const Chart2 = ref();
const myChart2 = ref();
const Chart3 = ref();
const myChart3 = ref();
const Chart4 = ref();
const myChart4 = ref();

const centerName = ["阿布扎比\n中心", "Al Yasat\n技术支持\n中心", "科威特\n中心", "巴基斯坦\n中心", "东南亚\n中心", "哈萨克\nAMG", "哈萨克\nPKKP", "哈萨克\n阿拉木图\nALM中心", "阿尔及利亚\n中心", "利比亚\n中心", "尼比亚\n中心", "乍得\n中心", "尼日利亚\n中心", "南美\n中心"]

const selVal = ref(1);

const instanceSelectArray = [
  {
    key: 1,
    name: "近六个月新签市场金额"
  },
  {
    key: 2,
    name: "近六个月总标的额同期对比"
  },
  {
    key: 3,
    name: "近六个月评标个数和中标个数"
  },
  {
    key: 4,
    name: "潜在项目金额汇总"
  }
];

async function getChart1Data() {
  const chartData = ref<any>((await getNewSignMoneyData()).result);
  //console.log("monthData", monthData)
  const xData = ref<any>([]);
  const yData = ref<any>([]);
  for (let i = 0; i < chartData.value.Months.length; i++) {
    xData.value.push(chartData.value.Months[i]);
    yData.value.push(chartData.value.newSignMoney[i]);
  }
  let optionChart1 = {
    title: {
      text: "新签市场金额",
      textStyle: {
        color: "#000000",
        fontSize: 28
      },
      left: "center"
    },
    color: ["#304156"],
    xAxis: {
      type: "category",
      data: xData.value,
      axisTick: {
        //去掉x轴刻度
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "#8595a8"
        },
        show: true
      },
      name: "月份",
      axisLabel: {
        textStyle: {
          fontSize: "22"
        },
        interval: 0,
      },
      nameTextStyle: {
        fontSize: 22
      }
    },
    yAxis: {
      type: "value",
      name: "单位（万美元）",
      //去除网格线
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        lineStyle: {
          color: "#8595a8"
        },
        show: true
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          fontSize: "22"
        }
      },
      nameTextStyle: {
        fontSize: 22
      },
      //最小刻度设置为1
      minInterval: 1
    },
    series: [
      {
        data: yData.value,
        type: "line",
        symbol: "roundRect",
        symbolSize: 15,
        itemStyle: {
          color: "#14517C",
        },
        lineStyle: {
          color: "#5986c1"
        },
        label: {
          show: true,
          textStyle: {
            //数值样式
            //color: 'black',
            fontSize: 22
          }
        }
      }
    ],
    tooltip: {
      trigger: "item"
    }
  };
  myChart1.value = echarts.init(Chart1.value); // 重点
  myChart1.value.setOption(optionChart1);
}

async function getChart2Data() {
  // .... // 这里调用接口,获取后台数据,来更改option里面对应的值
  const chartData = ref<any>((await getTotalBidMoneyData()).result);
  const xData = ref<any>([]);
  const yData = ref<any>([]);
  for (let i = 0; i < chartData.value.Months.length; i++) {
    xData.value.push(chartData.value.Months[i]);
    yData.value.push(chartData.value.totalMoney[i]);
  }
  // console.log("chartDataDemo", chartDataDemo)
  // 在这之前要获取option里面,要用到的数据
  let optionChart2 = {
    title: {
      text: "总标的额同期对比",
      textStyle: {
        color: "#000000",
        fontSize: 28
      },
      left: "center"
    },
    color: ["#304156"],
    xAxis: {
      type: "category",
      data: xData.value,
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
        textStyle: {
          fontSize: "22"
        },
        interval: 0,
      },
      nameTextStyle: {
        fontSize: 22
      },
      name: "月份"
    },
    yAxis: {
      type: "value",
      name: "单位（万美元）",
      //去除网格线
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        lineStyle: {
          color: "#8595a8"
        },
        show: true
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          fontSize: "22"
        }
      },
      nameTextStyle: {
        fontSize: 22
      },
      //最小刻度设置为1
      minInterval: 1
    },
    series: [
      {
        data: yData.value,
        type: "bar",
        barwidth: 60,
        barMaxWidth: 60, // 最大宽度
        color: "#5986c1",
        label: {
          show: true,
          position: "top", //在上方显示
          textStyle: {
            //数值样式
            color: "gray",
            fontSize: 22
          }
        }

      }
    ],
    tooltip: {
      trigger: "item"
    }
  };
  myChart2.value = echarts.init(Chart2.value); // 重点
  myChart2.value.setOption(optionChart2);
}

async function getChart3Data() {
  // .... // 这里调用接口,获取后台数据,来更改option里面对应的值
  const chartData = ref<any>((await getTotalBidNumData()).result);
  const xData = ref<any>([]);
  const judgeBidNum = ref<any>([]);
  const successBidNum = ref<any>([]);
  for (let i = 0; i < chartData.value.Months.length; i++) {
    xData.value.push(chartData.value.Months[i]);
    judgeBidNum.value.push(chartData.value.totalNum.judgeBidNum[i]);
    successBidNum.value.push(chartData.value.totalNum.successBidNum[i]);
  }
  // 在这之前要获取option里面,要用到的数据
  let optionChart3 = {
    title: {
      text: "评标个数和中标个数",
      textStyle: {
        color: "#000000",
        fontSize: 28
      },
      left: "center"
    },
    legend: {
      show: true, //是否显示
      // icon: "circle",//图例样式
      orient: "horizontal",
      right: "6%",
      top: "4%",
      data: ["评标个数", "中标个数"],
      textStyle: {
        fontSize: 18
      }
    },
    color: ["#304156"],
    xAxis: {
      type: "category",
      data: xData.value,
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
        textStyle: {
          fontSize: "22"
        },
        interval: 0,
      },
      nameTextStyle: {
        fontSize: 22
      },
      name: "月份"
    },
    yAxis: {
      type: "value",
      name: "单位（个）",
      //去除网格线
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        lineStyle: {
          color: "#8595a8"
        },
        show: true
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          fontSize: "22"
        }
      },
      nameTextStyle: {
        fontSize: 22
      },
      //最小刻度设置为1
      minInterval: 1
    },
    series: [
      {
        name: "评标个数",
        data: judgeBidNum.value,
        type: "bar",
        barwidth: 50,
        barMaxWidth: 50, // 最大宽度
        color: "#5986c1",
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "gray",
                fontSize: 22
              }
            }
          }
        }
      },
      {
        name: "中标个数",
        data: successBidNum.value,
        type: "bar",
        barwidth: 50,
        barMaxWidth: 50, // 最大宽度
        color: "#97d8e8",
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "gray",
                fontSize: 22
              }
            }
          }
        }
      }
    ],
    tooltip: {
      trigger: "item"
    }
  };
  myChart3.value = echarts.init(Chart3.value); // 重点
  myChart3.value.setOption(optionChart3);
}

async function getChart4Data() {
  const chartData = ref<any>((await getPotMoneyData()).result);
  const yData = ref<any>([]);
  const xData = ref<any>([]);
  xData.value = chartData.value.potMoney
  yData.value = chartData.value.centerList
  // 在这之前要获取option里面,要用到的数据
  let optionChart4 = {
    grid: {
      left: '5%',
      right: '15%',
      bottom: '3%',
      containLabel: true
    },
    title: {
      text: "潜在项目金额汇总",
      textStyle: {
        color: "#000000",
        fontSize: 28
      },
      left: "center"
    },
    legend: {
      show: false, //是否显示
      // icon: "circle",//图例样式
      orient: "horizontal",
      right: "6%",
      top: "4%",
      data: ["评标个数", "中标个数"],
      textStyle: {
        fontSize: 18
      }
    },
    xAxis: {
      type: "value",
      name: "单位（万美元）",
      axisTick: {
        //去掉x轴刻度
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#8595a8",
        }
      },
      axisLabel: {
        textStyle: {
          fontSize: "22"
        },
        interval: 0,
      },
      nameTextStyle: {
        fontSize: 22
      },
    },
    yAxis: {
      type: "category",
      data: centerName,
      // name: "年份",
      //去除网格线
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "#8595a8"
        },
        show: true
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          fontSize: "22"
        }
      },
      nameTextStyle: {
        fontSize: 22
      },
      //最小刻度设置为1
      minInterval: 1
    },
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
        width: 15,
        // 滚动条显示位置
        height: "80%",
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
        name: "评标个数",
        data: xData.value,
        type: "bar",
        barwidth: 50,
        barMaxWidth: 50, // 最大宽度
        color: "#5986c1",
        label: {
          show: true,
          position: "right", //在上方显示
          textStyle: {
            //数值样式
            color: "gray",
            fontSize: 22
          }
        }
      }
    ],
    tooltip: {
      trigger: "item"
    }
  }
  myChart4.value = markRaw(echarts.init(Chart4.value!)); // 重点
  myChart4.value.setOption(optionChart4);
}

onMounted(() => {
  getChart1Data();
  getChart2Data();
  getChart3Data();
  getChart4Data();
});
</script>

<style scoped lang="scss">
.leaderChart {
  /* width: 90%;
  height: 100%; */
  width: 1400px;
  height: 750px;
}
</style>
