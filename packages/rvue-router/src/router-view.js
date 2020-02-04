export default {
    render(h){
        // 4. 响应最新的url：创建一个响应式的属性current，当它改变时获取对应组件的显示内容
        // current指当前页面的hash值
        // this.$router指当前VueRouter的实例
        const {current, routeMap} = this.$router;
        let component = routeMap[current] && routeMap[current].component;
        
        return h(component);
    }
}