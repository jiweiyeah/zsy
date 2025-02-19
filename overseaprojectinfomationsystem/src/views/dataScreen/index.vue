<template>
  <div class="dataScreen-container">
    <div class="dataScreen-content" ref="dataScreenRef">
      <div class="dataScreen-header">
        <div class="header-lf">
          <span class="header-screening" @click="router.push(HOME_URL)">首页</span>
        </div>
        <div class="header-ct">
          <div class="header-ct-title">
            <span>石油海外项目信息管理系统</span>
            <!-- <div class="header-ct-warning">可视化地球</div> -->
          </div>
        </div>
        <div class="header-ri">
          <!-- <span class="header-download">统计报告</span> -->
          <!-- <span class="header-time">当前时间：{{ time }}</span> -->
        </div>
      </div>
      <div class="dataScreen-main">
        <div class="dataScreen-lf">
          <div class="dataScreen-top">
            <div class="dataScreen-main-title">
              <span>当前行业热点</span>
            </div>
            <!-- <dv-decoration2 :dur="4" style="width:100%;height:5px;margin-bottom: 5px;margin-top: -10px;" /> -->
            <dv-border-box10>
              <div class="dataScreen-main-chart">
                <HotNews />
              </div>
            </dv-border-box10>
          </div>
          <div class="dataScreen-center">
            <div class="dataScreen-main-title">
              <span>项目进度</span>
            </div>
            <dv-border-box10>
              <div class="dataScreen-main-chart">
                <ProjectProgress />
              </div>
            </dv-border-box10>
          </div>
          <div class="dataScreen-bottom">
            <div class="dataScreen-main-title">
              <span>项目总览</span>
              <!-- <img src="./images/dataScreen-title.png" alt="" /> -->
            </div>
            <dv-border-box10>
              <div class="dataScreen-main-chart">
                <ProjectOverview />
              </div>
            </dv-border-box10>
          </div>
        </div>
        <div class="dataScreen-ct">
          <div class="dataScreen-map">
            <div class="dataScreen-map-title">
              <span style="font-size: 28px">分中心</span>
            </div>
            <!-- <vue3-seamless-scroll
							:list="alarmData"
							class="dataScreen-alarm"
							:step="0.5"
							:hover="true"
							:limitScrollNum="3"
						>
							<div class="dataScreen-alarm">
								<div class="map-item" v-for="item in alarmData" :key="item.id">
									<img src="./images/dataScreen-alarm.png" alt="" />
									<span class="map-alarm sle">{{ item.label }} 预警：{{ item.warnMsg }}</span>
								</div>
							</div>
						</vue3-seamless-scroll> -->
            <EarthChart />
          </div>
          <div class="dataScreen-cb">
            <div class="dataScreen-main-title">
              <span>领导者驾驶舱</span>
              <!-- <img src="./images/dataScreen-title.png" alt="" /> -->
            </div>
            <dv-border-box10>
              <div class="dataScreen-main-chart">
                <!-- <OverNext30Chart />/ -->
                <el-row>
                  <el-col :span="8" style="height: 100px">
                    <el-image style="top: 20%; left: 5%; width: 20%; height: 60%" :src="icon_top_left" />
                    <span @click="routerPush(1)"
                      style="position: absolute; top: 27%; left: 10%; font-size: 30px; color: white; cursor: pointer;fontFamily: Simsun">新签市场金额</span>
                  </el-col>
                  <el-col :span="8" style="height: 100px">
                    <el-image style="top: 20%; width: 20%; height: 60%" :src="icon_top_center" />
                    <span @click="routerPush(2)"
                      style="position: absolute; top: 27%; left: 42%; font-size: 30px; color: white; cursor: pointer;fontFamily: Simsun">累计完成进度</span>
                  </el-col>
                  <el-col :span="8" style="height: 100px">
                    <el-image style="top: 20%; left: 10%; width: 20%; height: 60%" :src="icon_top_right" />
                    <span @click="routerPush(3)"
                      style="position: absolute; top: 27%; left: 78%; font-size: 30px; color: white; cursor: pointer;fontFamily: Simsun">潜在项目数量</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" style="height: 100px">
                    <el-image style="top: 20%; left: 5%; width: 20%; height: 60%" :src="icon_bottom_left" />
                    <span @click="routerPush(4)"
                      style="position: absolute; top: 27%; left: 10%; font-size: 30px; color: white; cursor: pointer;fontFamily: Simsun">中标率百分比</span>
                  </el-col>
                  <el-col :span="8" style="height: 100px">
                    <el-image style="top: 20%; width: 20%; height: 60%" :src="icon_bottom_center" />
                    <span @click="routerPush(5)"
                      style="position: absolute; top: 27%; left: 42%; font-size: 30px; color: white; cursor: pointer;fontFamily: Simsun">市场营销活动数量</span>
                  </el-col>
                  <el-col :span="8" style="height: 100px">
                    <el-image style="top: 20%; left: 10%; width: 20%; height: 60%" :src="icon_bottom_right" />
                    <span @click="routerPush(6)"
                      style="position: absolute; top: 27%; left: 78%; font-size: 30px; color: white; cursor: pointer;fontFamily: Simsun">出国立项数量</span>
                  </el-col>
                </el-row>
              </div>
            </dv-border-box10>
          </div>
        </div>
        <div class="dataScreen-rg">
          <div class="dataScreen-top">
            <div class="dataScreen-main-title">
              <span>各中心月度拜访量</span>
            </div>
            <dv-border-box10>
              <div class="dataScreen-main-chart">
                <MonthlyVisitsChart />
              </div>
            </dv-border-box10>
          </div>
          <div class="dataScreen-center">
            <div class="dataScreen-main-title">
              <span>各中心月度投标量</span>
              <!-- <img src="./images/dataScreen-title.png" alt="" /> -->
            </div>
            <dv-border-box10>
              <div class="dataScreen-main-chart">
                <MonthlyBiddingsChart />
              </div>
            </dv-border-box10>
          </div>
          <div class="dataScreen-bottom">
            <div class="dataScreen-main-title">
              <span>市场活跃度指数</span>
              <!-- <img src="./images/dataScreen-title.png" alt="" /> -->
            </div>
            <dv-border-box10>
              <div class="dataScreen-main-chart">
                <CompetitorDynamicsChart />
              </div>
            </dv-border-box10>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dataScreen">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { HOME_URL, LEADER_URL } from "@/config";
