<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    provide(){
        return {
            form: this // 将当前表单form的实例提供出去
        }
    },
    props: {
        model: {  // 表单数据
            type: Object,
            required: true
        },
        rules: {  // 校验规则
            type: Object
        }
    },
    methods: {
        // 整个表单还需要做统一的全局校验，思路是：获取所有子节点，并依次执行子节点的校验方法，并返回校验结果
        validate(cb){
            const tasks = this.$children   // 获取所有子组件FormItem
                .filter(item => item.prop)  // 把没有prop属性的子节点过滤掉
                .map(item => item.validate())  // 执行子节点的validate()
            
            Promise.all(tasks)
                .then(() => cb(true))
                .catch(() => cb(false));
        }
    }
}
</script>