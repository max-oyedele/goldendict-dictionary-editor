import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
  },
  plugins: [react()],
  css: {
    modules: {
      // ⬇ Change the generated class name format
      generateScopedName: "[name]__[local]___[hash:base64:5]",

      // Optional: force everything to be scoped (vs. using only *.module.css)
      scopeBehaviour: "local",

      // Optional: camelCase export
      localsConvention: "camelCaseOnly", // or 'dashesOnly', etc.

      // Optional: custom hashing salt
      hashPrefix: "customPrefix",
    },
  },
});
