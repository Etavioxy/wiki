import { PageContextServer } from '../types'
import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setPageContext } from './usePageContext'

export { render }

async function render(url: string, pageContext: PageContextServer) {
  let component = await import(`../../assets/${url}.md`);
  let md = createSSRApp(
    defineComponent({
      render() {
        return h(component.default, {})
      }
    })
  )
  setPageContext(md, pageContext);
  const appContent = await renderToString(md)
  return appContent
}
