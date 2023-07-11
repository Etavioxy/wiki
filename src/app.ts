import { createSSRApp, defineComponent, h } from 'vue'
import GlobalPageShell from './GlobalPageShell.vue'
import { setPageContext } from './usePageContext'
import './style.scss'

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

  //// 全局注册组件
  //import TreeNode from './components/headings-tree-node.vue'
  //app.component('TreeNode', TreeNode);

  // Make pageContext available from any Vue component
  setPageContext(app, pageContext)

  return app
}
