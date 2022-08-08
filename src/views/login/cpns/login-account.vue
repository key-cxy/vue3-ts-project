<template>
  <div class="login-account">
    <el-form
      ref="formRef"
      :model="account"
      :rules="rules"
      label-width="60px"
      class="demo-dynamic"
    >
      <el-form-item prop="name" label="账号">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref, defineComponent } from "vue";

import { rules } from "../config/account-config";
import { ElMessage } from "element-plus";
import type { ElForm } from "element-plus";

import { useStore } from "@/store";

import local from "@/utils/cache";

export default defineComponent({
  setup() {
    const store = useStore();

    const account = reactive({
      name: local.getCache("name") ?? "",
      password: local.getCache("password") ?? ""
    });

    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            local.setCache("name", account.name);
            local.setCache("password", account.password);
          } else {
            local.deleteCache("name");
            local.deleteCache("password");
          }
          store.dispatch("login/accountLoginAction", { ...account });
        } else {
          ElMessage.error("请完善登录信息");
        }
      });
    };

    return {
      rules,
      account,
      formRef,
      loginAction
    };
  }
});
</script>

<style lang="less" scoped></style>
