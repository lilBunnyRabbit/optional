---
"@lilbunnyrabbit/optional": minor
---

Ship an ES module build next to the CommonJS one. `import` resolves to `dist/esm`, `require` to `dist/cjs`, each with its own type declarations. The package is now marked side-effect free, so bundlers drop it when unused.
