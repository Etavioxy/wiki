// 导入Vue和VueRouter
import {createRouter,createWebHistory} from 'vue-router';

// 导入页面组件
import About from './pages/about.vue'
import EditPre from './pages/edit-pre.vue'
import ThemeEditor from './pages/theme-editor.vue'
import Welcome from './pages/welcome.vue'
import Wiki from './pages/wiki.vue'

// 定义路由规则
const routes = [
  { path: '/about', component: About },
  { path: '/edit-pre', component: EditPre },
  { path: '/theme-editor', component: ThemeEditor },
  { path: '/', component: Welcome },
  { path: '/home', redirect: '/' },
  { path: '/wiki/:id', component: Wiki }
]

// 创建路由实例
const router = createRouter({
  // 使用hash模式
  history: createWebHistory(),
  routes
})

// 导出路由实例
export default router
