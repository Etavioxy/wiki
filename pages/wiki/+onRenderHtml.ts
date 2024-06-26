export { onRenderHtml }

import type { PageContextServer } from '../types'
import { renderToString as renderToString_ } from '@vue/server-renderer'
import type { App } from 'vue'
import type { OnRenderHtmlAsync } from 'vike/types'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import { createApp } from '../app'

const onRenderHtml: OnRenderHtmlAsync = async function (pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext
  // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
  const app = createApp(Page, pageProps, pageContext)

  const appHtml = await renderToString(app)

  // See https://vike.dev/head
  const { documentProps } = pageContext.exports
  const logoUrl = '/blob.svg'
  const title = (documentProps && documentProps.title) || 'My Club Wiki'
  const desc = (documentProps && documentProps.description) || 'App using Vite + vike'

  const documentHtml = escapeInject`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="${logoUrl}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${desc}" />
    <title>${title}</title>
  </head>
  <body>
    <div id="vue-root">${dangerouslySkipEscape(appHtml)}</div>
  </body>
</html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
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
