import colors from "https://esm.sh/tailwindcss@3.0.24/lib/public/colors.js";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";

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


export * from "twind";
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  theme: {
      colors
  }
};

if (IS_BROWSER) setup(config);
