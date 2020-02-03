/**
 * 思路：
1. 作为一个插件：实现VueRouter的install方法
2. 实现两个全局组件：router-view用于匹配组件内容，router-link用于跳转
3. 监控url的变化：监听hashchange或popstate事件
4. 响应最新的url：创建一个响应式的属性current，当它改变时获取对应组件的显示内容
 */
let Vue;

class Router {
    constructor(options){
        this.$options = options;
        // this.current保存当前页面的hash值
        // this.current需要是响应式的属性
        Vue.util.defineReactive(this, 'current', '/');

        // 3. 监控url的变化：监听hashchange或popstate事件
        window.addEventListener('hashchange', this.onHashChange.bind(this));
        // 页面刷新时获取hash值
        window.addEventListener('load', this.onHashChange.bind(this));
    }

    onHashChange(){
        this.current = window.location.hash.slice(1);
    }
}

// 1. 实现一个插件: 实现install方法
Router.install = function(_Vue){
    // 保存_Vue构造函数，在Router内部使用
    // 避免import Vue时导致打包文件过大，所以通过变量Vue来保存_Vue引用
    Vue = _Vue;
 
    // 挂载$router
    // （入口文件实例化Vue时的根组件）在组件根实例中挂载$router Vue.prototype.$router = router
    // 通过混入的方式，在每个组件生命周期中实现挂载$router
    Vue.mixin({
        beforeCreate() {
            // 确保是根实例的时候才执行，只有根实例组件才有router选项
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router;
            }
        },
    });

    // 2. 实现两个全局组件：router-link和router-view
    Vue.component('router-link', {
        props:{
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            // <a href="#/form">链接</a>
            // <router-link to="/slot" /> 调用方式
            // h(tag, data, children)
            return h('a', {attrs: {href: `#${this.to}`}}, this.$slots.default);
        },
    });
    Vue.component('router-view', {
        render(h){
            // this.$router指当前VueRouter的实例
            // routes值路由配置表
            const routes = this.$router.$options.routes;
            // 找到当前hash路径对应的route配置项
            const route = routes.find(route => route.path === this.$router.current);
            // 获取当前route配置项中对应的component
            let component = route && route.component;
            return h(component);
        }
    })
}

 export default Router