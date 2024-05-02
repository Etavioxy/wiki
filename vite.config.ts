import md from "unplugin-vue-markdown/vite";
import vue from "@vitejs/plugin-vue";
import ssr from "vike/plugin";
import vercel from "vite-plugin-vercel";
import {telefunc} from "telefunc/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [telefunc(), vercel(), ssr(), vue({
    include: [/\.vue$/, /\.md$/],
  }), md({})],
});