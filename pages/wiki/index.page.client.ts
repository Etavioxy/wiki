export { render }

import type { PageContextClient } from '@/types'
import { createApp } from '@/app'

import type { PageContextBuiltIn } from 'vike/types'
import { importMd } from '@/utils/renderMarkdown'

async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  const { id } = pageProps
  const html = await importMd(id, pageContext)
  pageContext.markdownHTML = html
  const app = createApp(Page, pageProps, pageContext)
  app.mount('#app')
}

///https://cn.vike.dev/hydration-mismatch
