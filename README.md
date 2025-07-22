
# Sofa Store Billing Demo

This repo is a Next.js project powering a custom-made backend and storefront for a sofa cover business driven by Facebook Ads.  
It is inspired by Page365's workflow, tailored for internal use by the store's admin team.

---

## 🛋️ Business Context: Sofa Cover Retail

This platform is for a sofa cover store that does not use live selling or shopping carts.  
Instead, customers message via Facebook/LINE, view fabric collections via links, and receive personalized bills from staff.

- No Add to Cart
- No online checkout
- Admins manage chats, send links, and issue bills manually
- Focused on 40–50 real fabric collections, each with 1–20 fabric designs

---

## 📁 System Notes

This project uses a single source of truth for all development progress:

👉 `public/SYSTEM_NOTES_FINAL.md`

Do NOT use legacy files like:
- BACKLOG.md
- SYSTEM_NOTES_MERGED_001-400.md
- BLOCK_*.md

---

## ✅ Current Features (Summary)

- `/admin/bill/create` — Create new bills with print-ready layout
- `/admin/customers/[id]/notes` — Add private notes to customer profile
- `/admin/settings/team` — Role-based team access
- `/admin/dev/summary` — Developer tools panel
- `/collections/[slug]` — Public fabric collection pages (real data)
- `/fabrics/[slug]` — Individual fabric details (WIP)

---

## 🧵 Product Collections

All collections and fabrics shown on the storefront are real.  
This replaces prior Google Photos workflow.  
Customers can click on a fabric to send feedback directly into chat (WIP).

---

## Getting Started

```bash
pnpm install
pnpm dev
```

---

## Testing

```bash
pnpm test
```

Vitest is configured with minimal sample tests.

