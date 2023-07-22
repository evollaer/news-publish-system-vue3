<template>
  <el-container>
    <side-menu></side-menu>
    <el-container direction="vertical">
      <top-header></top-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import TopHeader from '../components/mainbox/topHeader.vue'
import sideMenu from '../components/mainbox/sideMenu.vue';
</script>
<style lang="scss" scoped>

</style>
