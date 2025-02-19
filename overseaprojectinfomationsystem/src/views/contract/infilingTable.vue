<template>
  <div class="table-box">
    <ProTable ref="infilingTable" :columns="columns" :request-api="getTableList" :init-param="initParam"
      :data-callback="dataCallback">
      <!-- 表格 header 按钮 -->
      <template #tableHeader="">
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDialog('新增')"
          style="width: auto; height: auto"><span style="font-size: 20px">添 加</span></el-button>
      </template>
      <!-- 合同类型 -->
      <template #contractType="scope">
        <!-- {{ contractType[scope.row.contractType - 1].label }} -->
        {{ showContractType(scope.row.contractType) }}
      </template>
      <!-- 收入合同来源 -->
      <template #incontractSource="scope">
        <!-- {{ contractType[scope.row.contractType - 1].label }} -->
        {{ showIncontractSource(scope.row.incontractSource) }}
      </template>
      <!-- 审批状态 -->
      <template #approvalStatus="scope">
        <!-- {{ approvalStatus[scope.row.approvalStatus - 1].label }} -->
        {{ showApprovalStatus(scope.row.approvalStatus) }}
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-row>
          <el-col :span="12">
            <el-button type="primary" link :icon="EditPen" @click="openDialog('编辑', scope.row)"><span
                style="font-size: 20px">编辑</span></el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" link :icon="Delete" @click="deleteInfilings(scope.row)"><span
                style="font-size: 20px">删除</span></el-button>
          </el-col>
        </el-row>
      </template>
    </ProTable>
    <InfilingDialog ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="Table">
import { ref, reactive } from "vue";
import { Contract } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import ProTable from "@/components/ProTable/index.vue";
import InfilingDialog from "@/views/contract/components/InfilingDialog.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { getInfilingList, addInfiling, editInfiling, deleteInfiling } from "@/api/modules/contract";

if (document.fullscreenElement !== null) {
  document.exitFullscreen();
}
// ProTable 实例
const infilingTable = ref<ProTableInstance>();
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
  return await getInfilingList(params);
};

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons();

// 表格配置项
const columns = reactive<ColumnProps<Contract.InfilingTable>[]>([
  { type: "index", label: "#", width: 80 },
  {
    prop: "overseaCenter",
    label: "海外中心",
    width: 120
  },
  { prop: "counterpartyUnit", label: "对方签约单位", width: 180 },
  { prop: "ourUnit", label: "我方签约单位", width: 180 },
  { prop: "contractName", label: "合同名称", width: 120 },
  { prop: "contractType", label: "合同类型", width: 120 },
  { prop: "incontractSource", label: "收入合同来源", width: 180 },
  { prop: "workload", label: "工作量", width: 100 },
  { prop: "contractAmount", label: "合同金额", width: 120 },
  { prop: "signingTime", label: "预计签约时间", width: 180 },
  { prop: "approvalStatus", label: "审批状态", width: 160 },
  { prop: "key", label: "搜索", search: { el: "input" }, isShow: false },
  { prop: "operation", label: "操作", fixed: "right", width: 160 }
]);

// 删除用户信息
const deleteInfilings = async (params: Contract.InfilingTable) => {
  await useHandleData(deleteInfiling, { id: params.id }, `删除`);
  infilingTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const dialogRef = ref<InstanceType<typeof InfilingDialog> | null>(null);
const openDialog = (title: string, row: Partial<Contract.InfilingTable> = {}) => {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    api: title === "新增" ? addInfiling : title === "编辑" ? editInfiling : undefined,
    getTableList: infilingTable.value?.getTableList
  };
  dialogRef.value?.acceptParams(params);
};

const contractType = [
  { label: "处理", value: 1 },
  { label: "解释", value: 2 },
  { label: "油藏", value: 3 },
  { label: "服务", value: 4 }
];
const incontractSource = [
  { label: "公开招标", value: 1 },
  { label: "邀请招标", value: 2 },
  { label: "直接委托", value: 3 }
];
const approvalStatus = [
  { label: "待审批", value: 1 },
  { label: "审批通过", value: 2 },
  { label: "审批不通过", value: 3 }
];

const showContractType = (num: number) => {
  return num ? contractType[num - 1].label : undefined;
};
const showIncontractSource = (num: number) => {
  return num ? incontractSource[num - 1].label : undefined;
};
const showApprovalStatus = (num: number) => {
  return num ? approvalStatus[num - 1].label : undefined;
};
</script>
