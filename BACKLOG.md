# Backlog

## Block 276–280 | Order Management & Reporting | various routes

1. Auto Order Status Update (route: /api/orders/update-status) - Run every X mins in dev to sync mock delivery status; mark delivered orders as completed and save to mock/store/orders.json
2. Admin Order Activity Log (route: /admin/logs/orders) - Show all actions such as bill created, payment confirmed and shipped; track by admin user (mock session) and store in mock/store/activity-log.json
3. Export Accounting Summary (route: /admin/export/accounting) - Export monthly revenue per bill as CSV with date, bill ID, total and payment status; log all exports to mock/store/export-log.json
4. Customer Summary Dashboard (route: /admin/customers/summary) - Display total customers, repeat rate and average spend with a chart of top 5 customers from customers.json and bills.json
5. Daily Report Print (route: /admin/reports/daily/print) - Printable summary of orders and revenue with auto layout (A4 or thermal) based on selected date

Status: planned

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

## Block 386–390 | Billing Archive System & Clean-up Policy | route: /admin/billing/archive

1. Add /admin/billing/archive to manage archived/expired bills
2. Allow admin to manually archive or restore bills
3. Auto-archive unpaid bills older than X days (configurable)
4. Add cleanup policy UI: how long to retain audit/log data
5. Show archive status clearly in bill list and detail view

Status: planned

## Block 401–405 | System Transition — Post-Billing Integration Phase | route: /admin/dashboard, /core/system

1. Audit all existing billing flows for integration compatibility (e.g., dashboard, report, roles)
2. Refactor route structure and system registry for modular billing blocks
3. Sync billing insights to core dashboard summary (total, due, overdue)
4. Identify redundant mock stores or duplicated state across billing submodules
5. Plan branching path: connect to real database or maintain long-term mock infrastructure

Status: planned
