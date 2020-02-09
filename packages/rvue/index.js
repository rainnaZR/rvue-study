// MVVM框架的三要素：
// - 数据响应式：监听数据变化并更新，Object.defineProperty(), Proxy；数组的数据响应式是重写数组原型上的7个方法
// - 模板引擎：视图的模板语法，比如v-bind, v-on, v-for, v-if等
// - 模板渲染：将模板转换成html，vdom转换成dom

// 设计过程及概念
// - RVue: 框架构造函数
// - Observer: 执行数据响应化(检测数据类型：对象/数组)
// - Compile: 编译模板，初始化视图，收集依赖
// - Watcher: 执行更新函数，更新dom
// - Dep: 管理多个watcher,批量更新


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




// 第一步：数据响应式实现，这里使用Object.defineProperty()实现
function observe(obj){
    // 先对obj做校验，确定obj为对象
    if(typeof obj !== 'object' || obj == null) return;
  
    // 遍历obj的属性，使每个属性为响应式属性
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key]);
    });
}
function defineReactive(obj, key, value){
    // 递归值
    observe(value);

    // 对传入的obj进行访问拦截
    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${key}`);
            return value;
        },
        set(newValue) {
            if(newValue !== value){
                console.log(`set ${key}: ${newValue}`);
                // 如果新值newValue是对象，则需要修改为响应式
                observe(newValue);
                value = newValue;
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


