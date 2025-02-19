<template>
  <div class="table-box">
    <ProTable ref="markTable" :columns="columns" :request-api="getTableList" :init-param="initParam"
      :data-callback="dataCallback" style="font-size: 30px">
      <!-- 表格 header 按钮 -->
      <template #tableHeader="">
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDialog('新增')"
          style="width: auto; height: auto"><span style="font-size: 20px">添 加</span></el-button>
      </template>
      <!-- 方式 -->
      <template #way="scope">
        <!-- {{ wayType[scope.row.way - 1].label }} -->
        {{ showWayType(scope.row.way) }}
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-row>
          <el-col :span="12">
            <el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)">
              <span style="font-size: 20px">编辑</span></el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" link :icon="Delete" @click="deleteMarks(scope.row)"><span
                style="font-size: 20px">删除</span></el-button>
          </el-col>
        </el-row>
      </template>
    </ProTable>
    <MarkDialog ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="Table">
import { ref, reactive } from "vue";
import { Market } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import ProTable from "@/components/ProTable/index.vue";
import MarkDialog from "@/views/market/components/MarkDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { getMarkList, addMark, editMark, deleteMark } from "@/api/modules/market";

if (document.fullscreenElement !== null) {
  document.exitFullscreen();
}
// ProTable 实例
const markTable = ref<ProTableInstance>();
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
  return await getMarkList(params);
};

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons();

// 表格配置项
const columns = reactive<ColumnProps<Market.MarkTable>[]>([
  { type: "index", label: "#", width: 80 },
  {
    prop: "clientName",
    label: "客户名称",
  },
  {
    prop: "date",
    label: "时间"
  },
  { prop: "orgUnit", label: "组织单位" },
  { prop: "content", label: "沟通内容" },
  { prop: "way", label: "方式" },
  { prop: "location", label: "地点" },
  { prop: "head", label: "主要负责人" },
  { prop: "participants", label: "参与人员" },
  { prop: "note", label: "备注" },
  { prop: "key", label: "搜索", search: { el: "input" }, isShow: false },
  { prop: "operation", label: "操作", fixed: "right", width: 160 }
]);

// 删除用户信息
const deleteMarks = async (params: Market.MarkTable) => {
  await useHandleData(deleteMark, { id: params.id }, `删除`);
  markTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const dialogRef = ref<InstanceType<typeof MarkDialog> | null>(null);
const openDialog = (title: string, row: Partial<Market.MarkTable> = {}) => {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    api: title === "新增" ? addMark : title === "编辑" ? editMark : undefined,
    getTableList: markTable.value?.getTableList
  };
  dialogRef.value?.acceptParams(params);
};

const wayType = [
  { label: "来访", value: 1 },
  { label: "走访", value: 2 },
  { label: "线上", value: 3 }
];

const showWayType = (num: number) => {
  return num ? wayType[num - 1].label : undefined;
};
</script>
