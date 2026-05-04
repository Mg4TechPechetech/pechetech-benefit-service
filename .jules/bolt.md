## 15-06-2024 - Prefer native `crypto.randomUUID()` over `uuid` package
**Learning:** Native `crypto.randomUUID()` available in Node.js (v14.17.0+) is generally faster and doesn't require an external dependency compared to the popular `uuid` npm package.
**Action:** Always prefer using `crypto.randomUUID()` when generating v4 UUIDs in Node.js environments unless specific legacy compatibility is required.
