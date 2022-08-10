<template>
  <div class="user">
    <h2>user</h2>
    <page-search :searchFormConfig="searchFormConfig"> </page-search>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyForm from "@/base-ui/form";
import pageSearch from "@/components/page-search/src/page-search.vue";

import { searchFormConfig } from "./config/search.config";
export default defineComponent({
  name: "user",
  components: { pageSearch },
  setup() {
    return {
      searchFormConfig
    };
  }
});
</script>

<style scoped></style>
