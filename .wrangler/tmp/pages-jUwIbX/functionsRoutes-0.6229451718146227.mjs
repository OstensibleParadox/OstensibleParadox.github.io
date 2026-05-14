import { onRequest as __us_api___path___js_onRequest } from "/Users/ostensible_paradox/github/ostensible-paradox/functions/us/api/[[path]].js"
import { onRequest as ___middleware_js_onRequest } from "/Users/ostensible_paradox/github/ostensible-paradox/functions/_middleware.js"

export const routes = [
    {
      routePath: "/us/api/:path*",
      mountPath: "/us/api",
      method: "",
      middlewares: [],
      modules: [__us_api___path___js_onRequest],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]