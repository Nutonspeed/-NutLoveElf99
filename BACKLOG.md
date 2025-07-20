# Backlog

## Block 296–300 | Billing Automation & Triggers | route: /automation/billing

1. Create rule builder to define billing automation rules (if condition → then create/send bill)
2. Add support for order-based conditions (e.g., total > 1,000 or has coupon)
3. Add time-based scheduling (e.g., auto-generate bills every 9am)
4. Trigger webhook/LINE when bill is auto-created (mock only)
5. Add automation log UI with timestamp, status, rule name

Status: in progress

## Block 321–325 | Print & Export System | route: /admin/print, /admin/bill/:id/print

1. Create /admin/print settings page for configuring templates (invoice, shipping label)
2. Add /admin/bill/:id/print route to show printable version of the bill
3. Support PDF export with proper layout and mock customer/order data
4. Add buttons: “Print”, “Download PDF”, and “Copy for LINE”
5. Style print layout to fit A4 + sticker label size

Status: done
