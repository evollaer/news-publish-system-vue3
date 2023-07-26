<template>
  <div>
      <!-- 头部标题 -->
      <el-page-header
          content="创建新闻"
          icon=""
          title="新闻管理"
      />
      <!-- form表单 -->
      <el-form
          ref="newsFormRef"
          :model="newsForm"
          :rules="newsFormRules"
          label-width="80px"
          class="demo-ruleForm"
      >
          <el-form-item
              label="标题"
              prop="title"
          >
              <el-input v-model="newsForm.title" />
          </el-form-item>
          <el-form-item
              label="内容"
              prop="content"
          >
              <!-- 富文本编辑器(自己封装,监听event字段) -->
              <editor @event="handleChange" />
          </el-form-item>

          <el-form-item
              label="类别"
              prop="category"
          >
              <el-select
                  v-model="newsForm.category"
                  class="m-2"
                  placeholder="Select"
                  style="width:100%"
              >
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
              </el-select>
          </el-form-item>

          <el-form-item
              label="封面"
              prop="cover"
          >
              <Upload
                  :avatar="newsForm.cover"
                  @fileChange="handleUploadChange"
              />
          </el-form-item>

          <el-form-item>
              <el-button
                  type="primary"
                  @click="submitForm()"
              >添加新闻</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import editor from "../../components/editor/Editor";
import Upload from "../../components/upload/Upload";
import upload from '../../util/upload'
import {useRouter} from 'vue-router'
const router = useRouter()
const newsFormRef = ref();
const newsForm = reactive({
title: "",// 标题
content: "",// 内容
category: 1, //1 最新动态, 2典型案例 3 通知公告
cover: "",// 封面图片
file: null,// 图片数据(bolb二进制数据)
isPublish: 0 // 0 未发布, 1 已发布
});

// 表单规则验证
const newsFormRules = reactive({
title: [{ required: true, message: "请输入标题", trigger: "blur" }],
content: [{ required: true, message: "请输入内容", trigger: "blur" }],
category: [{ required: true, message: "请选择分类", trigger: "blur" }],
cover: [{ required: true, message: "请上传图片", trigger: "blur" }]
});

//每次editor内容改变的回调(子组件封装,子传父的富文本编辑器内容)
const handleChange = data => {
//   console.log('子传父最新的富文本编辑器内容',data)
newsForm.content = data;
};
//新闻类别
const options = [
{
  label: "最新动态",
  value: 1
},
{
  label: "产品预告",
  value: 2
},
{
  label: "通知公告",
  value: 3
}
];

// 图片回调
const handleUploadChange = (file)=>{
  // 作变量转换,使用原生的url对象,将选中的图片转变成upload可识别的url
  newsForm.cover = URL.createObjectURL(file);
  console.log(newsForm.cover);
  newsForm.file = file
}

// 提交表单数据(通过规则校验)
const submitForm = ()=>{
  // 规则校验成功返回true,反之返回false
  newsFormRef.value.validate(async (valid)=>{
      if(valid){
          console.log(newsForm)
          //后台通信,
          await upload("/adminapi/news/add",newsForm)
          router.push(`/newsManage/list`)
      }
  })
}
</script>
<style lang="scss" scoped>
.el-form {
margin-top: 50px;
}
</style>
