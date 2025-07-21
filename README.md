# Sofa Store Billing Demo

This repo is a Next.js project demonstrating a simple billing workflow. All data is stored in JSON files through the mock store under `core/mock/store` so it can run without a real database.

## Features

- **Admin bills** — manage bills at `/admin/bills` and print receipts.
- **Receipt pages** — view a receipt at `/receipt/[billId]` and use `/print` for a printer‑friendly layout.
- **DevTools** — `/dashboard/devtools` provides tools to reset mock data and switch environment modes. A floating `DevBar` is also available during development.
- **Block‑based dev flow** — development notes are recorded in `public/SYSTEM_NOTES_MERGED_001-400.md` using numbered blocks.

## Getting Started

```bash
pnpm install
pnpm dev
```

This starts the Next.js development server on <http://localhost:3000>.

## Testing

Vitest is configured but only contains minimal dummy tests at the moment.
Run all tests with:

```bash
pnpm test
```

## Mock Store

To generate or reset mock data visit `/dashboard/devtools/mock` or use the floating DevBar. All mock operations load and persist data to `localStorage`.

---

MIT License. See `LICENSE` for details.
