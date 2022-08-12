<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <my-form v-bind="modalConfig" v-model="formData"></my-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import MyForm from "@/base-ui/form";

import { useStore } from "@/store";

export default defineComponent({
  name: "PageModel",
  components: { MyForm },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false);
    const formData = ref<any>({});

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );

    // 确认逻辑
    const store = useStore();
    const handleConfirmClick = () => {
      dialogVisible.value = false;
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          editData: { ...formData.value },
          id: props.defaultInfo.id
        });
      } else {
        // 新增
        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          newData: { ...formData.value }
        });
      }
    };

    return {
      dialogVisible,
      formData,
      handleConfirmClick
    };
  }
});
</script>

<style lang="less" scoped></style>
