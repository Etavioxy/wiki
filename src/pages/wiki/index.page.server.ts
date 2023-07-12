import type { PageContextBuiltIn } from 'vite-plugin-ssr/types'
import { render, fetchFromUrl } from '../../utils/renderMarkdown'

export { onBeforeRender }
export { prerender }

async function onBeforeRender(pageContext: PageContextBuiltIn) {
  const { id } = pageContext.routeParams
  console.log('url: ' + id + '.md');
  const html = await render(id, pageContext)
  console.log('url: ' + id + '.md');
  console.log(html)
  return {
    pageContext: {
      pageProps: {
        id,
        html
      }
    }
  }
}

//function prerender(): string[] {
//  return ['/hello', ...names.map((name) => `/hello/${name}`)]
//}
