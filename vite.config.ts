import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import md from 'vite-plugin-vue-markdown'

import anchor from 'markdown-it-anchor'
import multimdTable from 'markdown-it-multimd-table'
import prism from 'markdown-it-prism'
import katex from '@iktakahiro/markdown-it-katex'
import attrs from 'markdown-it-attrs'
import taskLists from 'markdown-it-task-lists'

import { resolve } from 'path'

//import wikiLinks from './wikilinks.ts';
//.use(wikiLinks({ baseURL: '/wiki/' }))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    ssr({ prerender: true }),
    md({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        md.use(anchor, {
          level: [1,2],
          permalink: anchor.permalink.headerLink(),
        });
        md.use(multimdTable);
        md.use(prism);
        md.use(katex, {"throwOnError" : true, "errorColor" : "#ce5e9a"});
        md.use(attrs, {
          leftDelimiter: '{',
          rightDelimiter: '}',
          allowedAttributes: []
        });
        md.use(taskLists);
        //md.use(myPlugin);
      },
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
