<template>
  <div id="myeditor">

  </div>
</template>
<script setup>
import { onMounted,defineEmits,defineProps } from "vue";
import E from "wangeditor";// 引入富文本编辑器
const emit = defineEmits(["event"])// 创建子传父事件监听字段
const props = defineProps({ // 创建props接收父组件传过来的内容(编辑新闻时)
content:String
})
onMounted(() => {
/*
  在onMounted生命周期中选择DOM节点,因为DOM节点是在这个生命周期中创建完成
  的,不能直接引用
*/
const editor = new E("#myeditor");
editor.create();
  //设置初始值(默认是没有content,调用editor.txt.html方法将props传过来的值赋值给富文本编辑器组件)
  props.content &&  editor.txt.html(props.content)

/*
  onchange函数是该富文本编辑器内置的函数,用户操作(鼠标,键盘)使内容变化后,
  会自动触发该函数(官方解释)
*/ 
editor.config.onchange = function(newHtml) {
  // console.log("change 之后最新的 html", newHtml);

  //子传父(通过emit,将最新的html数据传给父组件)
  emit("event",newHtml)
};
});
</script>
