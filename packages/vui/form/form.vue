<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    componentName: 'Form',
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
    created(){
        this.fileds = [];

        // 监听事件，通知Form新增当前FormItem的实例，目的是用于在Form做全局校验时遍历FormItem实例
        this.$on('vui.form.addFiled', item => {
            this.fileds.push(item);
        })
        console.log('this.fileds', this.fileds)
    },
    methods: {
        // 整个表单还需要做统一的全局校验，思路是：获取所有子节点，并依次执行子节点的校验方法，并返回校验结果
        validate(cb){
            // 方法一：使用this.$childrem实现
            // const tasks = this.$children   // 获取所有子组件FormItem
            //     .map(item => item.validate())  // 执行子节点的validate()

            // 方法二：使用this.dispatch实现
            const tasks = this.fileds   // 获取所有子组件FormItem
                .map(item => item.validate())  // 执行子节点的validate()
            
            Promise.all(tasks)
                .then(() => cb(true))
                .catch(() => cb(false));
        }
    }
}
</script>