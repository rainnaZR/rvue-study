<template>
    <div class="m-notice" v-if="isShow">
        <p>{{title}}</p>
        <p>{{content}}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String || Number
        },
        content: {
            type: String || Number
        },
        duration: {
            type: Number,
            default: 2000
        }
    },
    data(){
        return {
            isShow: false
        }
    },
    methods: {
        // 弹窗显示
        show(){
            this.isShow = true
            setTimeout(this.hide, this.duration)
        },
        // 弹窗隐藏
        hide(){
            this.isShow = false
            // 清除自己
            this.remove();
        }
    }
}
</script>

<style scoped>
.m-notice{
    position: fixed;
    left: 50%;
    top: 20px;
    width: 200px;
    background: #f60;
    text-align: center;
    transform: translateX(-50%);
}
</style>
