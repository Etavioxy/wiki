import type { Component, PageProps, PageContext } from './types'
import { createSSRApp, defineComponent, h } from 'vue'
import GlobalPageShell from '../components/GlobalPageShell.vue'
import './style.scss'

// 全局注册组件
import TreeNode from '../components/headings-tree-node.vue'
import ExamplePalette from '../components/example-palette.vue'
import Vote from '../components/vote.vue'

export { createApp }

function createApp(Page: Component, pageProps: PageProps | undefined, pageContext: PageContext) {
  const PageWithLayout = defineComponent({
    render() {
      return h(GlobalPageShell, {}, {
        default() {
          return h(Page, pageProps || {}, {
            default(){ return pageContext.markdownHTML || '' }
          })
        }
      })
    }
  })

  const app = createSSRApp(PageWithLayout)

  app.component('TreeNode', TreeNode);
  app.component('ExamplePalette', ExamplePalette);
  app.component('Vote', Vote);

  // Make pageContext available from any Vue component
  app.provide('pageContext', pageContext)

  return app
}
