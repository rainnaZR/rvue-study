思路：

- 作为一个插件：实现VueRouter的install方法
- 实现两个全局组件：router-view用于匹配组件内容，router-link用于跳转
- 监控url的变化：监听hashchange或popstate事件
- 响应最新的url：创建一个响应式的属性current，当它改变时获取对应组件的显示内容