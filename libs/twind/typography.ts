import { Plugin } from "./mod.ts";
import typography from "https://esm.sh/@twind/typography@0.0.2";

const typed = typography as (() => Record<string, Plugin>);

export default typed;
