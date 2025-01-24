---
"@lilbunnyrabbit/optional": major
---

- Fixes `OptionalValue.orElseThrow(messageOrErrorSupplier)` to support default value, string or error supplier.
- Implements `OptionalValue.equals(other)`
- Implements `OptionalValue.contains(value)`
- Implements `OptionalValue.toPromise(messageOrErrorSupplier)`
- Implements `OptionalValue.toString()`
