<template>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true" size="450px" :title="`${dialogProps.title}`">
    <el-form ref="ruleFormRef" label-width="220px" label-suffix=" :" :rules="rules" :disabled="dialogProps.isView"
      :model="dialogProps.row" :hide-required-asterisk="dialogProps.isView">
      <el-form-item label="地区" prop="area">
        <el-input v-model="dialogProps.row!.area" clearable></el-input>
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-input v-model="dialogProps.row!.country" clearable></el-input>
      </el-form-item>
      <el-form-item label="工区名称" prop="workareaName">
        <el-input v-model="dialogProps.row!.workareaName" clearable></el-input>
      </el-form-item>
      <el-form-item label="甲方" prop="lessor">
        <el-input v-model="dialogProps.row!.lessor" clearable></el-input>
      </el-form-item>
      <el-form-item label="我方签约公司名称" prop="ourCompany">
        <el-input v-model="dialogProps.row!.ourCompany" clearable></el-input>
      </el-form-item>
      <el-form-item label="我方合同签字人姓名" prop="signatoryName">
        <el-input v-model="dialogProps.row!.signatoryName" clearable></el-input>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="dialogProps.row!.projectName" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同号" prop="contractNum">
        <el-input v-model="dialogProps.row!.contractNum" clearable></el-input>
      </el-form-item>
      <el-form-item label="工作性质" prop="workNature">
        <el-checkbox-group v-model="dialogProps.selected" clearable>
          <el-checkbox v-for="item in workNature" :label="item.value" :key="item.value">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否一体化项目" prop="integration">
        <el-select v-model="dialogProps.row!.integration" clearable>
          <el-option style="font-size: 20px" v-for="item in yesno" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="工区地表类型" prop="surfaceType">
        <el-select v-model="dialogProps.row!.surfaceType" clearable>
          <el-option style="font-size: 20px" v-for="item in surfaceType" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否PSTM" prop="pstm">
        <el-select v-model="dialogProps.row!.pstm" clearable>
          <el-option style="font-size: 20px" v-for="item in yesno" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否PSDM" prop="psdm">
        <el-input v-model="dialogProps.row!.psdm" clearable></el-input>
      </el-form-item>
      <el-form-item label="工作量2D" prop="workload_2d">
        <el-input v-model="dialogProps.row!.workload_2d" clearable></el-input>
      </el-form-item>
      <el-form-item label="工作量3D" prop="workload_3d">
        <el-input v-model="dialogProps.row!.workload_3d" clearable></el-input>
      </el-form-item>
      <el-form-item label="新签合同额(万美元)" prop="contractAmount">
        <el-input v-model="dialogProps.row!.contractAmount" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同签订日期" prop="signDate">
        <el-input type="Date" v-model="dialogProps.row!.signDate" clearable></el-input>
      </el-form-item>
      <el-form-item label="合同关闭日期" prop="closeDate">
        <el-input type="Date" v-model="dialogProps.row!.closeDate" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="dialogProps.row!.note" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button style="width: auto; height: auto; font-size: 20px" @click="dialogVisible = false">取消</el-button>
      <el-button style="width: auto; height: auto; font-size: 20px" v-show="!dialogProps.isView" type="primary"
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
  row: Partial<Market.NewSignTable>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
  selected?: number[];
}

const dialogVisible = ref(false);
const dialogProps = ref<DialogProps>({
  isView: false,
  title: "",
  row: {},
  selected: []
});

// 接收父组件传过来的参数
const acceptParams = (params: DialogProps) => {
  dialogProps.value = params;
  dialogVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  dialogProps.value.row.workNature = sigtostr(dialogProps.value.selected);
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
  { label: "服务", value: 5 }
];

const yesno = [
  { label: "是", value: 1 },
  { label: "否", value: 2 }
];

const surfaceType = [
  { label: "海洋", value: 1 },
  { label: "过渡带", value: 2 },
  { label: "陆地", value: 3 }
];

const sigtostr = (num: number[] | undefined) => {
  let res = "";
  if (num == undefined) return;
  for (let i = 0; i < num.length; i++) {
    res = res + num[i].toString();
  }
  return res;
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
