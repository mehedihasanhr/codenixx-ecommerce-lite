import createStaticToolbarPlugin from "@draft-js-plugins/static-toolbar";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";

export const staticToolbarPlugin = createStaticToolbarPlugin();

export const plugins = [staticToolbarPlugin];
