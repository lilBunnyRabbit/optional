# @lilbunnyrabbit/optional

## 1.1.0

### Minor Changes

- 1720a5f: Ship an ES module build next to the CommonJS one. `import` resolves to `dist/esm`, `require` to `dist/cjs`, each with its own type declarations. The package is now marked side-effect free, so bundlers drop it when unused.

## 1.0.1

### Patch Changes

- 2832edd: docs: GitHub Sponsor

## 1.0.0

### Major Changes

- 52245a3: - Fixes `OptionalValue.orElseThrow(messageOrErrorSupplier)` to support default value, string or error supplier.
  - Implements `OptionalValue.equals(other)`
  - Implements `OptionalValue.contains(value)`
  - Implements `OptionalValue.toPromise(messageOrErrorSupplier)`
  - Implements `OptionalValue.toString()`

## 0.0.1

### Patch Changes

- 05e4aea: Fixes documentation
