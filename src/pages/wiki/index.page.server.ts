import type { PageContextBuiltIn } from 'vite-plugin-ssr/types'
import { importMd } from '@/utils/renderMarkdown'

export { onBeforeRender }
export { prerender }

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

import path from 'path'
import needUpdate from '@/../assets/needUpdate.txt?raw'

function prerender(): string[] {
  const filenames = needUpdate.split('\n').filter((name) => name.startsWith('assets/') && name.endsWith('.md') );
  console.log(filenames);
  return filenames.map((name) => `/wiki/${path.basename(name, path.extname(name))}`);
}
