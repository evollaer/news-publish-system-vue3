<!-- 编辑新闻组件 -->
<template>
    <div>
        <el-page-header content="编辑新闻" @back="handleBack()" title="新闻管理" />
        <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <!-- 通过props传值,将获取回来将要编辑的新闻内容传给富文本编辑器,
                但是from表单的content的初始值为空字符串,也就是说第一次传给富文本编辑器
                的内容是空,就会导致该组件在第一次创建是就是空数据,也就无法再渲染出新闻的
                内容了,这时使用v-if来控制该富文本编辑器的创建,根据from表单的内容(content)
                来控制,就可以解决这个该问题了! -->
                <editor @event="handleChange" :content="newsForm.content" v-if="newsForm.content" />
            </el-form-item>

            <el-form-item label="类别" prop="category">
                <el-select v-model="newsForm.category" class="m-2" placeholder="Select" style="width:100%">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="封面" prop="cover">
                <Upload :avatar="newsForm.cover" @lamchange="handleUploadChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">更新新闻</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import editor from "@/components/editor/Editor";//富文本编辑器
import Upload from "@/components/upload/Upload";
import upload from '../../util/upload'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const route = useRoute()
const newsFormRef = ref();
const newsForm = reactive({
    title: "",
    content: "",
    category: 1, //1 最新动态, 2产品预告 3 通知公告
    cover: "",
    file: null,
    isPublish: 0 // 0 未发布, 1 已发布
});

// 表单校验规则
const newsFormRules = reactive({
    title: [{ required: true, message: "请输入标题", trigger: "blur" }],
    content: [{ required: true, message: "请输入内容", trigger: "blur" }],
    category: [{ required: true, message: "请选择分类", trigger: "blur" }],
    cover: [{ required: true, message: "请上传图片", trigger: "blur" }]
});

//每次editor内容改变的回调
const handleChange = data => {
    // console.log('最新编辑成功的新闻数据',data)
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

// 图片数据回调
const handleUploadChange = (file) => {
    newsForm.cover = URL.createObjectURL(file);
    newsForm.file = file
}

// 提交表单数据
const submitForm = () => {
    // 校验规则是否通过
    newsFormRef.value.validate(async (valid) => {
        if (valid) {
            // console.log('编辑后最新的新闻数据',newsForm)
            //后台通信,
            await upload("/adminapi/news/list", newsForm)
            router.back()// 返回到新闻列表
        }
    })
}

const handleBack = () => {
    router.back()
}
//取当前页面数据
onMounted(async () => {
    // console.log(route.params.id)
    // 获取对应的新闻id数据
    const res = await axios.get(`/adminapi/news/list/${route.params.id}`)
    console.log('对应的新闻id数据:', res.data.data[0])

    // 数据绑定到from表单域中
    Object.assign(newsForm, res.data.data[0])
})
</script>
<style lang="scss" scoped>
.el-form {
    margin-top: 50px;
}
</style>
