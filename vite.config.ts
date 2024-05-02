import md from "unplugin-vue-markdown/vite";
import vue from "@vitejs/plugin-vue";
import ssr from "vike/plugin";

import markdownItSetup from './markdownItSetup.ts'

import vercel from "vite-plugin-vercel";
import {telefunc} from "telefunc/vite";
import { defineConfig } from "vite";

import { resolve } from 'path'

export default defineConfig({
  plugins: [telefunc(), vercel(), ssr(), vue({
    include: [/\.vue$/, /\.md$/],
  }),
  md({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup,
  })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});