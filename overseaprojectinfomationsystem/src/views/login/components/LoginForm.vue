<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="userName">
      <el-input v-model="loginForm.userName" placeholder="用户名：admin">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="userPwd">
      <el-input v-model="loginForm.userPwd" type="password" placeholder="密码：admin" show-password
        autocomplete="new-password">
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-row :gutter="70">
        <el-col :span="14">
          <el-input v-model="loginForm.captcha" placeholder="验证码">
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-image :src="'data:image/png;base64,' + imgurl" alt="Image" @click="handleDraw()" />
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)"> 重置 </el-button>
    <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login(loginFormRef)">
      登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config";
import { getTimeState } from "@/utils";
import { Login } from "@/api/interface";
import { ElNotification } from "element-plus";
import { loginApi, getKaptcha } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";

const router = useRouter();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();

type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  userPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
  captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
});

const loading = ref(false);
const loginForm = reactive<Login.ReqLoginForm>({
  userName: "",
  userPwd: "",
  captcha: ""
});

// login
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      // 1.执行登录接口
      // const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) });
      const data: any = await loginApi({ ...loginForm });
      // userStore.setToken("bqddxxwqmfncffacvbpkuxvwvqrhln");

      userStore.setToken(data.result.token);

      // 2.添加动态路由
      await initDynamicRouter();
      // 3.清空 tabs、keepAlive 数据
      tabsStore.setTabs([]);
      keepAliveStore.setKeepAliveName([]);

      // 4.跳转到首页
      router.push(HOME_URL);
      ElNotification({
        title: getTimeState(),
        message: "欢迎登录 Geeker-Admin",
        type: "success",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  });
};

// resetForm
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const imgurl = ref<string | string[]>();

onMounted(() => {
  draw().then(value => {
    imgurl.value = value;
  });
  // 监听 enter 事件（调用登录）
  document.onkeyup = (e: KeyboardEvent) => {
    e = (window.event as KeyboardEvent) || e;
    if (e.key === "Enter" || e.key === "enter" || e.key === "NumpadEnter") {
      if (loading.value) return;
      login(loginFormRef.value);
    }
  };
});

// 绘制图片
const draw = async () => {
  const img = await getKaptcha()
  return img.result
}

const handleDraw = () => {
  draw().then(value => {
    imgurl.value = value;
  });
}

</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
