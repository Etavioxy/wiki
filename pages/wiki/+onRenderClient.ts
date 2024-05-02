export { onRenderClient }

import type { PageContextClient } from '@/pages/types'
import { createApp } from '@/pages/app'

import { importMd } from '@/utils/renderMarkdown'

async function onRenderClient(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  const { id } = pageProps
  const html = await importMd(id, pageContext) // avoid passToClient overhead
  pageContext.markdownHTML = html
  const app = createApp(Page, pageProps, pageContext)
  app.mount('#vue-root')
}

///https://cn.vike.dev/hydration-mismatch
