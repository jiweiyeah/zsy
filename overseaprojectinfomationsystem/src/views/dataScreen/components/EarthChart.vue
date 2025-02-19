<template>
  <!-- 3D地球 -->
  <div id="earth" class="echarts" ref="earth">
    <!-- <ECharts :option="option" :resize="false" /> -->
  </div>
</template>

<script setup lang="ts">
import echarts from "@/components/ECharts/config";
import "echarts-gl";
import { nextTick, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { HOME_URL, LEADER_URL } from "@/config";

const router = useRouter();
const timer = ref();
const option = ref({
  // backgroundColor: "#000",
  globe: {
    // baseTexture: "assets/png/3d-earth-1.png",
    // heightTexture: "assets/png/3d-earth.png",
    baseTexture: 'src/views/dataScreen/images/3d-earth-1.png',
    heightTexture: 'src/views/dataScreen/images/3d-earth.png',
    shading: "lambert",
    light: {
      ambient: {
        intensity: 0.8
      },
      main: {
        intensity: 0
      }
    },
    emphasis: {
      //当鼠标放上去的状态
      label: {
        show: true
      },
      itemStyle: {
        color: "#000"
      },
      viewControl: {
        autoRotate: false
      }
    },
    viewControl: {
      // autoRotateSpeed: 10,
      autoRotate: true
    }
  },
  // roam: true,
  series: [
    {
      // 点
      type: "scatter3D",
      // type: 'scatter',
      coordinateSystem: "globe",
      blendMode: "source-over",
      showEffectOn: "render",
      zlevel: 10,
      effectType: "ripple",
      symbol: "circle", //点形状 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      symbolSize: 20, //点的大小
      rippleEffect: {
        period: 4,
        scale: 4,
        brushType: "fill"
      },
      hoverAnimation: true,
      itemStyle: {
        color: "white", //点颜色
        borderColor: "green", //点边框颜色
        opacity: 1, //点的透明度 1不透明
        borderWidth: 0.5 //图形描边宽度
        // normal: {
        //   label: {
        //     show: true,
        //     formatter: function (params: { data: string[]; }) {
        //       return params.data[3]
        //       return params.data[3] + '\n' + params.data[4] + '\n' + params.data[5];
        //     },
        //     distance: 10
        //   },
        // },
      },
      label: {
        show: true, //是否显示点上面的标签，默认false
        distance: 15, //标签与点的距离
        position: "top", //标签位置
        textStyle: {
          color: "white", //文字颜色
          borderWidth: 0, //标签上边框宽度
          borderColor: "white", //边框颜色
          fontFamily: "宋体", //标签字体
          fontSize: 20, //字体大小
          fontWeight: "bold" //是否加粗
        }
      },
      emphasis: {
        itemStyle: {
          color: "green", //鼠标移到点上的颜色变化
          opacity: 1, //不透明度
          borderWidth: 0, //图像描边宽度
          borderColor: "#fff" //图形描边颜色
        },
        label: {
          show: true, //鼠标移动到点上是否显示标签
          distance: 15, //标签与点的距离
          position: "top", //标签位置
          textStyle: {
            color: "white", //文字颜色
            borderWidth: 0, //标签上边框宽度
            borderColor: "white", //边框颜色
            fontFamily: "宋体", //标签字体
            fontSize: 20, //字体大小
            fontWeight: "bold" //是否加粗
          }
        }
      },
      data: [
        [54.23, 24.27, 0, "阿布扎比研究中心"],
        [50.23, 24.27, 0, "AI Yasat技术支持中心"],
        [48.8, 28.8, 0, "科威特研究中心"],
        [75.09, 33.44, 0, "巴基斯坦研究中心"],
        [110.23, 10.27, 0, "东南亚研究中心"],
        [68.23, 48.27, 0, "哈萨克斯坦研究中心（AMG）"],
        [68.23, 52.27, 0, "哈萨克斯坦研究中心（PKKR）"],
        [76.09, 43.44, 0, "哈萨克斯坦阿拉木图研究中心（ALM）"],
        [3.23, 36.27, 0, "阿尔及利亚研究中心"],
        [13.8, 32.8, 0, "利比亚研究中心"],
        [2.09, 13.44, 0, "尼日尔研究中心"],
        [14.23, 12.27, 0, "乍得研究中心"],
        [7.8, 7.8, 0, "尼日利亚研究中心"],
        [-68.09, -16.44, 0, "南美研究中心（玻利维亚）"]
      ]
      // data: [
      //   [10, 20, 30, 'data1'],
      //   [20, 40, 0, 'data2'],
      //   [30, 60, 0, 'data3'],
      //   [40, 80, 40, 'data4'],
      //   [50, 100, 30, 'data5'],
      //   [60, 120, 50, 'data6']
      // ]
      // data:data,
    }
  ]
});

async function getChartDate() {
  await nextTick();
  let myChart = echarts.init(document.getElementById("earth"));
  myChart.setOption(option.value, true);

  myChart.on("click", function (params: any) {
    // 处理点击事件
    if (params.data[3] == "阿布扎比研究中心") router.push("/branchCenter/AbuDhabi");
    else if (params.data[3] == "AI Yasat技术支持中心") router.push("/branchCenter/AIYasat");
    else if (params.data[3] == "阿尔及利亚研究中心") router.push("/branchCenter/Algeria");
    else if (params.data[3] == "哈萨克斯坦阿拉木图研究中心（ALM）") router.push("/branchCenter/AlmaAta");
    else if (params.data[3] == "乍得研究中心") router.push("/branchCenter/Chad");
    else if (params.data[3] == "科威特研究中心") router.push("/branchCenter/Kuwait");
    else if (params.data[3] == "哈萨克斯坦研究中心（AMG）") router.push("/branchCenter/KZAMG");
    else if (params.data[3] == "哈萨克斯坦研究中心（PKKR）") router.push("/branchCenter/KZPKKR");
    else if (params.data[3] == "利比亚研究中心") router.push("/branchCenter/Libya");
    else if (params.data[3] == "尼日尔研究中心") router.push("/branchCenter/Niger");
    else if (params.data[3] == "尼日利亚研究中心") router.push("/branchCenter/Nigeria");
    else if (params.data[3] == "巴基斯坦研究中心") router.push("/branchCenter/Pakistan");
    else if (params.data[3] == "南美研究中心（玻利维亚）") router.push("/branchCenter/SouthAmerica");
    else router.push("/branchCenter/SoutheastAsia");
  });
  // let gl = canvas.getContext('webgl');
  // //使用下面的扩展插件，手动销毁WebGL context对象。
  // gl.getExtension('WEBGL_lose_context').loseContext();
}

onMounted(() => {
  getChartDate();
  timer.value = setTimeout(() => {
    // do something
    option.value.globe.viewControl.autoRotate = false;
    getChartDate();
  }, 72000);
});
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
