## 02-05-2024 - [Replace uuid with Node native crypto.randomUUID()]
**Learning:** Node.js native `crypto.randomUUID()` is significantly faster than the widely used `uuid` package for UUID generation, especially inside tight loops. It reduces overhead and memory usage.
**Action:** Prefer `crypto.randomUUID()` over external `uuid` libraries in Node.js environments when creating unique identifiers, to save milliseconds and reduce dependency sizes.
