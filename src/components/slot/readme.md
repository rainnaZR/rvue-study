## 插槽

插槽语法是Vue实现的组件内容分发，当组件嵌套时，可以灵活定义组件内容。插槽分为三种：匿名插槽，具名插槽，作用域插槽。

### 1. 匿名插槽

示例代码如下：

```
// index.vue
<Child>
    <!-- 匿名插槽 -->
    <template>我是匿名插槽的内容......</template>
</Child>
```

```
// child.vue
<!-- 匿名插槽 -->
<slot></slot>
```

### 2. 具名插槽

子组件slot标签上挂载name属性，指定插槽的名称。示例代码如下：

```
// index.vue
<Child>
    <!-- 具名插槽 -->
    <template v-slot:header>我是具名插槽header里的内容......</template>
</Child>
```

```
// child.vue
<!-- 具名插槽 -->
<slot name="header"></slot>
```

### 3. 作用域插槽

使用作用域插槽，可以将子组件里的数据通过插槽作用域的形式在组件嵌套中使用。示例代码如下：

```
// index.vue
<Child>
    <!-- 作用域插槽 -->
    <template v-slot:footer="context">我是具名插槽footer里的内容，拿到了子组件作用域插槽的数据：{{context.title}}-{{context.content}}；同时也获取到父组件的数据：{{title}}</template>
</Child>
```

```
// child.vue
<!-- 作用域插槽 -->
<slot name="footer" :title="title" :content="content"></slot>
```



