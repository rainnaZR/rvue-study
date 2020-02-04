import Vue from 'vue'
import create from 'vui/utils/create'
import emitter from 'vui/mixins/emitter'
import App from './app'
import router from './router'
import store from './store'

Vue.use(create);
Vue.mixin(emitter);

// new Vue({
//     el: '#app',
//     components: { App },
//     template: '<App />',
//     router  // Vue.prototype.$router = router
// })
new Vue({
    render: h => h(App),
    router, // Vue.prototype.$router = router
    store
}).$mount('#app')