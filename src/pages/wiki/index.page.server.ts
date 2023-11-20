import type { PageContextBuiltIn } from 'vite-plugin-ssr/types'
import { importMd } from '@/utils/renderMarkdown'

export { onBeforeRender }

async function onBeforeRender(pageContext: PageContextBuiltIn) {
  const { id } = pageContext.routeParams
  const html = await importMd(id, pageContext)
  return {
    pageContext: {
      markdownHTML: html,
      pageProps: {
        id
      }
    }
  }
}
