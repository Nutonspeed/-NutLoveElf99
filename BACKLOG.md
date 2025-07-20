# Backlog

## Block 296–300 | Billing Automation & Triggers | route: /automation/billing

1. Create rule builder to define billing automation rules (if condition → then create/send bill)
2. Add support for order-based conditions (e.g., total > 1,000 or has coupon)
3. Add time-based scheduling (e.g., auto-generate bills every 9am)
4. Trigger webhook/LINE when bill is auto-created (mock only)
5. Add automation log UI with timestamp, status, rule name

Status: in progress

## Block 346–350 | Bill Access Control & Share Permissions | route: /admin/bill/:id/share

1. Add /admin/bill/:id/share page to manage bill sharing permissions
2. Generate secure, token-based public link (mock logic)
3. Add option to set link expiration or access count limit
4. Toggle allow-download / view-only access per bill
5. Log all external accesses to bill with timestamp and IP (mock)

Status: planned

## Block 376–380 | Billing Performance Reports & Export | route: /admin/reports/billing

1. Create /admin/reports/billing page to show billing performance summary
2. Add chart widgets: total billed, paid rate, avg time to pay
3. Enable filter by tag, customer group, or time range
4. Export report as PDF or CSV
5. Auto-generate monthly reports with mock scheduler

Status: planned
