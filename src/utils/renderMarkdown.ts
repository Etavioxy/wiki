import { PageContextServer } from '../types'
import { h } from 'vue'

//TODO https://github.com/antfu/vite-plugin-md#using-this-plugin

export { importMd }

async function importMd(url: string, pageContext: PageContextServer) {
  let component = await import(`../../assets/${url}.md`);
  const { pageProps } = pageContext
  return h(component.default, pageProps || {})
}
