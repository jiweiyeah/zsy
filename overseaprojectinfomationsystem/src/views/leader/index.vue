<template>
  <div class="card table-main" v-show="selVal != 6">
    <div ref="Chart1" class="leaderChart" v-show="selVal == 1"></div>
    <div ref="Chart2" class="leaderChart" v-show="selVal == 2"></div>
    <div ref="Chart3" class="leaderChart" v-show="selVal == 3"></div>
    <div ref="Chart4" class="leaderChart" v-show="selVal == 4"></div>
    <div ref="Chart5" class="leaderChart" v-show="selVal == 5"></div>
    <!-- <div ref="Chart6" class="leaderChart" v-show="selVal == 6"></div> -->
    <el-select v-model="selVal" size="large"
      style="position: absolute; right: 2%; width: auto; height: auto; font-size: 25px">
      <el-option style="font-size: 25px" v-for="item in instanceSelectArray" :key="item.key" :label="item.name"
        :value="item.key" />
    </el-select>
    <el-input v-show="selVal == 1 || selVal == 4" v-model="startDate" type="Date"
      style="position: absolute; top: 20%; right: 2%; width: auto; height: auto; font-size: 25px">
    </el-input>
    <el-input v-show="selVal == 1 || selVal == 4" v-model="endDate" type="Date"
      style="position: absolute; top: 25%; right: 2%; width: auto; height: auto; font-size: 25px">
    </el-input>
    <el-button type="primary" style="position: absolute; top: 30%; right: 4.5%; width: auto; height: auto"
      @click="handleSelect()" v-show="selVal == 1 || selVal == 4"><span style="font-size: 20px">查 询</span></el-button>
    <el-button type="primary" style="position: absolute; right: 4%; bottom: 10%; width: auto; height: auto"
      @click="$router.push(DATASCREEN_URL)">
      <span style="font-size: 20px">返 回</span></el-button>
  </div>
  <div class="table-box" v-show="selVal == 6">
    <ProTable ref="leadVisits" :columns="columns" :request-api="getTableList" :init-param="initParam"
      :data-callback="dataCallback">
      <template #operation="scope">
        <el-button type="primary" link @click="openDialog('查看', scope.row)"><span
            style="font-size: 20px">详情</span></el-button>
      </template>
    </ProTable>
    <el-select v-model="selVal" size="large"
      style="position: absolute; top: 13%; right: 10%; width: auto; height: auto; font-size: 25px">
      <el-option style="font-size: 25px" v-for="item in instanceSelectArray" :key="item.key" :label="item.name"
        :value="item.key" />
    </el-select>
    <leadVisitsDialog ref="dialogRef" />
    <el-button type="primary" style="position: absolute; right: 44%; bottom: 6%; width: auto; height: auto"
      @click="$router.push(DATASCREEN_URL)">
      <span style="font-size: 20px">返 回</span></el-button>
  </div>
</template>

<script setup lang="tsx">
import { markRaw, onMounted, ref, reactive } from "vue";
import * as echarts from "echarts";
import { screenInfoStore } from "@/stores/modules/screenInfo";
import {
  getnewSignChartData,
  getWinRatesData,
  getMarketNumData,
  getProgressChartData,
  getTotalPotNumData
} from "@/api/modules/leader";
import { DATASCREEN_URL } from "@/config";
import { Driver } from "@/api/interface";
import ProTable from "@/components/ProTable/index.vue";
import leadVisitsDialog from "@/views/leader/components/leadVisitsDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { getLeadVisitsByKey } from "@/api/modules/driver";

if (document.fullscreenElement !== null) {
  document.exitFullscreen();
}

const screenInfo = screenInfoStore();
const Chart1 = ref();
const myChart1 = ref();
const Chart2 = ref();
const myChart2 = ref();
const Chart3 = ref();
const myChart3 = ref();
const Chart4 = ref();
const myChart4 = ref();
const Chart5 = ref();
const myChart5 = ref();

