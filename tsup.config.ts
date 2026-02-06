// tsup.config.ts
import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["compiler/compiler.ts"],
    format: ["cjs"],
    bundle: true,
    splitting: false,
    clean: true,
    minify: true,
    outDir: "release/compiler",
    noExternal: ["chevrotain"]
})
