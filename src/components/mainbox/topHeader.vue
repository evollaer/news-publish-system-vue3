<template>
  <!-- 顶部区域 -->
  <el-header>
    <div class="left">
      <el-icon @click="handleCollapsed">
        <Menu />
      </el-icon>
      <span style="margin-left:10px;">企业门户网站后台管理系统</span>
    </div>
    <div class="right">

      <span>欢迎 {{ store.state.userInfo.username }} 回来</span>
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link" style="width:30px">
          <img :src="avatarUrl" class="avatar" alt="" v-if="store.state.userInfo.avatar">
          <el-icon :size="30" color="white" v-else>
            <user />
          </el-icon>
        </span>
        <!-- 设置下拉菜单的列表 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from 'vue-router'
import { Menu, User } from "@element-plus/icons-vue";// 引入图标
const store = useStore();
const router = useRouter()
// 收放侧边栏
const handleCollapsed = () => {
  store.commit("changeCollapsed");
};

const handleCenter = () => {
  router.push("/center")
}

// 显示头像(默认?数据库用户数据)
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);

// 退出登录
const handleLogout = () => {
  localStorage.removeItem("token")// 清除用户token
  store.commit("clearUserInfo")// 清除vuex中的用户数据
  router.push("/login")
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.left,
.right {
  display: flex;
}

.left {
  i {
    margin: auto;
    cursor: pointer;
  }
}

.right {
  .el-dropdown {
    margin: auto;
    width: 30px;
    margin-left: 20px;
  }
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
