export { onCreateApp }
 
import '../style.scss'

import type { OnCreateAppSync } from 'vike-vue'

// 全局注册组件
import TreeNode from '@/components/headings-tree-node.vue'
import ExamplePalette from '@/components/example-palette.vue'
import Vote from '@/components/vote.vue'
 
const onCreateApp: OnCreateAppSync = (pageContext): ReturnType<OnCreateAppSync> => {
  const { app } = pageContext
  app.component('TreeNode', TreeNode);
  app.component('ExamplePalette', ExamplePalette);
  app.component('Vote', Vote);

  // Make pageContext available from any Vue component
  app.provide('pageContext', pageContext)
}
