<template>
  <div class="nav-header">
    <div class="fold-menu" @click="handleFoldClick">
      <el-icon :size="30" v-if="!isFold"><Fold /></el-icon>
      <el-icon :size="30" v-else><Expand /></el-icon>
    </div>
    <div class="content">
      <my-breadcrumb :breadcrumbs="breadcrumbs"></my-breadcrumb>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import MyBreadcrumb from "@/base-ui/breadcrumb";
import UserInfo from "./user-info.vue";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "NavHeader",
  components: {
    Expand,
    Fold,
    UserInfo,
    MyBreadcrumb
  },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false);

    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };

    const store = useStore();
    const breadcrumbs = computed(() => {
      const route = useRoute();
      const currentPath = route.path;
      const userMenus = store.state.login.userMenus;
      return pathMapBreadcrumbs(userMenus, currentPath);
    });
    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    };
  }
});
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
