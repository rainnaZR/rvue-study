<template>
    <div>
        <p>Child2: {{title}}</p>
        <!-- provice/inject -->
        <p>获取来自父组件的名称：{{parentName}}</p>
    </div>
</template>

<script>
export default {
    inject: ['parentName'],
    data(){
        return {
            title: 'Child2 title'
        }
    },
    mounted(){
        this.$parent.$on('child1Click', (msg) => {
            console.log(msg)
        })
    },
    methods: {
        getTitle(){
            console.log('调用Child2里的getTitle方法', this.title)
        }
    }
}
</script>