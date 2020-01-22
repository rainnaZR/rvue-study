<template>
    <div>
        <!-- label -->
        <label v-if="label">{{label}}</label>
        <!-- 插槽，包装内容-->
        <slot></slot>
        <!-- error错误提示 -->
        <div v-if="error">{{error}}</div>
    </div>
</template>

<script>
import Schema from 'async-validator'

export default {
    componentName: 'FormItem',
    inject: ['form'], //form组件使用provide提供数据，formItem使用inject获取数据
    props: {
        label: {  // label标签
            type: String
        },
        prop: {  // 字段属性名，用于执行错误校验
            type: String
        }
    },
    data(){
        return {
            error: ''
        }
    },
    mounted(){
        this.$on('validate', () => {
            this.validate();
        })

        // 把没有prop属性的节点过滤掉，比如button等没有prop属性的FormItem实例
        if(!this.prop) return;

        // 派发事件，并通知Form新增当前FormItem的实例，用于在Form做全局校验时遍历FormItem实例
        this.dispatch('Form', 'vui.form.addFiled', [this])
    },
    methods: {
        validate(){
            // 校验规则
            const rules = this.form.rules[this.prop];
            // 需要执行校验的数据
            const value = this.form.model[this.prop];

            // 校验描述规则
            const schemaRules = {
                [this.prop]: rules
            }
            // 校验数据源
            const schemaValue = {
                [this.prop]: value
            }
            // 创建Schema实例
            const schema = new Schema(schemaRules);
            return schema.validate(schemaValue, errors => {
                this.error = errors ? errors[0].message : '';
            })
        }
    }
}
</script>