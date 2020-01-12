<template>
    <div>
        <!-- 匿名插槽 -->
        <slot></slot>
        <!-- 具名插槽 -->
        <slot name="header"></slot>
        <!-- 作用域插槽 -->
        <slot name="footer" :title="title" :content="content"></slot>
    </div>
</template>

<script>
export default {
    data(){
        return {
            title: '我是子组件slot',
            content: '我传递子组件slot里的数据'
        }
    }
}
</script>