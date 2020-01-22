<template>
<div>
    <!-- data -->
    <p>{{title}}</p>
    <!-- $parent -->
    <button @click="click">点击触发父组件事件</button>
    <!-- $attrs -->
    <p>接收到父组件传参msg: {{$attrs.msg}}</p>
</div>
</template>

<script>
export default {
    data(){
        return {
            title: 'Child1'
        }
    },
    methods: {
        click(){
            // 方法一：使用this.$parent实现
            // this.$parent.$emit('childClick', 'child1 点击，发送消息，触发事件');
            
            // 方法二：使用this.dispatch实现
            this.dispatch('Communication', 'childClick', 'child1 点击，发送消息，触发事件')
        },
        getTitle(){
            console.log('调用Child1里的getTitle方法，获取标题为：', this.title)
        }
    }   
}
</script>