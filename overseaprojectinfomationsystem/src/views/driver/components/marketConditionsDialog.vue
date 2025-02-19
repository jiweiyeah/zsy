<template>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true" size="450px" :title="`${dialogProps.title}`">
    <el-form ref="ruleFormRef" label-width="150px" label-suffix=" :" :rules="rules" :disabled="dialogProps.isView"
      :model="dialogProps.row" :hide-required-asterisk="dialogProps.isView">
      <el-form-item label="海外中心" prop="overseaCenter">
        <el-input v-model="dialogProps.row!.overseaCenter" clearable></el-input>
      </el-form-item>
      <el-form-item label="年度指标" prop="annualMetrics">
        <el-input v-model="dialogProps.row!.annualMetrics" clearable></el-input>
      </el-form-item>
      <el-form-item label="时间进度" prop="timeSchedule">
        <el-input v-model="dialogProps.row!.timeSchedule" clearable></el-input>
      </el-form-item>
      <el-form-item label="已完成" prop="done">
        <el-input v-model="dialogProps.row!.done" clearable></el-input>
      </el-form-item>
      <el-form-item label="去年同期" prop="lastYear">
        <el-input v-model="dialogProps.row!.lastYear" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button style="font-size: 20px;height: auto;width:auto;" @click="dialogVisible = false">取消</el-button>
      <el-button style="font-size: 20px;height: auto;width:auto;" v-show="!dialogProps.isView" type="primary"
        @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>
  
<script setup lang="ts" name="InfilingDialog">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Driver } from "@/api/interface";

const rules = reactive({

});

interface DialogProps {
  title: string;
  isView: boolean;
  row: Partial<Driver.marketConditions>;
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
  console.log("dialogProps", dialogProps.value)
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
</style>