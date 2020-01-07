import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import App from './app'

Vue.use(Router)

const router = new Router(routes)

new Vue({
    el: '#app',
    components: { App },
    template: '<App />',
    router
})