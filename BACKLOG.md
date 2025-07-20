# Backlog

## Block 296–300 | Billing Automation & Triggers | route: /automation/billing

1. Create rule builder to define billing automation rules (if condition → then create/send bill)
2. Add support for order-based conditions (e.g., total > 1,000 or has coupon)
3. Add time-based scheduling (e.g., auto-generate bills every 9am)
4. Trigger webhook/LINE when bill is auto-created (mock only)
5. Add automation log UI with timestamp, status, rule name

Status: in progress


## Block 341–345 | Billing Notification System | route: /admin/notify/bills

1. Create /admin/notify/bills to manage notifications for billing events
2. Add toggle options for email, LINE, in-app notification per bill status
3. Allow custom message templates (due soon, overdue, paid)
4. Show notification history per bill with timestamp and channel
5. Simulate/send notification preview from admin panel (mock only)

Status: done
