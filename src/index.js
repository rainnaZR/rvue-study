import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import App from './app'
import create from 'vui/utils/create'

Vue.use(Router)
Vue.prototype.$create = create

const router = new Router(routes)

new Vue({
    el: '#app',
    components: { App },
    template: '<App />',
    router
})