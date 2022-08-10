<template>
  <div class="my-form">
    <el-form :label-width="labelWidth">
      <el-form-item label="Activity name">
        <el-input />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    labelWidth: {
      type: String,
      default: "100px"
    }
  },
  setup() {}
});
</script>

<style lang="less" scoped>
.my-form {
  padding-top: 22px;
}
</style>
