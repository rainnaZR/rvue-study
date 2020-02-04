
import Vue from 'vue'
import Router from 'rvue-router'

import Communication from 'components_path/communication'
import Slot from 'components_path/slot'
import Form from 'components_path/form'

const routes = [{
    path: '/communication',
    name: 'communication',
    component: Communication
},{
    path: '/slot',
    name: 'slot',
    component: Slot
},{
    path: '/form',
    name: 'form',
    component: Form
}]

// 第一步 应用注册插件
Vue.use(Router);

// 第二步 创建实例
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
