<template>
  <div>
    <el-form>
      <el-form-item>
        <el-text v-for="(item, index) in state.res" :key="index"
          :style="index == 0 ? 'margin-top:15px;' + item.color : item.color" style="
            padding: 2px;
            margin-bottom: auto;
            margin-left: 10px;
            overflow: hidden;
            font-size: 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            font-family: Simsun;
          " @mouseover="Mouseover(index)" @mouseleave="Mouseleave(index)" @click="handleLink(index)"
          :title="item.title">
          <svg t="1701398190252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4292" width="20" height="20">
            <path d="M512 513.4m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0Z" fill="#ffffff" p-id="4293"></path>
          </svg>{{ item.title }}
        </el-text>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getHotNews } from "@/api/modules/screen";

const preColor = "color:#ffffff";
const preBackColor = "color:#ffffff; background-color:#0f9bff71";
const changeColor = "color:#f00000; text-decoration:underline;";
const changeBackColor = "color:#f00000; text-decoration:underline; background-color:#0f9bff71";

const state = reactive({
  res: [] as any
});

const Mouseover = (num: number) => {
  // if (num % 2 == 1) state.res[num].color = changeBackColor;
  // else state.res[num].color = changeColor;
  state.res[num].color = changeColor;
};

const Mouseleave = (num: number) => {
  // if (num % 2 == 1) state.res[num].color = preBackColor;
  // else state.res[num].color = preColor;
  state.res[num].color = preColor;
};

const getHotNewsList = async () => {
  state.res = (await getHotNews()).result;
  for (let i = 0; i < state.res.length; i++) {
    // if (i % 2 == 1) state.res[i].color = preBackColor;
    // else state.res[i].color = preColor;
    state.res[i].color = preColor;
  }
};

const handleLink = (num: number) => {
  window.open(state.res[num].href);
  // window.location.href = state.res[num].href
};

onMounted(() => {
  getHotNewsList();
});
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}

// .el-text:link{
//   color: ;
// }</style>
