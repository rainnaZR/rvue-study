import Vue from 'vue'
import Vuex from 'rvuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        counter: 0
    },
    getters:{
        doubleCounter(state){
            return state.counter * 2
        }
    },
    mutations: {
        add(state){
            state.counter ++
        }
    },
    actions: {
        // 参数为执行上下文
        add({commit}){
            setTimeout(() => {
                commit('add')
            }, 1000)
        }
    }
})