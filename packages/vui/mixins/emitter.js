// 广播：自上而下的派发事件
function broadcast(componentName, eventName, params) {
    // 遍历所有子元素，如果子元素的componentName和传入的componentName相同，则派发事件
    this.$children.forEach(child => {
      var name = child.$options.componentName;
  
      if (name === componentName) {
        child.$emit.apply(child, [eventName].concat(params));
      } else {
        broadcast.apply(child, [componentName, eventName].concat([params]));
      }
    });
  }
  export default {
    methods: {
        // 冒泡：逐级向上查找componentName相同的父组件并派发事件
      dispatch(componentName, eventName, params) {
        var parent = this.$parent || this.$root;
        var name = parent.$options.componentName;
  
        // 向上查找直到找到同名的父组件
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
  
          if (parent) {
            name = parent.$options.componentName;
          }
        }
        // 跳出while循环：要么找到，要么没找到
        // 如果找到就派发事件
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };
  