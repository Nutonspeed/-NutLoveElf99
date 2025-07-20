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

## Block 361–365 | Billing Role Permissions & Restrictions | route: /admin/settings/roles

1. Add role-based permissions for billing features (view, edit, delete, export)
2. Extend existing role system to support bill-level control granularity
3. Prevent unauthorized access to sensitive actions (e.g. resend, mark paid)
4. Add UI indicators and disabled states based on permission
5. Log blocked actions with reason for audit visibility

Status: planned
