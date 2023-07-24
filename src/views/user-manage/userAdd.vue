<template>
  <div>
    <el-page-header content="添加用户" :icon="UserFilled" title="用户管理" />

    <!-- 表单控件 -->
    <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password" />
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <!-- 多选框(角色身份,编辑还是管理员) -->
        <el-select v-model="userForm.role" class="m-2" placeholder="Select" style="width:100%">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="个人简介" prop="introduction">
        <el-input v-model="userForm.introduction" type="textarea" />
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <Upload :avatar="userForm.avatar" @evollaerChange="handleChange" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import Upload from "../../components/upload/Upload";
import { useRouter } from 'vue-router'
import { ref, reactive } from "vue";
import upload from "../../util/upload";
import { UserFilled } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
const router = useRouter()
const userFormRef = ref();
const userForm = reactive({
  username: "",
  password: "",
  role: 1,//1、管理员，2编辑
  introduction: "",
  avatar: "",
  file: null,
  gender: 0//
})

const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }]
})

// 角色选项
const options = [
  {
    label: "管理员",
    value: 1
  },
  {
    label: "编辑",
    value: 2
  }
];


//每次选择完图片之后的回调
const handleChange = file => {
  userForm.avatar = URL.createObjectURL(file);
  console.log(userForm.avatar);
  userForm.file = file;
};

//
// 提交表单
const submitForm = () => {
  // 判断表单数据身份通过规则校验(返回true或false)
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      //提交数据到后端
      // console.log(userForm)
      await upload('/adminapi/user/add', userForm)
      ElMessage.success("添加成功")
      router.push(`/userManage/list`)// 路由跳转到用户列表
    }
  })
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>
