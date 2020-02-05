let Vue;

class Store{
    constructor(options){
        // 保存所有mutations
        this._mutations = options.mutations;

        // 保存所有actions
        this._actions = options.actions;

        // 处理所有getters
        // 定义computed选项
        const { computed } = this.dealGetters(options.getters);

        // 响应化处理state，当state值发生变化时，触发渲染函数重新渲染视图
        // 可以通过实例化Vue，在data中设置使属性变为响应式
        // this.state = new Vue({
        //     data: options.state
        // })
        this._vm = new Vue({
            data: {
                $$state: options.state
            },
            computed
        });

        // 绑定commit，dispatch的上下文为当前store实例
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    // store中getters定义方式{ doubleCounter(state){return state.counter * 2} }
    // store中读取getter里的值：{{$store.getters.doubleCounter}}
    dealGetters(getters = {}){
        let computed = {};
        let store = this;
        store.getters = {};
        // 遍历用户定义的getters
        Object.keys(getters).forEach(key => {
            // 获取用户定义的getter
            const getter = getters[key];  // 比如 doubleCounter(state){return state.counter * 2}
            // 将getter转换为computed形式，computed里的函数是无参数的
            // computed计算属性，实际上是调用getters里的方法
            computed[key]= function(){
                return getter(store.state);
            };
            // 为getters定义只读属性
            // 当读取getters里面的属性值时，其实是读取的vue实例里的computed计算属性
            Object.defineProperty(store.getters, key, {
                get: () => store._vm[key]
            });
        });
        
        return {
            computed
        };
    }

    // 存取器
    get state(){
        return this._vm._data.$$state;
    }
    set state(value){
        console.error('不能直接设置state的值');
    }

    // commit mutation来触发state的更新
    // $store.commit('add', 1)
    // params: 
    //  type: mutation的类型
    //  payload: 载荷，多余的参数
    commit(type, payload){
        const entry = this._mutations[type];
        if(entry) {
            entry(this.state, payload);
        }
    }

    dispatch(type, payload){
        const entry = this._actions[type];
        if(entry){
            entry(this, payload);
        }
    }
}

function install(_Vue){
    Vue = _Vue;

    Vue.mixin({
        beforeCreate() {
            // 只有根组件（入口文件）才会传入store
            // 然后将this.$options.store挂载到vue原型上，这样vue组件内部可以通过this.$store来访问
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}

// Vuex
export default {
    Store,
    install
}