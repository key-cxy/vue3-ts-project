<template>
  <div>
    <router-link to="login">login</router-link>
    <router-link to="main">main</router-link>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App"
});
</script>

<style lang="less"></style>
