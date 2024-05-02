import type { Config } from "vike/types";
import Head from "@/layouts/HeadDefault.vue";
import Layout from "@/components/GlobalPageShell.vue";

// Overrides default pages config
export default {
  passToClient: ['pageProps'],
  // Modify/create hooks
  meta: {
    onBeforeRender: {
      // Modify the onBeforeRender() hook to run on both the server- and client-side
      env: { server: true }
    },
    // Create new hook
    onBeforeRenderHtml: {
      env: { server: true }
    },
    // Create new hook
    onBeforeRenderClient: {
      env: { client: true }
    }
  },
  extends: [],
} satisfies Config;