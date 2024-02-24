import { transpile } from "https://deno.land/x/tserve@0.1.3/src/transpile.ts"

import { Hono } from "https://deno.land/x/hono@v4.0.5/mod.ts"
import { serveStatic, etag } from "https://deno.land/x/hono@v4.0.5/middleware.ts"

const app = new Hono()

app.get("*", etag())

app.get("/src/:filename{.*\\.ts$}", async c => {
    return await transpile("." + c.req.path)
        .then(v => {
            if (!v) throw v
            return v
        })
        .then(v => c.body(
            v,
            200,
            {
                "content-type": "application/javascript",
            }
        ))
})

app.get("*", serveStatic())

Deno.serve(app.fetch)