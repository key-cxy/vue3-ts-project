<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><avatar /></el-icon>
            <span>账号登陆</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link>忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { Avatar, Iphone } from "@element-plus/icons-vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";
export default defineComponent({
  name: "LoginPanel",
  components: {
    Avatar,
    Iphone,
    LoginAccount,
    LoginPhone
  },
  setup() {
    const currentTab = ref("account");
    const isKeepPassword = ref(false);

    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const handleLoginClick = () => {
      if (currentTab.value === "account") {
        accountRef.value?.loginAction(isKeepPassword.value);
      }
    };

    return {
      currentTab,
      isKeepPassword,
      accountRef,
      handleLoginClick
    };
  }
});
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
