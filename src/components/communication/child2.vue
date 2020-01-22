<template>
    <div>
        <!-- data -->
        <p>{{title}}</p>
        <!-- props -->
        <p>接收到父组件传参msg：{{msg}}</p>
        <!-- provice/inject -->
        <p>接收到父组件传参parentName：{{parentName}}</p>
    </div>
</template>

<script>
export default {
    props: ['msg'],
    inject: ['parentName'],
    data(){
        return {
            title: 'Child2'
        }
    },
    mounted(){
        this.$parent.$on('childClick', (msg) => {
            console.log(msg)
        })
    },
    methods: {
        getTitle(){
            console.log('调用Child2里的getTitle方法，获取标题为：', this.title)
        }
    }
}
</script>