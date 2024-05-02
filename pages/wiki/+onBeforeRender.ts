import type { PageContextServer } from 'vike/types'
import { importMd } from '@/utils/renderMarkdown'

export async function onBeforeRender(pageContext: PageContextServer) {
  const { id } = pageContext.routeParams
  pageContext.pageProps = { id }
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
