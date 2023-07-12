import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from '@vue/server-renderer'

export { render }

async function render(url: string, pageContext: PageContextServer) {
  let component = await import(`../assets/${url}.md`);
  let md = createSSRApp(
    defineComponent({
      render() {
        return h(component.default, {})
      }
    })
  )
  const appContent = await renderToString(md)
  console.log(appContent)
  return appContent
}
