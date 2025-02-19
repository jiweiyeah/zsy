<template>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true" size="450px" :title="`${dialogProps.title}`">
    <el-form ref="ruleFormRef" label-width="150px" label-suffix=" :" :rules="rules" :disabled="dialogProps.isView"
      :model="dialogProps.row" :hide-required-asterisk="dialogProps.isView">
      <el-form-item label="客户名称" prop="clientName">
        <el-input v-model="dialogProps.row!.clientName" clearable></el-input>
      </el-form-item>
      <el-form-item label="时间" prop="date">
        <el-input type="Date" v-model="dialogProps.row!.date" clearable></el-input>
      </el-form-item>
      <el-form-item label="组织单位" prop="orgUnit">
        <el-input v-model="dialogProps.row!.orgUnit" clearable></el-input>
      </el-form-item>
      <el-form-item label="沟通内容" prop="content">
        <el-input v-model="dialogProps.row!.content" clearable></el-input>
      </el-form-item>
      <el-form-item label="方式" prop="way">
        <el-select v-model="dialogProps.row!.way" clearable>
          <el-option style="font-size: 20px;" v-for="item in wayType" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="地点" prop="location">
        <el-input v-model="dialogProps.row!.location" clearable></el-input>
      </el-form-item>
      <el-form-item label="主要负责人" prop="head">
        <el-input v-model="dialogProps.row!.head" clearable></el-input>
      </el-form-item>
      <el-form-item label="参与人员" prop="participants">
        <el-input v-model="dialogProps.row!.participants" clearable></el-input>
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
  row: Partial<Market.MarkTable>;
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
  