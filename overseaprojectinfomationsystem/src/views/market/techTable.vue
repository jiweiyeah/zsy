<template>
  <div class="table-box">
    <ProTable ref="techTable" :columns="columns" :request-api="getTableList" :init-param="initParam"
      :data-callback="dataCallback">
      <!-- 表格 header 按钮 -->
      <template #tableHeader="">
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDialog('新增')"
          style="width: auto; height: auto"><span style="font-size: 20px">添 加</span></el-button>
        <el-button type="primary" :icon="CirclePlus" @click="ExportExcel()" style="width: auto; height: auto">
          <span style="font-size: 20px">导 出</span></el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-row>
          <el-col :span="12">
            <el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)"><span
                style="font-size: 20px">编辑</span></el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" link :icon="Delete" @click="deleteTechs(scope.row)"><span
                style="font-size: 20px">删除</span></el-button>
          </el-col>
        </el-row>
      </template>
    </ProTable>
    <TechDialog ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="markTable">
import { ref, reactive } from "vue";
import { Market } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import ProTable from "@/components/ProTable/index.vue";
import TechDialog from "@/views/market/components/TechDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { getTechList, addTech, editTech, deleteTech, exportPreExcel } from "@/api/modules/market";

if (document.fullscreenElement !== null) {
  document.exitFullscreen();
}
// ProTable 实例
const techTable = ref<ProTableInstance>();

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
  return await getTechList(params);
};

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons();
// console.log(BUTTONS.value)

// 表格配置项
const columns = reactive<ColumnProps<Market.TechTable>[]>([
  { type: "index", label: "#", width: 80 },
  {
    prop: "organizer",
    label: "主办单位",
  },
  {
    prop: "preTheme",
    label: "宣讲主题"
  },
  { prop: "preContent", label: "营销内容" },
  { prop: "preFormat", label: "宣讲形式" },
  { prop: "prePlace", label: "地点" },
  { prop: "comInvolved", label: "涉及油公司", width: 180 },
  { prop: "startTime", label: "起始日期" },
  { prop: "endTime", label: "结束日期" },
  { prop: "staff", label: "报告&筹备人员", width: 180 },
  { prop: "note", label: "备注" },
  { prop: "key", label: "搜索", search: { el: "input" }, isShow: false },
  { prop: "operation", label: "操作", fixed: "right", width: 160 }
]);

// 删除用户信息
const deleteTechs = async (params: Market.TechTable) => {
  await useHandleData(deleteTech, { id: params.id }, `删除`);
  techTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const dialogRef = ref<InstanceType<typeof TechDialog> | null>(null);
const openDialog = (title: string, row: Partial<Market.TechTable> = {}) => {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    api: title === "新增" ? addTech : title === "编辑" ? editTech : undefined,
    getTableList: techTable.value?.getTableList
  };
  console.log("techTable", techTable.value);
  console.log("params", params);
  dialogRef.value?.acceptParams(params);
};

const wayType = [
  { label: "来访", value: 1 },
  { label: "走访", value: 2 },
  { label: "线上", value: 3 }
];

const ExportExcel = async () => {
  let res = await exportPreExcel();
  const blob = new Blob([res]);
  console.log(blob);
  const fileName = "技术宣讲.xlsx";
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
