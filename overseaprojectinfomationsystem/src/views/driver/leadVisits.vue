<template>
  <div class="table-box">
    <ProTable ref="leadVisits" :columns="columns" :request-api="getTableList" :init-param="initParam"
      :data-callback="dataCallback">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDialog('新增')"
          style="width: auto; height: auto"><span style="font-size: 20px">添 加</span></el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-row>
          <el-col :span="12">
            <el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)"><span
                style="font-size: 20px">编辑</span></el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" link :icon="Delete" @click="deleteLeadVisitss(scope.row)"><span
                style="font-size: 20px">删除</span></el-button>
          </el-col>
        </el-row>
      </template>
    </ProTable>
    <leadVisitsDialog ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="Table">
import { ref, reactive } from "vue";
import { Driver } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import ProTable from "@/components/ProTable/index.vue";
import leadVisitsDialog from "@/views/driver/components/leadVisitsDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { getLeadVisitsByKey, addLeadVisits, editLeadVisits, deleteLeadVisits } from "@/api/modules/driver";

if (document.fullscreenElement !== null) {
  document.exitFullscreen();
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
// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons();
// 表格配置项
const columns = reactive<ColumnProps<Driver.leadVisits>[]>([
  { type: "index", label: "#", width: 80 },
  { prop: "startDate", label: "起始时间 " },
  { prop: "endDate", label: "截止时间" },
  { prop: "expert", label: "院公司领导专家", width: 180 },
  { prop: "leader", label: "海外领导" },
  { prop: "followPeople", label: "随行人员" },
  { prop: "area", label: "出访区域" },
  { prop: "task", label: "访问任务  " },
  { prop: "locus", label: "公司及一体化单位领导轨迹重合", width: 340 },
  { prop: "note", label: "备注" },
  { prop: "key", label: "搜索", search: { el: "input" }, isShow: false },
  { prop: "operation", label: "操作", fixed: "right", width: 160 }
]);

// 删除用户信息
const deleteLeadVisitss = async (params: Driver.leadVisits) => {
  await useHandleData(deleteLeadVisits, { id: params.id }, `删除`);
  leadVisits.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const dialogRef = ref<InstanceType<typeof leadVisitsDialog> | null>(null);
const openDialog = (title: string, row: Partial<Driver.leadVisits> = {}) => {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    api: title === "新增" ? addLeadVisits : title === "编辑" ? editLeadVisits : undefined,
    getTableList: leadVisits.value?.getTableList
  };
  dialogRef.value?.acceptParams(params);
};
</script>
