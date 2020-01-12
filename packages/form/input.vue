<template>
    <div>
        <!-- 自定义组件双向绑定：value, @input -->
        <!-- v-bind="$attrs" 展开$attrs-->
        <input :type="type" :value="value" @input="onInput" v-bind="$attrs"/>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,  // 设置为false，避免将属性设置到根元素上
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: String||Number,
            default: ''
        }
    },
    methods: {
        onInput(e){
            // 派发input事件
            this.$emit('input', e.target.value)
            
            // 通知父级执行数据的校验
            this.$parent.$emit('validate');
        }
    }
}
</script>