<template>
    <div>
        <div class="header">
            <router-link to="/communication">communication</router-link>
            <router-link to="/slot">slot</router-link>
            <router-link to="/form">form</router-link>
            <router-link to="/vuex">vuex</router-link>
            <router-link to="/vuex/demo">vuex demo</router-link>
        </div>
        <!-- 路由出口 -->
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>