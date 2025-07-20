# Backlog

## Block 296–300 | Billing Automation & Triggers | route: /automation/billing

1. Create rule builder to define billing automation rules (if condition → then create/send bill)
2. Add support for order-based conditions (e.g., total > 1,000 or has coupon)
3. Add time-based scheduling (e.g., auto-generate bills every 9am)
4. Trigger webhook/LINE when bill is auto-created (mock only)
5. Add automation log UI with timestamp, status, rule name

Status: in progress


## Block 356–360 | Bill Audit Trail & Access Logs | route: /admin/bill/:id/audit

1. Create audit tab in /admin/bill/:id to display bill access history
2. Log all admin/user actions (view, edit, resend, pay) with timestamp
3. Store access source: IP, device type, role (mock logic)
4. Highlight risky or unusual access patterns (e.g. multiple views in short time)
5. Add export button to download audit trail as CSV

Status: planned
