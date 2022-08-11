<template>
  <div class="search-page">
    <my-form v-model="formData" v-bind="searchFormConfig">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <el-row justify="end">
          <el-button @click="handleResetBtn">重置</el-button>
          <el-button @click="handleQueryBtn" type="primary">查询</el-button>
        </el-row>
      </template>
    </my-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MyForm from "@/base-ui/form";
export default defineComponent({
  name: "PageSearch",
  components: {
    MyForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? [];
    const formOriginData: any = {};
    formItems.forEach((item: any) => {
      formOriginData[item.field] = "";
    });

    const formData = ref(formOriginData);

    // 重置
    const handleResetBtn = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key];
      }
      emit("resetBtnClick");
    };

    // 查询
    const handleQueryBtn = () => {
      emit("queryBtnClick", formData.value);
    };
    return {
      formData,
      handleResetBtn,
      handleQueryBtn
    };
  }
});
</script>

<style lang="less" scoped>
.header {
  color: red;
}
</style>
