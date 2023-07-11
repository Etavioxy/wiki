export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

import { renderToString as renderToString_ } from '@vue/server-renderer'
import type { App } from 'vue'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import { createApp } from './app'

async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext
  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
  const app = createApp(Page, pageProps, pageContext)

  const appHtml = await renderToString(app)

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports

  const documentHtml = escapeInject`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/blob.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Club Wiki</title>
  </head>
  <body>
    <div id="app">${dangerouslySkipEscape(appHtml)}</div>
  </body>
</html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  }
}

async function renderToString(app: App) {
  let err: unknown
  // Workaround: renderToString_() swallows errors in production, see https://github.com/vuejs/core/issues/7876
  app.config.errorHandler = (err_) => {
    err = err_
  }
  const appHtml = await renderToString_(app)
  if (err) throw err
  return appHtml
}