const centerName = ["阿布扎比\n中心", "Al Yasat\n技术支持中心", "科威特\n中心", "巴基斯坦\n中心", "东南亚\n中心", "哈萨克\nAMG", "哈萨克\nPKKP", "哈萨克阿拉木图\nALM中心", "阿尔及利亚\n中心", "利比亚\n中心", "尼比亚\n中心", "乍得\n中心", "尼日利亚\n中心", "南美\n中心"]

const instanceSelectArray = [
  {
    key: 1,
    name: "新签市场金额"
  },
  {
    key: 2,
    name: "累计完成进度"
  },
  {
    key: 3,
    name: "潜在项目数量"
  },
  {
    key: 4,
    name: "中标率百分比"
  },
  {
    key: 5,
    name: "市场营销活动数量"
  },
  {
    key: 6,
    name: "出国立项数量"
  }
];
// const selVal = ref(screenInfo.currentLeaderChart);
const selVal = ref(2);

const handleSelect = () => {
  if (selVal.value === 1) getChart1Data();
  if (selVal.value === 2) getChart2Data();
  if (selVal.value === 3) getChart3Data();
  if (selVal.value === 4) getChart4Data();
  if (selVal.value === 5) getChart5Data();
};

const startDate = ref<any>("2023-01-01");
const endDate = ref<any>("2023-04-30");
//用async 和 await 将异步请求转换为同步，便于后面的数据处理与图表渲染
//新签市场
async function getChart1Data() {
  const chartData = ref<any>((await getnewSignChartData({ startDate: startDate.value, endDate: endDate.value })).result);
  //console.log("monthData", monthData)
  const xData = ref<any>([]);
  const yData = ref<any>([]);
  for (let i = chartData.value.length - 1; i >= 0; i--) {
    xData.value.push(chartData.value[i].monthName);
    yData.value.push(chartData.value[i].monthMoney);
  }
  let optionChart1 = {
    title: {
      text: "新签市场金额（" + xData.value[0] + "-" + xData.value[xData.value.length - 1] + ")",
      textStyle: {
        color: "#1f2d3d",
        fontSize: "28"
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
          fontSize: 24
        }
      },
      nameTextStyle: {
        fontSize: 24
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
          fontSize: 24
        }
      },
      nameTextStyle: {
        fontSize: 24
      },
      //最小刻度设置为1
      minInterval: 1
    },
    series: [
      {
        data: yData.value,
        type: "line",
        itemStyle: {
          color: "#14517C",
        },
        lineStyle: {
          color: "#5986c1"
        },
        symbol: "roundRect",
        symbolSize: 15,
        label: {
          show: true,
          textStyle: {
            //数值样式
            //color: 'black',
            fontSize: 24
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
//累计完成进度
async function getChart2Data() {
  // await nextTick()
  const chartData = ref<any>((await getProgressChartData()).result);
  const xData = chartData.value.overseaCenter;
  const yData = chartData.value.completionProgress;
  let optionChart2 = {
    title: {
      text: "海外中心市场累计完成进度条形图",
      textStyle: {
        color: "#1f2d3d",
        fontSize: 28
      },
      left: "center"
    },
    legend: {
      show: true, //是否显示
      // icon: "circle",//图例样式
      orient: "horizontal",
      // y: "bottom",
      right: "6%",
      top: "4%",
      data: ["研究院指标", "时间进度", "已完成", "去年同期"],
      // top: "55%", // 组件离容器的距离
      // bottom: "1%", // 组件离容器的距离
      // left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'
      // right: "5%",
      // left:"10%" // // 组件离容器的距离
      // padding: 5, // 图例内边距
      // itemWidth: 6, // 图例标记的图形宽度。
      // itemGap: 20, // 图例每项之间的间隔。
      // itemHeight: 14, // 图例标记的图形高度。
      // selectedMode: false, // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。
      // inactiveColor: "#fffddd", // 图例关闭时的颜色。
      textStyle: {
        //图例的公用文本样式。
        // color: "#aabbcc", // 文字的颜色。
        // fontStyle: "normal", // 文字字体的风格。'italic'
        // fontWeight: "normal", // 文字字体的粗细。 'normal' 'bold' 'bolder' 'lighter' 100 | 200 | 300 | 400...
        // fontFamily: "sans-serif", // 文字的字体系列。
        fontSize: 20 // 文字的字体大小。
        // lineHeight: 20, // 行高。
        // backgroundColor: "transparent", // 文字块背景色。
        // borderColor: "transparent", // 文字块边框颜色。
        // borderWidth: 0, // 文字块边框宽度。
        // borderRadius: 0, // 文字块的圆角。
        // padding: 0, // 文字块的内边距
        // shadowColor: "transparent", // 文字块的背景阴影颜色
        // shadowBlur: 0, // 文字块的背景阴影长度。
        // shadowOffsetX: 0, // 文字块的背景阴影 X 偏移。
        // shadowOffsetY: 0, // 文字块的背景阴影 Y 偏移。
        // // width: 50, // 文字块的宽度。 默认
        // // height: 40, // 文字块的高度 默认
        // textBorderColor: "transparent", // 文字本身的描边颜色。
        // textBorderWidth: 0, // 文字本身的描边宽度。
        // textShadowColor: "transparent", // 文字本身的阴影颜色。
        // textShadowBlur: 0, // 文字本身的阴影长度。
        // textShadowOffsetX: 0, // 文字本身的阴影 X 偏移。
        // textShadowOffsetY: 0, // 文字本身的阴影 Y 偏移。
      }
    },
    xAxis: {
      type: "category",
      // data: xData.map(function (str: any) {
      //   return str.slice(0, str.length * 3 / 4) + '\n' + str.slice(str.length * 3 / 4)
      // }),
      data: centerName,
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
        textStyle: {
          fontSize: 24
        }
      },
      // name: '月份'
      name: '分中心',
      nameTextStyle: {
        fontSize: 24
      },
    },
    yAxis: {
      type: "value",
      name: "单位（万美元）",
      nameTextStyle: {
        fontSize: 24
      },
      //去除网格线
      splitLine: {
        show: true
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
          fontSize: 24
        }
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
        showDataShadow: false,
        // fillerColor: 'rgba(64, 158, 255)',
        // borderRadius: '50%',
        // handleSize: '80%',
        // handleIcon: 'path://M512,512m-448,0a448,448,0,1,0,896,0a448,448,0,1,0,-896,0Z',
        // handleStyle: {
        //   borderWidth: 0,
        //   color: 'rgba(64, 158, 255)'
        // },

        // 是否显示detail，即拖拽时候显示详细数值信息
        showDetail: false,
        // 数据窗口范围的起始数值
        startValue: 0,
        // 数据窗口范围的结束数值（一页显示多少条数据）
        endValue: 5,
        // 控制哪个轴，如果是number表示控制一个轴，
        // 如果是Array表示控制多个轴。此处控制第二根轴
        xAxisIndex: 0,
        // empty：当前数据窗口外的数据，被设置为空。
        // 即不会影响其他轴的数据范围
        filterMode: "empty",
        width: "80%",
        // 设置滚动条高度
        height: 15,
        // 距离右边
        right: 0,
        left: "center",
        bottom: -0,
        // 控制手柄的尺寸
        handleSize: 0,
        // 是否锁定选择区域（或叫做数据窗口）的大小
        zoomLock: true,
        // 组件离容器上侧的距离
        // 如果top的值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐
        brushSelect: false
      }
      // {
      //   // 没有下面这块的话，只能拖动滚动条，
      //   // 鼠标滚轮在区域内不能控制外部滚动条
      //   type: "inside",
      //   // 控制哪个轴，如果是number表示控制一个轴，
      //   // 如果是Array表示控制多个轴。此处控制第二根轴
      //   xAxisIndex: 0,
      //   // 滚轮是否触发缩放
      //   zoomOnMouseWheel: false,
      //   // 鼠标移动能否触发平移
      //   moveOnMouseMove: true,
      //   // 鼠标滚轮能否触发平移
      //   moveOnMouseWheel: true,
      // },
    ],
    series: [
      {
        name: "研究院指标",
        data: yData.annualMetrics,
        type: "bar",
        barwidth: 40,
        barMaxWidth: 40, // 最大宽度
        label: {
          show: true,
          position: "top", //在上方显示
          textStyle: {
            //数值样式
            color: "gray",
            fontSize: 24
          }
        },
        color: "#c8dda4"
      },
      {
        name: "时间进度",
        data: yData.timeSchedule,
        type: "bar",
        barwidth: 40,
        barMaxWidth: 40, // 最大宽度
        label: {
          show: true,
          position: "top", //在上方显示
          textStyle: {
            //数值样式
            color: "gray",
            fontSize: 24
          }
        },
        color: "#a3bbdc"
      },
      {
        name: "已完成",
        data: yData.Done,
        type: "bar",
        barwidth: 40,
        barMaxWidth: 40, // 最大宽度
        label: {
          show: true,
          position: "top", //在上方显示
          textStyle: {
            //数值样式
            color: "gray",
            fontSize: 24
          }
        },
        color: "#7c9ecd"
      },
      {
        name: "去年同期",
        data: yData.lastYear,
        type: "bar",
        barwidth: 40,
        barMaxWidth: 40, // 最大宽度
        label: {
          show: true,
          position: "top", //在上方显示
          textStyle: {
            //数值样式
            color: "gray",
            fontSize: 24
          }
        },
        color: "#97d8e8"
      }
    ],
    tooltip: {
      trigger: "item"
    }
  };
  myChart2.value = markRaw(echarts.init(Chart2.value)); // 重点
  myChart2.value.setOption(optionChart2);
}
//潜在项目数量
async function getChart3Data() {
  const chartData = ref<any>((await getTotalPotNumData()).result);
  const xData = ref<any>([]);
  const yData = ref<any>([]);
  for (let i = 0; i < chartData.value.centerName.length; i++) {
    xData.value.push(chartData.value.centerName[i]);
    yData.value.push(chartData.value.potNum[i]);
  }
  let optionChart3 = {
    title: {
      text: "潜在项目数量",
      textStyle: {
        color: "#1f2d3d",
        fontSize: 28
      },
      left: "center"
    },
    color: ["#304156"],
    xAxis: {
      type: "category",
      data: centerName,
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
        interval: 0, //使x轴文字显示全
        textStyle: {
          fontSize: 24
        }
      },
      name: '月份',
      nameTextStyle: {
        fontSize: 24
      },
    },
    yAxis: {
      type: "value",
      name: "单位（个）",
      max: (value: any) => {  // 百位起最大值向上取整
        return Math.ceil(value.max * 1.2);
      },
      //去除网格线
      splitLine: {
        show: true
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
          fontSize: 24
        }
      },
      nameTextStyle: {
        fontSize: 24
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
        showDataShadow: false,
        // 数据窗口范围的起始数值
        startValue: 0,
        // 数据窗口范围的结束数值（一页显示多少条数据）
        endValue: 6,
        // 控制哪个轴，如果是number表示控制一个轴，
        // 如果是Array表示控制多个轴。此处控制第二根轴
        xAxisIndex: 0,
        // empty：当前数据窗口外的数据，被设置为空。
        // 即不会影响其他轴的数据范围
        filterMode: "empty",
        width: "80%",
        // 设置滚动条高度
        height: 15,
        // 距离右边
        right: 0,
        left: "center",
        bottom: 0,
        // 控制手柄的尺寸
        handleSize: 0,
        // 是否锁定选择区域（或叫做数据窗口）的大小
        zoomLock: true,
        // 组件离容器上侧的距离
        // 如果top的值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐
        brushSelect: false
      }
      // {
      //   // 没有下面这块的话，只能拖动滚动条，
      //   // 鼠标滚轮在区域内不能控制外部滚动条
      //   type: "inside",
      //   // 控制哪个轴，如果是number表示控制一个轴，
      //   // 如果是Array表示控制多个轴。此处控制第二根轴
      //   xAxisIndex: 0,
      //   // 滚轮是否触发缩放
      //   zoomOnMouseWheel: false,
      //   // 鼠标移动能否触发平移
      //   moveOnMouseMove: true,
      //   // 鼠标滚轮能否触发平移
      //   moveOnMouseWheel: true,
      // },
    ],
    series: [
      {
        data: yData.value,
        type: "bar",
        barwidth: 50,
        barMaxWidth: 50, // 最大宽度
        label: {
          show: true,
          position: "top", //在上方显示
          textStyle: {
            //数值样式
            color: "gray",
            fontSize: 24
          }
        },
        color: "#5986c1"
      }
    ],
    tooltip: {
      trigger: "item",
    },
  };
  myChart3.value = markRaw(echarts.init(Chart3.value));
  // myChart3.value = echarts.init(Chart3.value); // 重点
  myChart3.value.setOption(optionChart3);
}
//中标率百分比
async function getChart4Data() {
  // .... // 这里调用接口,获取后台数据,来更改option里面对应的值
  const chartData = ref<any>((await getWinRatesData({ startDate: startDate.value, endDate: endDate.value })).result);
  //console.log("chartData", chartData)
  const xData = ref<any>([]);
  const yData = ref<any>([]);
  for (let i = chartData.value.length - 1; i >= 0; i--) {
    xData.value.push(chartData.value[i].monthName);
    yData.value.push(chartData.value[i].winRate);
  }
  // 在这之前要获取option里面,要用到的数据
  let optionChart4 = {
    title: {
      text: "中标率百分比(" + xData.value[0] + "-" + xData.value[xData.value.length - 1] + ")",
      textStyle: {
        color: "#1f2d3d",
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
          fontSize: 24
        }
      },
      nameTextStyle: {
        fontSize: 24
      },
      name: "月份"
    },
    yAxis: {
      type: "value",
      name: "%",
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
          fontSize: 24
        }
      },
      nameTextStyle: {
        fontSize: 24
      },
      //最小刻度设置为1
      minInterval: 1,
      max: 100
    },
    series: [
      {
        data: yData.value,
        type: "line",
        barwidth: "20%",
        symbol: "circle",
        symbolSize: 15,
        itemStyle: {
          color: "#228B22",
        },
        lineStyle: {
          color: "#96C37D"
        },
        label: {
          show: true,
          textStyle: {
            //数值样式
            //color: 'black',
            fontSize: 24
          }
        }
      }
    ],
    tooltip: {
      trigger: "item"
    }
  };
  myChart4.value = echarts.init(Chart4.value); // 重点
  myChart4.value.setOption(optionChart4);
}
//市场营销活动数量
async function getChart5Data() {
  // 这里调用接口,获取后台数据,来更改option里面对应的值
  const chartData = ref<any>((await getMarketNumData()).result);
  const xData = chartData.value.centerName;
  const yData = chartData.value.activitiesNum;
  // 在这之前要获取option里面,要用到的数据
  let optionChart5 = {
    title: {
      text: "市场营销活动数量",
      textStyle: {
        color: "#1f2d3d",
        fontSize: 24
      },
      left: "center"
    },
    legend: {
      show: true, //是否显示
      // icon: "circle",//图例样式
      orient: "horizontal",
      right: "6%",
      top: "4%",
      data: ["客户走访", "技术宣讲"],
      textStyle: {
        fontSize: 20
      }
    },
    color: ["#305156"],
    xAxis: {
      name: "分中心",
      nameTextStyle: {
        fontSize: 24
      },
      type: "category",
      data: centerName,
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
        fontSize: 24
      }
      // name: '月份'
    },
    yAxis: {
      type: "value",
      //去除网格线
      max: (value: any) => {  // 百位起最大值向上取整
        return Math.ceil(value.max * 1.2);
      },
      splitLine: {
        show: true
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
          fontSize: 24
        }
      },
      //最小刻度设置为1
      minInterval: 1,
      name: '单位（次）',
      nameTextStyle: {
        fontSize: 24
      },
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
        showDataShadow: false,
        // 数据窗口范围的起始数值
        startValue: 0,
        // 数据窗口范围的结束数值（一页显示多少条数据）
        endValue: 6,
        // 控制哪个轴，如果是number表示控制一个轴，
        // 如果是Array表示控制多个轴。此处控制第二根轴
        xAxisIndex: 0,
        // empty：当前数据窗口外的数据，被设置为空。
        // 即不会影响其他轴的数据范围
        filterMode: "empty",
        width: "80%",
        // 设置滚动条高度
        height: 15,
        // 距离右边
        right: 0,
        left: "center",
        bottom: 0,
        // 控制手柄的尺寸
        handleSize: 0,
        // 是否锁定选择区域（或叫做数据窗口）的大小
        zoomLock: true,
        // 组件离容器上侧的距离
        // 如果top的值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐
        brushSelect: false
      }
      // {
      //   // 没有下面这块的话，只能拖动滚动条，
      //   // 鼠标滚轮在区域内不能控制外部滚动条
      //   type: "inside",
      //   // 控制哪个轴，如果是number表示控制一个轴，
      //   // 如果是Array表示控制多个轴。此处控制第二根轴
      //   xAxisIndex: 0,
      //   // 滚轮是否触发缩放
      //   zoomOnMouseWheel: false,
      //   // 鼠标移动能否触发平移
      //   moveOnMouseMove: true,
      //   // 鼠标滚轮能否触发平移
      //   moveOnMouseWheel: true,
      // },
    ],
    series: [
      {
        name: "客户走访",
        data: yData.speechNum,
        type: "bar",
        barwidth: 50,
        barMaxWidth: 50, // 最大宽度
        color: "#5986c1",
        label: {
          show: true,
          position: "top", //在上方显示
          textStyle: {
            //数值样式
            color: "gray",
            fontSize: 24
          }
        }
      },
      {
        name: "技术宣讲",
        data: yData.visitNum,
        type: "bar",
        barwidth: 50,
        barMaxWidth: 50, // 最大宽度
        color: "#97d8e8",
        label: {
          show: true,
          position: "top", //在上方显示
          textStyle: {
            //数值样式
            color: "gray",
            fontSize: 24
          }
        }
      }
    ],
    tooltip: {
      trigger: "item"
    }
  };
  myChart5.value = markRaw(echarts.init(Chart5.value)); // 重点
  myChart5.value.setOption(optionChart5);
}

