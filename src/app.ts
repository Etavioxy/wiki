import type { Component, PageProps, PageContext } from './types'
import { createSSRApp, defineComponent, h } from 'vue'
import GlobalPageShell from './components/GlobalPageShell.vue'
import { setPageContext } from './utils/usePageContext'
import './style.scss'

// 全局注册组件
import TreeNode from './components/headings-tree-node.vue'

export { createApp }

function createApp(Page: Component, pageProps: PageProps | undefined, pageContext: PageContext) {
  const PageWithLayout = defineComponent({
    render() {
      return h(GlobalPageShell, {}, {
        default() {
          return h(Page, pageProps || {})
        }
      })
    }
  })

  const app = createSSRApp(PageWithLayout)

  app.component('TreeNode', TreeNode);

  // Make pageContext available from any Vue component
  setPageContext(app, pageContext)

  return app
}
