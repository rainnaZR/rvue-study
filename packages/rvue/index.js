// MVVM框架的三要素：
// - 数据响应式：监听数据变化并更新，Object.defineProperty(), Proxy；数组的数据响应式是重写数组原型上的7个方法
// - 模板编译
//      - 模板引擎：视图的模板语法，比如v-bind, v-on, v-for, v-if等
//      - 模板渲染：将模板转换成html，vdom转换成dom

// 设计过程及概念
// - RVue: 框架构造函数
// - Observer: 执行数据响应化(检测数据类型：对象/数组，监听数据属性)
// - Compile: 编译模板，初始化视图，收集依赖
// - Watcher: 执行更新函数，更新dom；视图中每定义一次，就对应一个watcher
// - Dep: 管理多个watcher；实现批量更新，与属性key是一对一的关系，与watcher是一对多的关系，也就是一个属性有一个Dep，一个Dep管理一个或多个watcher


// RVue: 框架构造函数
class RVue{
    constructor(options){
        // 保存选项
        this.$options = options;
        this.$data = options.data;
        this.$el = options.el;

        // 第一步：响应化处理
        new Observer(this.$data);

        // 代理
        proxy(this, '$data');

        // 第二步：创建编译器
        new Compiler(this.$el, this);
    }
}

// Observer: 执行数据响应化(检测数据类型：对象/数组)
// 根据参数值决定如何做响应化
class Observer{
    constructor(value){
        this.value = value;

        // 判断类型
        if(typeof value == 'object'){
            // 对象数据响应化
            this.walk(value);
        }else if(Array.isArray(value)){
            // 数组数据响应化
            // todo
        }
    }

    // 对象数据响应化
    walk(obj){
        observe(obj);
    }
}

// Watcher：观察者，执行更新函数，更新dom
class Watcher{
    constructor(vm, key, updateFn){
        this.$vm = vm;
        this.key = key;
        this.updateFn = updateFn;

        Dep.target = this;
        this.$vm[this.key];   // 读取属性触发属性的get方法
        Dep.target = null;    // 依赖收集完成后立即清除
    }

    update(){
        this.updateFn.call(this.$vm, this.$vm[this.key]);
    }
}

// Dep: 管理多个watcher，批量更新，与key是一对一的关系，与watcher是一对多的关系
class Dep{
    constructor(){
        this.deps = [];
    }

    addDep(dep){
        this.deps.push(dep);
    }

    notify(){
        this.deps.forEach(dep => dep.update());
    }
}

/**
 * 数组响应式
 * 替换数组原型中的7个方法
 * **/
const originalProto = Array.prototype;
const arrayProto = Object.create(originalProto);
['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'].forEach(method => {
    arrayProto[method] = function(){
        // 原始操作
        originalProto[method].apply(this, arguments);
        // 覆盖操作：通知更新
        console.log(`数组执行${method}操作`);
    }
}) 

// 第一步：数据响应式实现，这里使用Object.defineProperty()实现
function observe(obj){
    // 先对obj做校验，确定obj为对象
    if(typeof obj !== 'object' || obj == null) return;
  
    // 判定obj类型，如果是数组
    if(Array.isArray(obj)){
        // 覆盖原型，替换7个原型上的操作
        obj.__proto__ = arrayProto;
        // 对数组内部元素执行响应化，执行覆盖原型的操作
        let keys = Object.keys(obj);
        for(let i = 0; i< keys.length; i++){
            observe(obj[i]);
        }
    }

    // 遍历obj的属性，使每个属性为响应式属性
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key]);
    });
}
function defineReactive(obj, key, value){
    // 递归值
    observe(value);

    // 创建一个Dep，和当前key一一对应，用来收集和管理watcher
    let dep = new Dep();

    // 对传入的obj进行访问拦截
    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${key}`);
            // 添加依赖，依赖收集
            // Dep.target指创建的watcher实例，添加wacher实例
            Dep.target && dep.addDep(Dep.target);
            return value;
        },
        set(newValue) {
            if(newValue !== value){
                console.log(`set ${key}: ${newValue}`);
                // 如果新值newValue是对象，则需要修改为响应式
                observe(newValue);
                value = newValue;

                // 当值发生改变时，执行dep的notify方法，通知dep里的watcher执行更新函数，触发视图更新
                // 此时数据变化，驱动视图更新
                // 通知更新
                dep.notify();
            }
        }
    })
}


// 代理函数，将$data里的属性代理到vue实例this中，方便用户直接访问this.$data里的数据
// 比如this.$data.name 代理到 this.name
// 参数vm为当前vue的实例
// 参数souceKey为 $data
function proxy(vm, sourceKey){
    // 遍历this.$data里的属性  
    Object.keys(vm[sourceKey]).forEach(key => {
        Object.defineProperty(vm, key, {
            get(){
                return vm[sourceKey][key];
            },
            set(newValue){
                vm[sourceKey][key] = newValue;
            }
        })
    })
}


