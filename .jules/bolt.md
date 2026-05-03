## 03-05-2026 - Native crypto.randomUUID() Performance
**Learning:** Node.js native `crypto.randomUUID()` is significantly faster (~60% faster) than the userland `uuid` package because it uses the native C++ implementation rather than executing JavaScript.
**Action:** Always prefer native `crypto.randomUUID()` over `uuidv4` for UUID generation in Node.js backends for better performance, especially on high-traffic microservices.
