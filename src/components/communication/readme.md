Vue组件通信方式主要有props, eventbus, vuex, 自定义事件等等。。。

### 1. 事件总线eventbus-发布订阅模式

大致原理是定义一个全局的事件存放数组，当进行事件订阅时，将事件存放到全局的数组里；当发布事件时，则执行全局事件数组里存放的对应事件。这是比较常用的事件通信模型。

发布订阅模式中，事件的发布和订阅是同一个对象。


### 2. 利用parent和root来通信

**兄弟组件之间的通信**：兄弟组件之间通信可通过祖辈之间搭桥。下面例子中Child1和Child2就通过公共的parent父组件来进行通信。

```
使用$parent/$root来进行事件通信
// parent.vue
<Child1 />
<Child2 />
```

```
// child1.vue
click(){
    this.$parent.$emit('child1Click', 'child1 点击，发送消息，触发事件')
}
```

```
// child2.vue
mounted(){
   this.$parent.$on('child1Click', (msg) => {
       console.log(msg)
   })
}
```

### 3. 使用children来通信

**父子组件之间的通信**：在父组件里通过this.$children来调用子组件里的方法，进行父子组件间的通信。调用子组件方法时不保证子元素顺序。

```
// parent.vue
this.$children[0].getTitle();
this.$children[1].getTitle();
```

### 4. provide/inject

**祖先/后代组件之间的属性传递**：实现祖先和后代之间传值。祖先使用provide提供值，子组件使用inject注入值。如果子组件有重名属性，可以使用别名。

```
// parent.vue
export default {
    provide(){
        return {
            parentName: '我是父组件标题'
        }
    }
}
```

```
// child1.vue
export default {
    inject: ['parentName']
}
```

### 5. props

**父子组件间的属性传递**：父组件通过props将属性传递给子组件。这是常用的一种方式。

```
// parent.vue
<Child2 :msg="msg"/>
```

```
// child.vue
props: ['msg']
```