import type { PageContextBuiltIn } from 'vite-plugin-ssr/types'
import { render } from '@/utils/renderMarkdown'

export { onBeforeRender }
export { prerender }

async function onBeforeRender(pageContext: PageContextBuiltIn) {
  const { id } = pageContext.routeParams
  const html = await render(id, pageContext)
  return {
    pageContext: {
      pageProps: {
        id,
        html
      }
    }
  }
}
//TODO html在SSG之后没有被销毁

import path from 'path'
import needUpdate from '@/../assets/needUpdate.txt?raw'

function prerender(): string[] {
  const filenames = needUpdate.split('\n').filter((name) => name.startsWith('assets/') && name.endsWith('.md') );
  console.log(filenames);
  return filenames.map((name) => `/wiki/${path.basename(name, path.extname(name))}`);
}
