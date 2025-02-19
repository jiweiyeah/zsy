<template>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true" size="450px" :title="`${dialogProps.title}`">
    <el-form ref="ruleFormRef" label-width="150px" label-suffix=" :" :rules="rules" :disabled="dialogProps.isView"
      :model="dialogProps.row" :hide-required-asterisk="dialogProps.isView">
      <el-form-item label="主办单位" prop="organizer">
        <el-input v-model="dialogProps.row!.organizer" clearable></el-input>
      </el-form-item>
      <el-form-item label="宣讲主题" prop="preTheme">
        <el-input v-model="dialogProps.row!.preTheme" clearable></el-input>
      </el-form-item>
      <el-form-item label="营销内容" prop="preContent">
        <el-input v-model="dialogProps.row!.preContent" clearable></el-input>
      </el-form-item>
      <el-form-item label="宣讲形式" prop="preFormat">
        <el-input v-model="dialogProps.row!.preFormat" clearable></el-input>
      </el-form-item>
      <el-form-item label="地点" prop="prePlace">
        <el-input v-model="dialogProps.row!.prePlace" clearable></el-input>
      </el-form-item>
      <el-form-item label="涉及油公司" prop="comInvolved">
        <el-input v-model="dialogProps.row!.comInvolved" clearable></el-input>
      </el-form-item>
      <el-form-item label="起始日期" prop="startTime">
        <el-input type="Date" v-model="dialogProps.row!.startTime" clearable></el-input>
      </el-form-item>
      <el-form-item label="结束日期" prop="endTime">
        <el-input type="Date" v-model="dialogProps.row!.endTime" clearable></el-input>
      </el-form-item>
      <el-form-item label="报告&筹备人员" prop="staff">
        <el-input v-model="dialogProps.row!.staff" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="note">
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
  
<script setup lang="ts" name="TechDialog">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Market } from "@/api/interface";

const rules = reactive({
  // organizer: [{ required: true, message: "请填写客户名称" }],
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
  row: Partial<Market.TechTable>;
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
const wayType = [
  { label: "来访", value: 1 },
  { label: "走访", value: 2 },
  { label: "线上", value: 3 },
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
  