import { useRouter } from "vue-router";
import CompetitorDynamicsChart from "./components/CompetitorDynamicsChart.vue";
import ProjectOverview from "./components/ProjectOverview.vue";
import EarthChart from "./components/EarthChart.vue";
import MonthlyBiddingsChart from "./components/MonthlyBiddingsChart.vue";
import ProjectProgress from "./components/ProjectProgress.vue";
import MonthlyVisitsChart from "./components/MonthlyVisitsChart.vue";
import HotNews from "./components/HotNews.vue";
import dayjs from "dayjs";
import { screenInfoStore } from "@/stores/modules/screenInfo";
import icon_top_left from "./images/icon_top_left.png";
import icon_top_center from "./images/icon_top_center.png";
import icon_top_right from "./images/icon_top_right.png";
import icon_bottom_left from "./images/icon_bottom_left.png";
import icon_bottom_center from "./images/icon_bottom_center.png";
import icon_bottom_right from "./images/icon_bottom_right.png";

const router = useRouter();
const screenInfo = screenInfoStore();
const dataScreenRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (document.fullscreenElement !== null) {
    document.exitFullscreen();
  }
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
    dataScreenRef.value.style.width = `1920px`;
    dataScreenRef.value.style.height = `1080px`;
  }
  window.addEventListener("resize", resize);
});

// 设置响应式
const resize = () => {
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
  }
};

// 根据浏览器大小推断缩放比例
const getScale = (width = 1920, height = 1080) => {
  let ww = window.innerWidth / width;
  let wh = window.innerHeight / height;
  return ww < wh ? ww : wh;
};

// 获取当前时间
let timer: NodeJS.Timer | null = null;
let time = ref<string>(dayjs().format("YYYY年MM月DD HH:mm:ss"));
timer = setInterval(() => {
  time.value = dayjs().format("YYYY年MM月DD HH:mm:ss");
}, 1000);

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
  // clearInterval(timer!);
});

const routerPush = (leaderChart: any) => {
  screenInfo.setCurrentLeaderChart(leaderChart);
  router.push(LEADER_URL);
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
