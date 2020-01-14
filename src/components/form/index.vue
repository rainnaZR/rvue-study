<template>
    <div>
        <!-- Form 保存表单数据，以及对数据的校验规则-->
        <Form :model="pageInfo" :rules="rules" ref="form">
            <!-- FormItem 做数据的校验，label显示，错误提示显示等附加功能 -->
            <FormItem label="标题" prop="title">
                <!-- Input 仅做数据的双向绑定 -->
                <Input v-model="pageInfo.title" placeholder="请输入页面标题"/>
            </FormItem>

            <!-- 描述 -->
            <FormItem label="描述" prop="desc">
                <Input v-model="pageInfo.desc" placeholder="请输入页面描述"/>
            </FormItem>
            
            <!-- 提交按钮 -->
            <FormItem>
                <button @click="submit">确认提交</button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import Form from 'packages_path/form/form'
import FormItem from 'packages_path/form/formItem'
import Input from 'packages_path/form/input'
import Notice from 'packages_path/notice'

export default {
    data(){
        return {
            pageInfo: {},
            rules: {
                title: [{required: true, message: '请输入页面标题'}],
                desc: [{required: true, message: '请输入页面描述'}]
            }
        }
    },
    components: {
        Form,
        FormItem,
        Input,
        Notice
    },
    methods: {
        submit(){
            // 调用表单的全局验证方法
            this.$refs.form.validate(result => {
                // 使用notice组件
                const notice = this.$create(Notice, {
                    title: '反馈通知',
                    content: result ? '表单提交成功' : '表单提交失败',
                    duration: 1000
                })
                notice.show();
            })
        }
    }
}
</script>