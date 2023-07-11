import type { PageContextBuiltIn } from 'vite-plugin-ssr/types'
import { ids } from './id.json'

export { onBeforeRender }
export { prerender }

async function onBeforeRender(pageContext: PageContextBuiltIn) {
  const { id } = pageContext.routeParams
  const pageProps = { id }
  return {
    pageContext: {
      pageProps
    }
  }
}

function prerender(): string[] {
  return ['/hello', ...names.map((name) => `/hello/${name}`)]
}
