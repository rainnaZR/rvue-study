<template>
    <div>
        <p>hello world, APP{{name}}</p>
        <Child1 :msg="msg"/>
        <Child2 />
        <!-- $children -->
        <button @click="onChildrenEvent">调用子组件的方法</button>
    </div>
</template>

<script>
import Child1 from './child1'
import Child2 from './child2'

export default {
    components:{
        Child1,
        Child2
    },
    provide(){
        return {
            parentName: '我是父组件标题'
        }
    },
    data(){
        return {
            name: 'rainna',
            msg: 'parent message'
        }
    },
    methods: {
        onChildrenEvent(){
            this.$children[0].getTitle();
            this.$children[1].getTitle();
        }
    }
}
</script> 