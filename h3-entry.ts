import { createServer } from "node:http";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import CredentialsProvider from "@auth/core/providers/credentials";
import installCrypto from "@hattip/polyfills/crypto";
import installGetSetCookie from "@hattip/polyfills/get-set-cookie";
import installWhatwgNodeFetch from "@hattip/polyfills/whatwg-node";
import {
  createApp,
  createRouter,
  eventHandler,
  fromNodeMiddleware,
  setResponseHeaders,
  setResponseStatus,
  toNodeListener,
  toWebRequest,
} from "h3";
import serveStatic from "serve-static";
import { telefunc } from "telefunc";
import { VikeAuth } from "vike-authjs";
import { renderPage } from "vike/server";

installWhatwgNodeFetch();
installGetSetCookie();
installCrypto();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";
const root = __dirname;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const hmrPort = process.env.HMR_PORT
  ? parseInt(process.env.HMR_PORT, 10)
  : 24678;

startServer();

async function startServer() {
  const app = createApp();

  if (isProduction) {
    app.use("/", fromNodeMiddleware(serveStatic(`${root}/dist/client`)));
  } else {
    // Instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
    // and would unnecessarily bloat our server in production.)
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true, hmr: { port: hmrPort } },
      })
    ).middlewares;
    app.use(fromNodeMiddleware(viteDevMiddleware));
  }

  const router = createRouter();

  const Auth = VikeAuth({
    secret: "MY_SECRET",
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize() {
          // Add logic here to look up the user from the credentials supplied
          const user = {
            id: "1",
            name: "J Smith",
            email: "jsmith@example.com",
          };

          // Any object returned will be saved in `user` property of the JWT
          // If you return null then an error will be displayed advising the user to check their details.
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          return user ?? null;
        },
      }),
    ],
  });

  router.use(
    "/api/auth/**",
    eventHandler((event) =>
      Auth({
        request: toWebRequest(event),
      }),
    ),
  );

  router.post(
    "/_telefunc",
    eventHandler(async (event) => {
      const request = toWebRequest(event);
      const httpResponse = await telefunc({
        url: request.url.toString(),
        method: request.method,
        body: await request.text(),
        context: event,
      });
      const { body, statusCode, contentType } = httpResponse;

      setResponseStatus(event, statusCode);
      setResponseHeaders(event, {
        "content-type": contentType,
      });

      return body;
    }),
  );

  /**
   * Vike route
   *
   * @link {@see https://vike.dev}
   **/
  router.use(
    "/**",
    eventHandler(async (event) => {
      const pageContextInit = {
        urlOriginal: event.node.req.originalUrl || event.node.req.url!,
      };

      const pageContext = await renderPage(pageContextInit);
      const response = pageContext.httpResponse;

      setResponseStatus(event, response?.statusCode);
      setResponseHeaders(event, Object.fromEntries(response?.headers ?? []));

      return response?.getBody();
    }),
  );

  app.use(router);

  const server = createServer(toNodeListener(app)).listen(port);

  server.on("listening", () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}
