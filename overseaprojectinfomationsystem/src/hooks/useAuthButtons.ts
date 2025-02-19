import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";

/**
 * @description 页面按钮权限
 * */
export const useAuthButtons = () => {
  const route = useRoute();
  // console.log("useAuthButtonsroute",JSON.parse(JSON.stringify(route)))
  const authStore = useAuthStore();
  // console.log("useAuthButtonsauthStore",JSON.parse(JSON.stringify(authStore)))
  const authButtons = authStore.authButtonListGet["useProTable"] || [];
  // console.log("authButtons",authButtons)
  const BUTTONS = computed(() => {
    let currentPageAuthButton: { [key: string]: boolean } = {};
    authButtons.forEach(item => (currentPageAuthButton[item] = true));
    return currentPageAuthButton;
  });

  return {
    BUTTONS
  };
};
