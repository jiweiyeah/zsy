<template>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true" size="450px" :title="`${dialogProps.title}`">
    <el-form ref="ruleFormRef" label-width="220px" label-suffix=" :" :rules="rules" :disabled="dialogProps.isView"
      :model="dialogProps.row" :hide-required-asterisk="dialogProps.isView">
      <el-form-item label="甲方" prop="lessor">
        <el-input v-model="dialogProps.row!.lessor" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同号" prop="contractNum">
        <el-input v-model="dialogProps.row!.contractNum" clearable></el-input>
      </el-form-item>
      <el-form-item label="我方签约公司名称" prop="ourCompany">
        <el-input v-model="dialogProps.row!.ourCompany" clearable></el-input>
      </el-form-item>
      <el-form-item label="我方合同签字人姓名" prop="ourSignatory">
        <el-input v-model="dialogProps.row!.ourSignatory" clearable></el-input>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="dialogProps.row!.projectName" clearable></el-input>
      </el-form-item>
      <el-form-item label="工作性质" prop="workNature">
        <el-select v-model="dialogProps.row!.workNature" clearable>
          <el-option style="font-size: 20px;" v-for="item in workNature" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否一体化项目" prop="integration">
        <el-select v-model="dialogProps.row!.integration" clearable>
          <el-option style="font-size: 20px;" v-for="item in integration" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="合同额(万美元)" prop="contractAmount">
        <el-input v-model="dialogProps.row!.contractAmount" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同签订日期" prop="signTime">
        <el-input type="Date" v-model="dialogProps.row!.signTime" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同起始日期" prop="startTime">
        <el-input type="Date" v-model="dialogProps.row!.startTime" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同截止日期" prop="endTime">
        <el-input type="Date" v-model="dialogProps.row!.endTime" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button style="font-size: 20px;height: auto;width:auto;" @click="dialogVisible = false">取消</el-button>
      <el-button style="font-size: 20px;height: auto;width:auto;" v-show="!dialogProps.isView" type="primary"
        @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>
  
<script setup lang="ts" name="ManageDialog">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Contract } from "@/api/interface";

const rules = reactive({
  // lessor: [{ required: true, message: "请填写客户名称" }],
  // signingTime: [{ required: true, message: "请选择时间" }],
  // contractNum: [{ required: true, message: "请填写组织单位" }],
  // ourCompany: [{ required: true, message: "请填写沟通内容" }],
  // contractType: [{ required: true, message: "请填写方式" }],
  // ourSignatory: [{ required: true, message: "请填写地点" }],
  // workload: [{ required: true, message: "请填写主要负责人" }],
  // contractAmount: [{ required: true, message: "请填写参与人员" }],
  // approvalStatus: [{ required: true, message: "请填写备注" }],
});

interface DialogProps {
  title: string;
  isView: boolean;
  row: Partial<Contract.ManageTable>;
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
const workNature = [
  { label: "处理", value: 1 },
  { label: "解释", value: 2 },
  { label: "油藏", value: 3 },
  { label: "科研", value: 4 },
  { label: "服务", value: 5 },
];
const integration = [
  { label: "是", value: 1 },
  { label: "否", value: 2 },
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
  