<template>
  <div class="table-box">
    <ProTable ref="bidTable" :columns="columns" :request-api="getTableList" :init-param="initParam"
      :data-callback="dataCallback">
      <!-- 表格 header 按钮 -->
      <template #tableHeader="">
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDialog('新增')"
          style="width: auto; height: auto"><span style="font-size: 20px">添 加</span></el-button>
        <el-button type="primary" :icon="CirclePlus" @click="ExportExcel()" style="width: auto; height: auto">
          <span style="font-size: 20px">导 出</span></el-button>
      </template>
      <!-- 工作性质 -->
      <template #workNature="scope">
        {{ showworkNature(scope.row.workNature) }}
      </template>
      <!-- 工区地表类型 -->
      <template #surfaceType="scope">
        {{ showsurfaceType(scope.row.surfaceType) }}
      </template>
      <!-- 是否PSTM -->
      <template #pstm="scope">
        {{ showyesno(scope.row.pstm) }}
      </template>
      <!-- 是否一体化 -->
      <template #integration="scope">
        {{ showyesno(scope.row.integration) }}
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-row>
          <el-col :span="12">
            <el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)"><span
                style="font-size: 20px">编辑</span></el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" link :icon="Delete" @click="deleteNewSigns(scope.row)"><span
                style="font-size: 20px">删除</span></el-button>
          </el-col>
        </el-row>
      </template>
    </ProTable>
    <NewSignDialog ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="Table">
import { ref, reactive } from "vue";
import { Market } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import ProTable from "@/components/ProTable/index.vue";
import NewSignDialog from "@/views/market/components/NewSignDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { getNewSignList, addNewSign, editNewSign, deleteNewSign, exportNewsignExcel } from "@/api/modules/market";

if (document.fullscreenElement !== null) {
  document.exitFullscreen();
}
// ProTable 实例
const bidTable = ref<ProTableInstance>();
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
  return await getNewSignList(params);
};

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons();

// 表格配置项
const columns = reactive<ColumnProps<Market.NewSignTable>[]>([
  { type: "index", label: "#", width: 80 },
  {
    prop: "area",
    label: "地区",
  },
  {
    prop: "country",
    label: "国家"
  },
  { prop: "workareaName", label: "工区名称", width: 120 },
  { prop: "lessor", label: "甲方" },
  { prop: "ourCompany", label: "我方签约公司名称", width: 220 },
  { prop: "signatoryName", label: "我方合同签字人姓名", width: 240 },
  { prop: "projectName", label: "项目名称", width: 120 },
  { prop: "contractNum", label: "合同号", width: 100 },
  { prop: "workNature", label: "工作性质", width: 120 },
  { prop: "integration", label: "是否一体化项目", width: 200 },
  { prop: "surfaceType", label: "工区地表类型", width: 160 },
  { prop: "pstm", label: "是否PSTM", width: 160 },
  { prop: "psdm", label: "是否PSDM", width: 160 },
  { prop: "workload_2d", label: "工作量2D", width: 140 },
  { prop: "workload_3d", label: "工作量3D", width: 140 },
  { prop: "contractAmount", label: "新签合同额(万美元)", width: 220 },
  { prop: "signDate", label: "合同签订日期", width: 160 },
  { prop: "closeDate", label: "合同关闭日期", width: 160 },
  { prop: "note", label: "备注", width: 160 },
  { prop: "key", label: "搜索", search: { el: "input" }, isShow: false },
  { prop: "operation", label: "操作", fixed: "right", width: 160 }
]);

// 删除用户信息
const deleteNewSigns = async (params: Market.NewSignTable) => {
  await useHandleData(deleteNewSign, { id: params.id }, `删除`);
  bidTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const dialogRef = ref<InstanceType<typeof NewSignDialog> | null>(null);
const openDialog = (title: string, row: Partial<Market.NewSignTable> = {}) => {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    api: title === "新增" ? addNewSign : title === "编辑" ? editNewSign : undefined,
    getTableList: bidTable.value?.getTableList,
    selected: strtosig(row.workNature)
  };
  dialogRef.value?.acceptParams(params);
};

const workNature = [
  { label: "处理", value: 1 },
  { label: "解释", value: 2 },
  { label: "油藏", value: 3 },
  { label: "科研", value: 4 },
  { label: "服务", value: 5 }
];

const yesno = [
  { label: "是", value: 1 },
  { label: "否", value: 2 }
];

const surfaceType = [
  { label: "海洋", value: 1 },
  { label: "过渡带", value: 2 },
  { label: "陆地", value: 3 }
];

const showworkNature = (str: string) => {
  let tempstr = str.toString().split("");
  let res = "";
  for (let i = 0; i < tempstr.length; i++) {
    res = res + workNature[parseInt(tempstr[i]) - 1].label + " ";
  }
  return res;
};

const showyesno = (num: number) => {
  return num ? yesno[num - 1].label : undefined;
};

const showsurfaceType = (num: number) => {
  return num ? surfaceType[num - 1].label : undefined;
};

const strtosig = (str: string | undefined) => {
  let res = [];
  if (str == undefined) return;
  for (let i = 0; i < str.length; i++) {
    res.push(Number(str[i]));
  }
  return res;
};

const ExportExcel = async () => {
  let res = await exportNewsignExcel();
  const blob = new Blob([res]);
  console.log(blob);
  const fileName = "新签市场.xlsx";
  const elink = document.createElement("a"); // 创建a标签
  elink.download = fileName; // 为a标签添加download属性
  elink.style.display = "none";
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click(); // 点击下载
  URL.revokeObjectURL(elink.href); // 释放URL 对象
  document.body.removeChild(elink); // 释放标签
};
</script>
