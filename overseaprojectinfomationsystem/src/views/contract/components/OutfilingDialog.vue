<template>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true" size="450px" :title="`${dialogProps.title}`">
    <el-form ref="ruleFormRef" label-width="150px" label-suffix=" :" :rules="rules" :disabled="dialogProps.isView"
      :model="dialogProps.row" :hide-required-asterisk="dialogProps.isView">
      <el-form-item label="海外中心" prop="overseaCenter">
        <el-input v-model="dialogProps.row!.overseaCenter" clearable></el-input>
      </el-form-item>
      <el-form-item label="对方签约单位" prop="counterpartyUnit">
        <el-input v-model="dialogProps.row!.counterpartyUnit" clearable></el-input>
      </el-form-item>
      <el-form-item label="我方签约单位" prop="ourUnit">
        <el-input v-model="dialogProps.row!.ourUnit" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同名称" prop="contractName">
        <el-input v-model="dialogProps.row!.contractName" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同类型" prop="contractType">
        <el-select v-model="dialogProps.row!.contractType" clearable>
          <el-option style="font-size: 20px;" v-for="item in contractType" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="合同金额" prop="contractAmount">
        <el-input v-model="dialogProps.row!.contractAmount" clearable></el-input>
      </el-form-item>
      <el-form-item label="预计签约时间" prop="signingTime">
        <el-input type="Date" v-model="dialogProps.row!.signingTime" clearable></el-input>
      </el-form-item>
      <el-form-item label="审批状态" prop="approvalStatus">
        <el-select v-model="dialogProps.row!.approvalStatus" clearable :disabled="true">
          <el-option style="font-size: 20px;" v-for="item in approvalStatus" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button style="font-size: 20px;height: auto;width:auto;" @click="dialogVisible = false">取消</el-button>
      <el-button style="font-size: 20px;height: auto;width:auto;" v-show="!dialogProps.isView" type="primary"
        @click="handleSubmit">确定</el-button>
      <el-button style="font-size: 20px;height: auto;width:auto;" v-show="!dialogProps.isView" type="primary"
        @click="approvalOutfilings">审批</el-button>
      <el-button style="font-size: 20px;height: auto;width:auto;" v-show="!dialogProps.isView" type="primary"
        @click="rejectOutfilings">拒审</el-button>
    </template>
  </el-dialog>
</template>
  
<script setup lang="ts" name="InfilingDialog">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Contract } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import {
  approvalOutfiling,
  rejectOutfiling
} from "@/api/modules/contract";

const rules = reactive({
  // overseaCenter: [{ required: true, message: "请填写客户名称" }],
  // signingTime: [{ required: true, message: "请选择时间" }],
  // counterpartyUnit: [{ required: true, message: "请填写组织单位" }],
  // ourUnit: [{ required: true, message: "请填写沟通内容" }],
  // contractType: [{ required: true, message: "请填写方式" }],
  // contractName: [{ required: true, message: "请填写地点" }],
  // workload: [{ required: true, message: "请填写主要负责人" }],
  // contractAmount: [{ required: true, message: "请填写参与人员" }],
  // approvalStatus: [{ required: true, message: "请填写备注" }],
});

interface DialogProps {
  title: string;
  isView: boolean;
  row: Partial<Contract.InfilingTable>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const dialogVisible = ref(false);
const dialogProps = ref<DialogProps>({
  isView: false,
  title: "",
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DialogProps) => {
  dialogProps.value = params;
  dialogVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  // console.log(JSON.parse(JSON.stringify(dialogProps.value.api)))
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      // console.log("dialogProps.value.row", dialogProps.value.row)
      await dialogProps.value.api!(dialogProps.value.row);
      ElMessage.success({ message: `${dialogProps.value.title}成功！` });
      dialogProps.value.getTableList!();
      dialogVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

// 审批
const approvalOutfilings = async () => {
  await useHandleData(approvalOutfiling, { id: dialogProps.value.row.id }, `审批`);
  dialogProps.value.getTableList!();
  dialogVisible.value = false;
};

// 拒审
const rejectOutfilings = async () => {
  await useHandleData(rejectOutfiling, { id: dialogProps.value.row.id }, `拒审`);
  dialogProps.value.getTableList!();
  dialogVisible.value = false;
};

const contractType = [
  { label: "处理", value: 1 },
  { label: "解释", value: 2 },
  { label: "油藏", value: 3 },
  { label: "服务", value: 4 },
];
const approvalStatus = [
  { label: "待审批", value: 1 },
  { label: "审批通过", value: 2 },
  { label: "审批不通过", value: 3 },
];
defineExpose({
  acceptParams
});
</script>
  
<style lang="scss" scoped>
.el-form-item--default {
  --font-size: 20px;
}

.el-input {
  font-size: 20px;
}

.el-select {
  --el-font-size-base: 20px;
}
</style>
  