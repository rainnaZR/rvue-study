<template>
    <div>
        <p>hello world, APP{{name}}</p>
        <!-- $attrs -->
        <Child1 ref="child1" :msg="msg"/>
        <!-- props -->
        <Child2 ref="child2" :msg="msg"/>
        <!-- $children -->
        <button @click="onChildrenEvent">调用子组件的方法</button>
    </div>
</template>

<script>
import Child1 from './child1'
import Child2 from './child2'

export default {
    componentName: 'Communication',
    components:{
        Child1,
        Child2
    },
    provide(){
        return {
            parentName: '我是父组件'
        }
    },
    data(){
        return {
            name: 'rainna',
            msg: 'parent msg'
        }
    },
    methods: {
        onChildrenEvent(){
            // 第一种：使用this.$children
            // this.$children[0].getTitle();
            // this.$children[1].getTitle();

            // 第二种：使用this.$refs
            this.$refs.child1.getTitle();
            this.$refs.child2.getTitle();
        }
    }
}
</script> 