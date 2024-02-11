import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ssr from 'vike/plugin'

import markdownItSetup from './markdownItSetup.ts'

//import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'

import { resolve } from 'path'

//import wikiLinks from './wikilinks.ts';
//.use(wikiLinks({ baseURL: '/wiki/' }))

// https://vitejs.dev/config/
export default defineConfig({
  server: {
  //https://vitejs.dev/config/server-options.html#server-hmr
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    ssr({ prerender: true }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup,
    }),
    // should be placed after `Markdown()`
    //Components({
    //  // allow auto load markdown components under `./src/components/`
    //  extensions: ['vue', 'md'],

    //  // allow auto import and register components used in markdown
    //  customLoaderMatcher: path => path.endsWith('.md'),
    //}),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
