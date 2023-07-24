<!-- 编辑产品 -->
<template>
    <div>
        <el-page-header
            content="编辑产品"
            @back="handleBack()"
            title="产品管理"
        />

        <el-form
            ref="productFormRef"
            :model="productForm"
            :rules="productFormRules"
            label-width="80px"
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

            <el-form-item
                label="产品图片"
                prop="cover"
            >
                <Upload
                    :avatar="productForm.cover"
                    @lamchange="handleChange"
                />
            </el-form-item>

            <el-form-item>
                <el-button
                    type="primary"
                    @click="submitForm()"
                >更新产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Upload from "@/components/upload/Upload";
import upload from "../../util/upload";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
const productFormRef = ref();
const productForm = reactive({
  title: "",
  introduction: "",
  detail: "",
  cover: "",
  file: null
});

// 表单校验规则
const productFormRules = reactive({
  title: [{ required: true, message: "请输入名字", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入简要描述", trigger: "blur" }
  ],
  detail: [{ required: true, message: "请输入详细描述", trigger: "blur" }],
  cover: [{ required: true, message: "请上传产品图片", trigger: "blur" }]
});

//每次选择完图片之后的回调
const handleChange = file => {
  productForm.cover = URL.createObjectURL(file);
  productForm.file = file;
};
const router = useRouter();
const route = useRoute();
const submitForm = () => {
  productFormRef.value.validate(async valid => {
    if (valid) {
      //提交数据到后端
      // console.log('编辑后的产品数据',productForm)
      await upload("/adminapi/product/list", productForm);// 提交网络请求
      router.push(`/product-manage/productlist`);// 返回产品列表
    }
  });
};

// 路由回退(history模式)
const handleBack = () => {
  router.back();
};

// 生命周期挂载获取对应的产品id数据
onMounted(() => {
  getData();
});

// 获取对应id的产品数据
const getData = async () => {
    console.log(route.query);
  const res = await axios.get(`/adminapi/product/list/${route.query.id}`);
//   console.log('对应id的产品数据',res.data.data[0]);
  Object.assign(productForm, res.data.data[0]);
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>
