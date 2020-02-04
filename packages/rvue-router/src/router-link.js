export default {
    props:{
        to: {
            type: String,
            required: true
        }
    },
    render(h) {
        // <a href="#/form">链接</a>
        // <router-link to="/slot" /> 调用方式
        // h(tag, data, children)
        return h('a', {attrs: {href: `#${this.to}`}}, this.$slots.default);
    }
}