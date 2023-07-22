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
              <span class="el-dropdown-link">
                  <el-icon :size="30" color="white">
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
import {useRouter} from 'vue-router'
import { Menu ,User} from "@element-plus/icons-vue";// 引入图标
const store = useStore();
const router = useRouter()
// 收放侧边栏
const handleCollapsed = () => {
store.commit("changeCollapsed");
};

const handleCenter = ()=>{
  router.push("/center")
}

// 退出登录
const handleLogout = ()=>{
  localStorage.removeItem("token")// 清除用户token
  store.commit("clearUserInfo")// 清除vuex中的用户数据
  router.push("/login")
}
</script>

<style lang="scss" scoped>
.el-header{
  background-color: #2d3a4b;
  color:white;
  width:100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.left,.right{
  display: flex;
}

.left{
  i{
      margin:auto;
      cursor: pointer;
  }
}
.right{
  .el-dropdown{
      margin:auto;
  }
}
</style>
