## MVVM框架的三要素：

- 数据响应式：监听数据变化并更新，Object.defineProperty(), Proxy
- 模板引擎：视图的模板语法，比如v-bind, v-on, v-for, v-if等
- 模板渲染：将模板转换成html，vdom转换成dom


## 概念：

- KVue: 框架构造函数
- Observer: 执行数据响应化
- Compile: 编译模板，初始化视图，收集依赖
- Watcher: 执行更新函数，更新dom
- Dep: 管理多个watcher,批量更新

