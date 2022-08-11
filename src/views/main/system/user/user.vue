<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import pageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

import { usePageSearch } from "@/hooks/use-page-search";

export default defineComponent({
  name: "user",
  components: {
    pageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();
    const handleNewData = () => {
      console.log("新增");
    };
    const handleEditData = (item: any) => {
      console.log(item, "修改");
    };
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData
    };
  }
});
</script>

<style scoped></style>
