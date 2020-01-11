<template>
<div>
    <!-- $parent -->
    <button @click="click">Child1: {{title}}</button>
    <!-- $attrs -->
    <p>接收到父组件的参数msg: {{$attrs.msg}}</p>
</div>
</template>

<script>
export default {
    data(){
        return {
            title: 'Child1 title'
        }
    },
    methods: {
        click(){
            this.$parent.$emit('child1Click', 'child1 点击，发送消息，触发事件')
        },
        getTitle(){
            console.log('调用Child1里的getTitle方法', this.title)
        }
    }   
}
</script>