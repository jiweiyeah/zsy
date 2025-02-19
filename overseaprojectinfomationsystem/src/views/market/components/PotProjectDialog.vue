<template>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true" size="450px" :title="`${dialogProps.title}`">
    <el-form ref="ruleFormRef" label-width="200px" label-suffix=" :" :rules="rules" :disabled="dialogProps.isView"
      :model="dialogProps.row" :hide-required-asterisk="dialogProps.isView">
      <el-form-item label="海外中心" prop="centerName">
        <el-input v-model="dialogProps.row!.centerName" clearable></el-input>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="dialogProps.row!.projectName" clearable></el-input>
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-input v-model="dialogProps.row!.country" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户" prop="clientName">
        <el-input v-model="dialogProps.row!.clientName" clearable></el-input>
      </el-form-item>
      <el-form-item label="工作量_平方千米" prop="workloadKm">
        <el-input v-model="dialogProps.row!.workloadKm" clearable></el-input>
      </el-form-item>
      <el-form-item label="工作量_千米" prop="workloadSqkm">
        <el-input v-model="dialogProps.row!.workloadSqkm" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同额（万美元）" prop="contract">
        <el-input v-model="dialogProps.row!.contract" clearable></el-input>
      </el-form-item>
      <el-form-item label="项目类型" prop="conType">
        <el-input v-model="dialogProps.row!.conType" clearable></el-input>
      </el-form-item>
      <el-form-item label="落实程度" prop="fulfilExtent">
        <el-input v-model="dialogProps.row!.fulfilExtent" clearable></el-input>
      </el-form-item>
      <el-form-item label="重要动态" prop="impActive">
        <el-input v-model="dialogProps.row!.impActive" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button style="font-size: 20px;height: auto;width:auto;" @click="dialogVisible = false">取消</el-button>
      <el-button style="font-size: 20px;height: auto;width:auto;" v-show="!dialogProps.isView" type="primary"
        @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>
  
<script setup lang="ts" name="MarkDialog">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Market } from "@/api/interface";

const rules = reactive({
  // clientName: [{ required: true, message: "请填写客户名称" }],
  // date: [{ required: true, message: "请选择时间" }],
  // orgUnit: [{ required: true, message: "请填写组织单位" }],
  // content: [{ required: true, message: "请填写沟通内容" }],
  // way: [{ required: true, message: "请填写方式" }],
  // location: [{ required: true, message: "请填写地点" }],
  // head: [{ required: true, message: "请填写主要负责人" }],
  // participants: [{ required: true, message: "请填写参与人员" }],
  // note: [{ required: true, message: "请填写备注" }],
});

interface DialogProps {
  title: string;
  isView: boolean;
  row: Partial<Market.PotProjectTable>;
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