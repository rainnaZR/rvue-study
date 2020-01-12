<template>
    <div>
        <Child>
            <!-- 匿名插槽 -->
            <template>我是匿名插槽的内容......</template>
            <!-- 具名插槽 -->
            <template v-slot:header>我是具名插槽header里的内容......</template>
            <!-- 作用域插槽 -->
            <template v-slot:footer="context">我是具名插槽footer里的内容，拿到了子组件作用域插槽的数据：{{context.title}}-{{context.content}}；同时也获取到父组件的数据：{{title}}</template>
        </Child>
    </div>
</template>

<script>
import Child from './child'

export default {
    data(){
        return {
            title: '我是父组件'
        }
    },
    components: {
        Child
    }
}
</script>