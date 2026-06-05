import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",

  title: "AYALUZ",

  projectId: "iicafgfn",

  dataset: "ayaluz-dataset",

  basePath: "/studio",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});