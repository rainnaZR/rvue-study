// 第二步：模板引擎：视图的模板语法，比如v-bind, v-on, v-for, v-if等
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

    // 判断是否是文本元素，且内容是{{xx}}
    isInter(node){
        return node.nodeType === 3 && /\{\{(\w*)\}\}/.test(node.textContent);
    }

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
                const dirctive = attrName.substring(2);  // text
                // 执行指令
                // 指令为方法名
                this[dirctive] && this[dirctive](node, attrValue);
            }
        })
    }

    isDirective(value){
        return value.indexOf('r-') === 0;
    }

    // 指令方法
    // r-text
    text(node, value){
        node.textContent = this.$vm[value];
    }
    // r-html
    html(node, value){
        node.innerHTML = this.$vm[value];
    }

    compileText(node){
        node.textContent = this.$vm[RegExp.$1];  //RegExp.$1为插值取出来的属性 
    }
}