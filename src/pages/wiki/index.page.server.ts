import type { PageContextBuiltIn } from 'vike/types'
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
