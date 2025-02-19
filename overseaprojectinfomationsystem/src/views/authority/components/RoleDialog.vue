<template>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true" size="450px" :title="`${dialogProps.title}`">
    <el-row>
      <el-col :span="6">
        <TreeFilter title="部门列表(多选)" multiple label="name" :request-api="getUserDepartment"
          :default-value="treeFilterValues.departmentId" @change="changeTreeFilter" />
      </el-col>
      <el-col :span="18">
        <el-form ref="ruleFormRef" label-width="150px" label-suffix=" :" :rules="rules" :disabled="dialogProps.isView"
          :model="dialogProps.row" :hide-required-asterisk="dialogProps.isView">
          <el-form-item label="角色名称" prop="note">
            <el-input v-model="dialogProps.row!.note" clearable></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="note">
            <el-input v-model="dialogProps.row!.note" clearable></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button v-show="!dialogProps.isView" type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="RoleDialog">
import { ref, reactive, nextTick, onMounted, watch } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import TreeFilter from "@/components/TreeFilter/index.vue";
import { Market } from "@/api/interface";
import { getUserDepartment } from "@/api/modules/user";

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
      await dialogProps.value.api!({ ...dialogProps.value.row, ...treeFilterValues });
      ElMessage.success({ message: `${dialogProps.value.title}成功！` });
      dialogProps.value.getTableList!();
      dialogVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

// 默认 treeFilter 参数
const treeFilterValues = reactive({ departmentId: ["11"] });
const changeTreeFilter = (val: string[]) => {
  ElMessage.success("请注意查看请求参数变化 🤔");
  treeFilterValues.departmentId = val;
  console.log("已选中", treeFilterValues);
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
