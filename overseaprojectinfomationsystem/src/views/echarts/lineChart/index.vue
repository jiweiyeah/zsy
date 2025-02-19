<template>
  <div class="main">
    <div ref="Chart1" class="quarter-div"></div>
    <div ref="Chart2" class="quarter-div"></div>
    <div ref="Chart3" class="quarter-div"></div>
    <div ref="Chart4" class="quarter-div"></div>
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
import { onMounted, ref } from "vue";

const Chart1 = ref<HTMLElement>()
const myChart1 = ref<any>()
const Chart2 = ref<HTMLElement>()
const myChart2 = ref<any>()
const Chart3 = ref<HTMLElement>()
const myChart3 = ref<any>()
const Chart4 = ref<HTMLElement>()
const myChart4 = ref<any>()

async function getChart1Date() {

  // .... // 这里调用接口,获取后台数据,来更改option里面对应的值

  // 在这之前要获取option里面,要用到的数据
  let optionChart1 = {
    title: {
      text: "新签市场一览表",
      textStyle: {
        color: '#1f2d3d'
      },
      left: 'center'
    },
    color: ['#304156'],
    xAxis: {
      type: 'category',
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ],
      axisTick: {
        //去掉x轴刻度
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#8595a8'
        }
      },
      // name: '月份'
    },
    yAxis: {
      type: 'value',
      name: '单位（万美元）',
      //去除网格线
      splitLine: {
        show: true

      },
      axisLine: {
        lineStyle: {
          color: '#8595a8'
        }
      },
      axisTick: {
        show: false
      },
      //最小刻度设置为1
      minInterval: 1
    },
    series: [
      {
        data: [1],
        type: 'line',
        barwidth: '20%',
        itemStyle: { normal: { label: { show: true } } },
      }

    ],
    tooltip: {
      trigger: 'item'
    }
  }
  myChart1.value = echarts.init(Chart1.value!)// 重点
  myChart1.value.setOption(optionChart1)
}

async function getChart2Date() {

  // .... // 这里调用接口,获取后台数据,来更改option里面对应的值

  // 在这之前要获取option里面,要用到的数据
  let optionoptionChart2 = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      textStyle: {
        color: "#a1a1a1"
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLabel: {
          color: "#a1a1a1"
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "#a1a1a1"
        }
      }
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        emphasis: {
          focus: "series"
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: "Email",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series"
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: "Union Ads",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series"
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: "Video Ads",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series"
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: "Search Engine",
        type: "bar",
        data: [862, 1018, 964, 1026, 1679, 1600, 1570],
        emphasis: {
          focus: "series"
        },
        markLine: {
          lineStyle: {
            type: "dashed"
          },
          data: [[{ type: "min" }, { type: "max" }]]
        }
      },
      {
        name: "Baidu",
        type: "bar",
        barWidth: 5,
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: [620, 732, 701, 734, 1090, 1130, 1120]
      },
      {
        name: "Google",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: [120, 132, 101, 134, 290, 230, 220]
      },
      {
        name: "Bing",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: [60, 72, 71, 74, 190, 130, 110]
      },
      {
        name: "Others",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: [62, 82, 91, 84, 109, 110, 120]
      }
    ]
  }
  myChart2.value = echarts.init(Chart2.value!)// 重点
  myChart2.value.setOption(optionoptionChart2)
}

async function getChart3Date() {

  // .... // 这里调用接口,获取后台数据,来更改option里面对应的值

  // 在这之前要获取option里面,要用到的数据
  let optionoptionChart3 = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      textStyle: {
        color: "#a1a1a1"
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLabel: {
          color: "#a1a1a1"
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "#a1a1a1"
        }
      }
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        emphasis: {
          focus: "series"
        },
        data: [330, 333, 301, 334, 390, 330, 330]
      },
      {
        name: "Email",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series"
        },
        data: [130, 133, 101, 134, 90, 330, 310]
      },
      {
        name: "Union Ads",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series"
        },
        data: [330, 183, 191, 334, 390, 330, 310]
      },
      {
        name: "Video Ads",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series"
        },
        data: [150, 333, 301, 154, 190, 330, 410]
      },
      {
        name: "Search Engine",
        type: "bar",
        data: [863, 1018, 964, 1036, 1679, 1600, 1570],
        emphasis: {
          focus: "series"
        },
        markLine: {
          lineStyle: {
            type: "dashed"
          },
          data: [[{ type: "min" }, { type: "max" }]]
        }
      },
      {
        name: "Baidu",
        type: "bar",
        barWidth: 5,
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: [630, 733, 701, 734, 1090, 1130, 1130]
      },
      {
        name: "Google",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: [130, 133, 101, 134, 390, 330, 330]
      },
      {
        name: "Bing",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: [60, 73, 71, 74, 190, 130, 110]
      },
      {
        name: "Others",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: [63, 83, 91, 84, 109, 110, 130]
      }
    ]
  }
  myChart3.value = echarts.init(Chart3.value!)// 重点
  myChart3.value.setOption(optionoptionChart3)
}

async function getChart4Date() {

  // .... // 这里调用接口,获取后台数据,来更改option里面对应的值

  // 在这之前要获取option里面,要用到的数据
  let optionoptionChart4 = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      textStyle: {
        color: "#a1a1a1"
      }
    },
    grid: {
      left: "4%",
      right: "4%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLabel: {
          color: "#a1a1a1"
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "#a1a1a1"
        }
      }
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        emphasis: {
          focus: "series"
        },
        data: [440, 444, 401, 444, 490, 440, 440]
      },
      {
        name: "Email",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series"
        },
        data: [140, 144, 101, 144, 90, 440, 410]
      },
      {
        name: "Union Ads",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series"
        },
        data: [440, 184, 191, 444, 490, 440, 410]
      },
      {
        name: "Video Ads",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series"
        },
        data: [150, 444, 401, 154, 190, 440, 410]
      },
      {
        name: "Search Engine",
        type: "bar",
        data: [864, 1018, 964, 1046, 1679, 1600, 1570],
        emphasis: {
          focus: "series"
        },
        markLine: {
          lineStyle: {
            type: "dashed"
          },
          data: [[{ type: "min" }, { type: "max" }]]
        }
      },
      {
        name: "Baidu",
        type: "bar",
        barWidth: 5,
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: [640, 744, 701, 744, 1090, 1140, 1140]
      },
      {
        name: "Google",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: [140, 144, 101, 144, 490, 440, 440]
      },
      {
        name: "Bing",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: [60, 74, 71, 74, 190, 140, 110]
      },
      {
        name: "Others",
        type: "bar",
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: [64, 84, 91, 84, 109, 110, 140]
      }
    ]
  }
  myChart4.value = echarts.init(Chart4.value!)// 重点
  myChart4.value.setOption(optionoptionChart4)
}

onMounted(() => {
  getChart1Date()
  getChart2Date()
  getChart3Date()
  getChart4Date()
})

</script>

<style scoped lang="scss">
.main {
  width: 87.5%;
  height: 84%;
  position: absolute;
  background-color: #FFFFFF;
}

.quarter-div {
  width: 50%;
  height: 50%;
  float: left;
}
</style>
