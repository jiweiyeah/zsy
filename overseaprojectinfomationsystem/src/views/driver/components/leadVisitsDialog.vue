<template>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true" size="450px" :title="`${dialogProps.title}`">
    <el-form ref="ruleFormRef" label-width="200px" label-suffix=" :" :rules="rules" :disabled="dialogProps.isView"
      :model="dialogProps.row" :hide-required-asterisk="dialogProps.isView">
      <el-form-item label="起始时间" prop="startDate">
        <el-input style="background-color: aquamarine;" type="Date" v-model="dialogProps.row!.startDate"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="截止时间" prop="endDate">
        <el-input type="Date" v-model="dialogProps.row!.endDate" clearable></el-input>
      </el-form-item>
      <el-form-item label="院公司领导专家" prop="expert">
        <el-input v-model="dialogProps.row!.expert" clearable></el-input>
      </el-form-item>
      <el-form-item label="海外领导" prop="leader">
        <el-input v-model="dialogProps.row!.leader" clearable></el-input>
      </el-form-item>
      <el-form-item label="随行人员" prop="followPeople">
        <el-input v-model="dialogProps.row!.followPeople" clearable></el-input>
      </el-form-item>
      <el-form-item label="出访区域" prop="area">
        <el-input v-model="dialogProps.row!.area" clearable></el-input>
      </el-form-item>
      <el-form-item label="访问任务" prop=" task">
        <el-input v-model="dialogProps.row!.task" clearable></el-input>
      </el-form-item>
      <el-form-item label="公司及一体化单位领导轨迹重合" prop="locus">
        <el-input style="height: 64px;" v-model="dialogProps.row!.locus" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注 " prop="note">
        <el-input v-model="dialogProps.row!.note" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button style="font-size: 20px;height: auto;width:auto;" @click="dialogVisible = false">取消</el-button>
      <el-button style="font-size: 20px;height: auto;width:auto;" v-show="!dialogProps.isView" type="primary"
        @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>
  
<script setup lang="ts" name="leaderVisitsDialog">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Driver } from "@/api/interface";

const rules = reactive({

});

interface DialogProps {
  title: string;
  isView: boolean;
  row: Partial<Driver.leadVisits>;
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
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await dialogProps.value.api!(dialogProps.value.row);
      ElMessage.success({ message: `${dialogProps.value.title}成功！` });
      console.log(dialogProps.value);
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

:deep(.el-input__wrapper) {
  background-color: #df2929;
}
</style>