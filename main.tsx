/** @jsx h */
import { deepReaddir } from "./utils/deepReaddir.ts";
import { createRenderer } from "./createRenderer.ts";
import { serve } from "./libs/http_server.ts";
import { router, Handler } from "./libs/router.ts";
import { h } from "./libs/nano_jsx.ts";
import { toFileUrl, resolve } from "./libs/std_path.ts";

type Component = (props: { req: Request }) => unknown;

const render = createRenderer();

const path = resolve(Deno.cwd(), "pages");
const pages = deepReaddir(path).map(
    x => x.replace(/\.tsx?$/, "")
);

const is404added = pages.includes("/404");

const routes = pages.reduce((p, c) => {
    const func: Handler = async req => {
        const Comp = (await import(toFileUrl(resolve(path, `${c.slice(1)}.tsx`)).toString()) as { default: Component }).default;
        return render(() => <Comp req={req} />);
    }

    p[c] = func;
    p[c.replace(/\/index/g, "/")] = func;

    return p;
}, {} as Record<string, Handler>);

const notFoundHandler: Handler = (req, ctx) => {
    if (is404added) {
        return routes["/404"](req, ctx);
    } else {
        return new Response("Not Found", { status: 404 });
    }
}

serve(router(routes, notFoundHandler), {
    port: 8000,
    onListen: params => {
        console.log(`Server listening on port ${params.port}`);
    }
});
