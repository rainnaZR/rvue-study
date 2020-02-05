export default {
    render(h){
        // 标记当前router-view的深度，标记自己是router-view组件
        this.$vnode.data.routeView = true;

        let depth = 0;
        let parent = this.$parent;
        while(parent){
            const vnodeData = parent.$vnode && parent.$vnode.data;
            // 如果是router-view组件，则记录routeView的深度
            if(vnodeData && vnodeData.routeView){
                depth ++;
            }
            parent = parent.$parent;
        }

        // 4. 响应最新的url：创建一个响应式的属性matched，当它改变时获取对应组件的显示内容
        // mathed保存的是组件路由的映射关系，只涉及当前路由和当前路由的子路由
        // this.$router指当前VueRouter的实例
        const { matched } = this.$router;
        const component = matched[depth] && matched[depth].component;

        return h(component);
    }
}