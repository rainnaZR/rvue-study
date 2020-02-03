import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import App from './app'
import create from 'vui/utils/create'
import emitter from 'vui/mixins/emitter'

const router = new Router(routes)

Vue.use(Router);
Vue.use(create);
Vue.mixin(emitter);

new Vue({
    el: '#app',
    components: { App },
    template: '<App />',
    router
})