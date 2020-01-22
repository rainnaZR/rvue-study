import Vue from 'vue'

//以下用两个方法实现同样的功能

function create(Component, props){
    // 通过Component配置项获取组件的构造函数
    // 组件构造函数获取方式有以下2种 Vue.extend和render
    // 1：Vue.extend()
    const Constructor = Vue.extend(Component);
    // 创建组件实例，生成的是虚拟dom
    const comp = new Constructor({
        propsData: props
    })
    // 组件挂载，虚拟dom挂载后才能生成真实dom
    comp.$mount();
    // 获取真实dom，并追加到body中
    document.body.appendChild(comp.$el);
    // 组件的删除
    comp.remove = () => {
        // 节点删除
        document.body.removeChild(comp.$el);
        // 组件实例销毁
        comp.$destroy();
    }

    return comp;
}

// 2. render
function create2(Component, props){
    // 通过Component配置项获取组件的构造函数
    // 组件构造函数获取方式有以下2种 Vue.extend和render
    // 2. render
    // vm就是组件实例
    const vm = new Vue({
        // h是createElement，返回VNode, VNode是虚拟dom
        // 需要挂载才能变成真实Dom
        render: h => h(Component, {props})
    })
    // $mount()不指定宿主元素，则会创建真实dom，但是不会追加操作
    vm.$mount();
    // 获取真实dom，并追加到body中
    document.body.appendChild(vm.$el)
    const comp = vm.$children[0]
    // 组件的删除
    comp.remove = function(){
        // 节点删除
        document.body.removeChild(vm.$el)
        // 组件实例销毁
        vm.$destroy()
    }

    return comp;
}

export default create