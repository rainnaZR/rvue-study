// 第二步：模板引擎：视图的模板语法，比如v-bind, v-on, v-for, v-if等
// Compile: 编译模板，初始化视图，收集依赖
// 编译器
// 递归遍历dom树
// 判断节点类型：如果是文本，则判断是否是插值绑定
// 如果是元素类型，则遍历元素属性，判断是否是指令或者事件绑定，然后递归子元素
class Compiler{
    // el是宿主元素
    // vm是vue实例
    constructor(el, vm){
        this.$el = document.querySelector(el);
        this.$vm = vm;

        if(this.$el){
            // 执行编译
            this.compile(this.$el);
        }
    }

    compile(el){
        // 遍历节点树
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            if(this.isElement(node)){
                // 如果节点是元素类型
                console.log(`编译元素${node.nodeName}`);
                this.compileElement(node);
            }else if(this.isInter(node)){
                // 如果节点是文本类型，且是插值
                console.log(`编译插值绑定${node.textContent}`);
                this.compileText(node);
            }

            // 递归子节点
            if(node.childNodes && node.childNodes.length > 0){
                this.compile(node);
            }
        });
    }

    // 判断是否是元素类型
    isElement(node){
        return node.nodeType === 1;
    }

    // 判断是否是文本元素，且内容是插值形式{{xx}}
    isInter(node){
        return node.nodeType === 3 && /\{\{(\w*)\}\}/.test(node.textContent);
    }

    // 编译元素
    compileElement(node){
        // 节点是元素
        // 遍历其属性列表
        const nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr => {
            // 规定：指令以r-定义，比如r-text="count"等
            const attrName = attr.name;  // r-text
            const attrValue = attr.value;  // count为属性名
            if(this.isDirective(attrName)){
                // 如果是指令
                const directive = attrName.substring(2);  // text
                // 执行指令
                // 指令为方法名
                this[directive] && this[directive](node, attrValue);
            }else if(this.isEvent(attrName)){
                // 如果是事件
                // @click="onClick"
                const directive = attrName.substring(1);   // @click => click
                // 事件监听
                // attrValue是事件调用时执行的方法名字
                // directive是事件类型，比如click
                this.eventHandler(node, attrValue, directive);
            }
        });
    }

    // 编译文本
    compileText(node){
        // 调用更新函数
        this.update(node, RegExp.$1, 'text'); //RegExp.$1为插值取出来的属性，也就是isInter()方法里正则表达式取出的值 
    }

    // 判断是否是指令
    isDirective(value){
        return value.indexOf('r-') === 0;
    }

    // 判断是否是事件
    isEvent(value){
        return value.indexOf('@') == 0;
    }

    // 指令方法
    // r-text
    text(node, value){
        // 调用更新方法
        this.update(node, value, 'text');
    }
    // r-html
    html(node, value){
        // 调用更新方法
        this.update(node, value, 'html');
    }
    // r-model
    // r-model="xxx"
    // 双向绑定，执行两个操作：
    // 1. 数据变化触发视图（输入框值）变化  modelUpdater
    // 2. 视图（输入框值）变化触发数据变化  input事件监听
    model(node, value){
        // update方法只完成赋值和更新
        this.update(node, value, 'model');
        // 事件监听
        // 以输入框的input事件为例
        node.addEventListener('input', e => {
            this.$vm[value] = e.target.value;
        });
    }

    // 公共的更新函数
    // node 要作用的节点
    // property 表达式，也可能是属性名. 比如counter
    // directive 指令名称. 比如 r-text
    update(node, property, directive){
        // 初始化视图
        // 指令对应的更新函数 xxUpdater
        const fn = this[`${directive}Updater`];  // directive： 比如text(r-text), html(r-html), if(r-if)等
        fn && fn(node, this.$vm[property]);  // fn为更新函数

        // 更新视图，每更新一次，就添加一个watcher，把update更新函数传入
        // 更新处理，封装一个更新函数，用于更新dom元素
        new Watcher(this.$vm, property, function(value){
            fn && fn(node, value);
        })
    }
    textUpdater(node, value){
        node.textContent = value;
    }
    htmlUpdater(node, value){
        node.innerHTML = value;
    }
    modelUpdater(node, value){
        node.value = value;
    }

    // 执行事件
    // expression是事件调用时执行的方法名字
    // directive是事件类型，比如click
    eventHandler(node, expression, directive){
        // methods: {onClick(){}}
        const fn = this.$vm.$options.methods && this.$vm.$options.methods[expression];
        node.addEventListener(directive, fn.bind(this.$vm));
    }
}