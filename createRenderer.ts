import { Helmet, renderSSR } from "./libs/nano_jsx.ts";
import { setup } from "./libs/twind/mod.ts";
import {
    getStyleTag,
    shim,
    virtualSheet,
    VirtualSheet
} from "./libs/twind/shim_server.ts";
import typography from "./libs/twind/typography.ts";
import colors from "https://esm.sh/tailwindcss@3.0.24/lib/public/colors.js";

// Remove tailwind color warnings
[
    ["lightBlue", "sky"],
    ["warmGray", "stone"],
    ["trueGray", "neutral"],
    ["coolGray", "gray"],
    ["blueGray", "slate"]
].forEach(([a, b]) => Object.defineProperty(colors, a, {
    get: () => colors[b]
}));

function createSheet(): VirtualSheet {
    const sheet = virtualSheet();
    setup({
        sheet,
        plugins: {
            ...typography()
        },
        theme: {
            colors
        },
        preflight: true
    });
    return sheet;
}

const toHTML = (
    body: string,
    head: string[],
    footer: string[],
    style: string
): string => (`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${head.join("\n")}
    ${style}
  </head>
  <body>
    ${body}
    ${footer.join("\n")}
  </body>
<html>
`)

export function createRenderer(): (rf: CallableFunction) => Response {
    const sheet = createSheet();

    return rf => {
        sheet.reset();

        const rendered = renderSSR(rf());
        shim(rendered);

        const { body, footer, head } = Helmet.SSR(rendered);
        const style = getStyleTag(sheet);

        return new Response(toHTML(body, head, footer, style), {
            headers: { "content-type": "text/html" }
        })
    }
}
