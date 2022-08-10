<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          style="margin-right: 5px"
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        {{ username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="layout">用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";

import { useStore } from "@/store";
// import { useRouter } from "vue-router";

// import local from "@/utils/cache";
export default defineComponent({
  name: "UserInfo",
  components: { ArrowDown },
  setup() {
    const store = useStore();
    const username = computed(() => store.state.name);

    // const router = useRouter();
    const layout = () => {
      // router.replace("/login");
      // local.deleteCache("token");
    };
    return {
      username,
      layout
    };
  }
});
</script>
<style lang="less" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
