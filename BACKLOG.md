# Backlog

## Block 296–300 | Billing Automation & Triggers | route: /automation/billing

1. Create rule builder to define billing automation rules (if condition → then create/send bill)
2. Add support for order-based conditions (e.g., total > 1,000 or has coupon)
3. Add time-based scheduling (e.g., auto-generate bills every 9am)
4. Trigger webhook/LINE when bill is auto-created (mock only)
5. Add automation log UI with timestamp, status, rule name

Status: in progress

## Block 326–330 | PDF Template & Branding Config | route: /admin/print/templates

1. Create /admin/print/templates for managing printable template presets
2. Allow editing header, footer, logo, watermark, and signature image
3. Support multiple template types: invoice, tax invoice, shipping label
4. Add live preview of PDF with mock data before saving
5. Save template config to mockStore and apply when generating documents

Status: planned