// ProTable 实例
const leadVisits = ref<ProTableInstance>();
// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = async (params: any) => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.createTime && (newParams.startTime = newParams.createTime[0]);
  newParams.createTime && (newParams.endTime = newParams.createTime[1]);
  delete newParams.createTime;
  return await getLeadVisitsByKey(params);
};

// 表格配置项
const columns = reactive<ColumnProps<Driver.leadVisits>[]>([
  { type: "index", label: "#", width: 80 },
  { prop: "startDate", label: "起始时间 " },
  { prop: "endDate", label: "截止时间" },
  { prop: "expert", label: "院公司领导专家" },
  { prop: "leader", label: "海外领导" },
  { prop: "followPeople", label: "随行人员" },
  { prop: "area", label: "出访区域" },
  { prop: "task", label: "访问任务", isShow: false },
  { prop: "locus", label: "公司及一体化单位领导轨迹重合", isShow: false },
  { prop: "note", label: "备注", isShow: false },
  { prop: "key", label: "搜索", search: { el: "input" }, isShow: false },
  { prop: "operation", label: "操作", fixed: "right", width: 160 }
]);
// 打开 drawer(新增、查看、编辑)
const dialogRef = ref<InstanceType<typeof leadVisitsDialog> | null>(null);
const openDialog = (title: string, row: Partial<Driver.leadVisits> = {}) => {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    api: undefined,
    getTableList: leadVisits.value?.getTableList
  };
  dialogRef.value?.acceptParams(params);
};
onMounted(() => {
  getChart1Data();
  getChart2Data();
  getChart3Data();
  getChart4Data();
  getChart5Data();
});
</script>

<style lang="scss"  scoped>
.main {
  width: 100%;
  height: calc(100% - 32px);
  background-color: #ffffff;
}

.select-box {
  width: 150px;
  height: 32px;
  margin-left: 10px;
}

.leaderChart {
  /* width: 90%;
  height: 100%; */
  width: 1400px;
  height: 750px;
}

:deep(.el-input__wrapper) {
  font-size: 20px;
  width: 200px;
}
</style>
