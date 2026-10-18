import { writeFileSync } from "node:fs";

// Each output folder declares its own module type so Node reads dist/esm as ESM and dist/cjs as CommonJS.
writeFileSync("dist/esm/package.json", JSON.stringify({ type: "module" }) + "\n");
writeFileSync("dist/cjs/package.json", JSON.stringify({ type: "commonjs" }) + "\n");
