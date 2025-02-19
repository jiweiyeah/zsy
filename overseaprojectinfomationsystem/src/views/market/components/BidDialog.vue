<template>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true" size="450px" :title="`${dialogProps.title}`">
    <el-form ref="ruleFormRef" label-width=" 250px" label-suffix=" :" :rules="rules" :disabled="dialogProps.isView"
      :model="dialogProps.row" :hide-required-asterisk="dialogProps.isView">
      <el-form-item label="地区" prop="area">
        <el-input v-model="dialogProps.row!.area" clearable></el-input>
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-input v-model="dialogProps.row!.country" clearable></el-input>
      </el-form-item>
      <el-form-item label="甲方" prop="lessor">
        <el-input v-model="dialogProps.row!.lessor" clearable></el-input>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="dialogProps.row!.projectName" clearable></el-input>
      </el-form-item>
      <el-form-item label="邀标时间" prop="inviteTime">
        <el-input type="Date" v-model="dialogProps.row!.inviteTime" clearable></el-input>
      </el-form-item>
      <el-form-item label="闭标时间" prop="closeTime">
        <el-input type="Date" v-model="dialogProps.row!.closeTime" clearable></el-input>
      </el-form-item>
      <el-form-item label="业务类别" prop="busidateType">
        <el-checkbox-group v-model="dialogProps.selected" clearable>
          <el-checkbox style="--el-checkbox-font-size: 20px;" v-for="item in busidateType" :label="item.value"
            :key="item.value">{{
              item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="投标主体" prop="tenderBody">
        <el-input v-model="dialogProps.row!.tenderBody" clearable></el-input>
      </el-form-item>
      <el-form-item label="是否总部支持" prop="support">
        <el-select v-model="dialogProps.row!.support" clearable>
          <el-option style="font-size: 20px;" v-for="item in yesno" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="招标方式" prop="tenderMethod">
        <el-select v-model="dialogProps.row!.tenderMethod" clearable>
          <el-option style="font-size: 20px;" v-for="item in tenderMethod" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="评标动态" prop="evaDynamics">
        <el-select v-model="dialogProps.row!.evaDynamics" clearable>
          <el-option style="font-size: 20px;" v-for="item in evaDynamics" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="中/落/弃标时间" prop="date">
        <el-input type="Date" v-model="dialogProps.row!.date" clearable></el-input>
      </el-form-item>
      <el-form-item label="落/弃标原因" prop="reason">
        <el-input v-model="dialogProps.row!.reason" clearable></el-input>
      </el-form-item>
      <el-form-item label="预计合同额（万美元）" prop="amount">
        <el-input v-model="dialogProps.row!.amount" clearable></el-input>
      </el-form-item>
      <el-form-item label="工作量" prop="workload">
        <el-input v-model="dialogProps.row!.workload" clearable></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="univalent">
        <el-input v-model="dialogProps.row!.univalent" clearable></el-input>
      </el-form-item>
      <el-form-item label="总价（万美元）" prop="prive">
        <el-input v-model="dialogProps.row!.prive" clearable></el-input>
      </el-form-item>
      <el-form-item label="是否一体化" prop="integration">
        <el-select v-model="dialogProps.row!.integration" clearable>
          <el-option style="font-size: 20px;" v-for="item in yesno" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
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
  row: Partial<Market.BidTable>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
  selected?: number[]
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
  dialogProps.value.row.busidateType = sigtostr(dialogProps.value.selected)
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await dialogProps.value.api!(dialogProps.value.row);
      ElMessage.success({ message: `${dialogProps.value.title}成功！` });
      dialogProps.value.getTableList!();
      dialogVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

const busidateType = [
  { label: "处理", value: 1 },
  { label: "解释", value: 2 },
  { label: "油藏", value: 3 },
  { label: "科研", value: 4 },
  { label: "服务", value: 5 },
];

const yesno = [
  { label: "是", value: 1 },
  { label: "否", value: 2 },
];

const tenderMethod = [
  { label: "投标", value: 1 },
  { label: "议标", value: 2 },
];

const evaDynamics = [
  { label: "中标", value: 1 },
  { label: "落标", value: 2 },
  { label: "废标", value: 3 },
  { label: "弃标", value: 4 },
  { label: "评标", value: 5 },
];

const sigtostr = (num: number[] | undefined) => {
  let res = ""
  if (num == undefined) return
  for (let i = 0; i < num.length; i++) {
    res = res + num[i].toString()
  }
  return res
}

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
  