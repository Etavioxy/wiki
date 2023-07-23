export { render }

import type { PageContextClient } from '@/types'
import { createApp } from '@/app'

import type { PageContextBuiltIn } from 'vite-plugin-ssr/types'
import { importMd } from '@/utils/renderMarkdown'

async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  const { id } = pageProps
  const html = await importMd(id, pageContext)
  pageContext.markdownHTML = html
  const app = createApp(Page, pageProps, pageContext)
  app.mount('#app')
}
