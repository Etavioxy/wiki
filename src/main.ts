// 导入Vue和App组件
import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

let app = createApp(App);

// 全局注册组件
import TreeNode from './components/headings-tree-node.vue'
app.component('TreeNode', TreeNode);

app.mount('#app')
