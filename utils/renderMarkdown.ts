import { PageContext } from '../pages/types'
import { h } from 'vue'

//TODO https://github.com/antfu/vite-plugin-md#using-this-plugin

export { importMd }

async function importMd(url: string, pageContext: PageContext) {
  let component = await import(`../docs/${url}.md`);
  const { pageProps } = pageContext
  return h(component.default, pageProps || {})
}
