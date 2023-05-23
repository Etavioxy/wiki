// 导入Vue和App组件
import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

// 导入router实例
import router from './router.ts'

let app = createApp(App);

// 全局注册组件
import TreeNode from './components/headings-tree-node.vue'
app.component('TreeNode', TreeNode);

// 创建Vue应用，并且使用router
app.use(router).mount('#app')
