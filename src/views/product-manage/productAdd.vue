<!-- 添加产品组件 -->
<template>
  <div>
      <el-page-header
          content="添加产品"
          icon=""
          title="产品管理"
      />
      <el-form
          ref="productFormRef"
          :model="productForm"
          :rules="productFormRules"
          label-width="120px"
          class="demo-ruleForm"
      >
          <el-form-item
              label="产品名称"
              prop="title"
          >
              <el-input v-model="productForm.title" />
          </el-form-item>

          <el-form-item
              label="产品简要描述"
              prop="introduction"
          >
              <el-input
                  v-model="productForm.introduction"
                  type="textarea"
              />
          </el-form-item>

          <el-form-item
              label="产品详细描述"
              prop="detail"
          >
              <el-input
                  v-model="productForm.detail"
                  type="textarea"
              />
          </el-form-item>

          <!-- 图片上传 -->
          <el-form-item
              label="产品图片"
              prop="cover"
          >
              <Upload
                  :avatar="productForm.cover"
                  @evollaerChange="handleChange"
              />
          </el-form-item>

          <el-form-item>
              <el-button
                  type="primary"
                  @click="submitForm()"
              >添加产品</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Upload from "@/components/upload/Upload";
import upload from '../../util/upload'
import {useRouter} from 'vue-router'
const router = useRouter()// 调用全局路由
const productFormRef = ref();
const productForm = reactive({
title: "",
introduction: "",
detail: "",
cover: "",
file: null,
});

// 表单验证规则
const productFormRules = reactive({
title: [{ required: true, message: "请输入名字", trigger: "blur" }],
introduction: [{ required: true, message: "请输入简要描述", trigger: "blur" }],
detail: [{ required: true, message: "请输入详细描述", trigger: "blur" }],
cover: [{ required: true, message: "请上传产品图片", trigger: "blur" }]
});


//每次选择完图片之后的回调
const handleChange = file => {
productForm.cover = URL.createObjectURL(file);
productForm.file = file;
};
const submitForm = ()=>{
  productFormRef.value.validate(async (valid)=>{
      if(valid){
          //提交数据到后端
          // console.log('添加的产品数据',productForm)
          await upload("/adminapi/product/add",productForm)
          router.push(`/productManage/list`)// 跳转到产品列表页面
      }
  })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
margin-top: 50px;
}
</style>
