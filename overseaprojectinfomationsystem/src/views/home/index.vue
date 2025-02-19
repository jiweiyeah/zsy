<template>
  <div class="home card">
    <img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" />
    <span style="position: absolute; font-size: 60px;">欢迎使用石油海外项目信息管理系统</span>
  </div>
</template>

<script setup lang="ts" name="home">
if (document.fullscreenElement !== null) {
  document.exitFullscreen();
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
