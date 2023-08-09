<template>
    <div>
        111
    </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance()

const global = appContext.config.globalProperties
console.log(appContext);
console.log(global)
console.log(global.$name)//直接当变量
console.log(global.$methodTest(5))//当方法使用


</script>
<style lang="scss" scoped>

</style>
