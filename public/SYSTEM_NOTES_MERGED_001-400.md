### Block AdminTools-091 ถึง 095 ✅
- /tasks ระบบมอบหมายงานในทีม
- /orders/:id/notes เพิ่มโน้ตในออเดอร์
- /tasks/board กระดานงานแบบ Kanban
- /settings/notify-rules กฎการแจ้งเตือนภายใน
- /chat แชทระหว่างแอดมิน (mock only)

---

### Block SystemCore-096 ถึง 100 ✅
- /logs/access บันทึกการเข้าใช้งานแอดมิน
- /settings/lock ตั้งรหัสพิเศษก่อนแก้ค่าหลัก
- /insight/performance Dashboard KPI แบบ mock
- /campaigns UI ตามเงื่อนไขแคมเปญ
- /settings/system-backup export/import config

---

### Block CoreMock-101 ถึง 105 ✅
- /core/mock/store สร้างระบบจัดการ mock แบบรวม
- checkout → thankyou → track-order ใช้ order เดียวกันจาก store
- order จากลูกค้าแสดงฝั่งแอดมินได้จริง
- จำสถานะผ่าน localStorage
- devtools สำหรับ reset/mock ใหม่

---

### Block AuthCore-106 ถึง 110 ✅
- /auth/login mock login + AuthStore
- route guard แยกสิทธิ์ admin/staff/guest
- จำ session ใน localStorage
- /dashboard/profile ดู/แก้ข้อมูลแอดมิน
- /devtools/auth debug ผู้ใช้ปัจจุบัน

---

### Block UICore-111 ถึง 115 ✅
- /dashboard ใช้ DashboardLayout รวมทั้งฝั่งแอดมิน
- /store ใช้ StorefrontLayout
- /fallback ใช้ FallbackComponent รวมทุกสถานะ
- route not found → fallback/404
- Suspense wrapper ครอบทุกหน้า

---

### Block DevCore-116 ถึง 120 ✅
- /devtools แถบควบคุม dev floating bar
- /devtools/flags เปิด/ปิดฟีเจอร์ด้วย flag
- /devtools/env เปลี่ยน environment (dev/preview/prod)
- /footer แสดงเวอร์ชัน mock
- toggle demo data mode บน UI จริง

---

### Block StoreUX-121 ถึง 125 ✅
- /store/dev/responsive toggle ดูแบบ Desktop/Mobile
- /dev/simulator แสดง simulator มือถือจริง
- /store/* โหลดรูปแบบ Lazy Load
- preload route /products/:id ตอน hover
- เพิ่ม bottom nav สำหรับมือถือ

---

### Block StoreBuilder-126 ถึง 130 ✅
- /storefront/theme เลือกธีมหน้าร้าน
- /storefront/colors ปรับสีแบบละเอียด
- /storefront/layout จัดหน้าร้านด้วย Drag & Drop
- /store/preview ดูร้านแบบ live preview
- บันทึก layout/theme ลง MockStore config

---

### Block SaleCampaign-131 ถึง 135 ✅
- /customers/reorder ส่งข้อความกลับหาลูกค้าเก่าที่เคยสั่ง (mock)
- /orders/:id/upsell เสนอสินค้าที่เกี่ยวข้องแบบ Auto Suggestion
- /broadcast ตั้งข้อความ + ส่งย้อนหลัง
- /analytics/conversion กำหนดเป้าหมายการซื้อเสร็จ
- /analytics/campaigns สรุปผลแคมเปญจากโฆษณา

---

### Block Feedback-136 ถึง 140 ✅
- /orders/:id/request-review ส่งคำขอให้ลูกค้ารีวิว
- /store/review/:id ลูกค้าให้ดาว + คำแนะนำ
- /dashboard/reviews แอดมินจัดการรีวิว
- /analytics/reviews สรุปผลคะแนน
- /store/survey/nps แบบสอบถาม NPS

---

### Block MemberPoint-141 ถึง 145 ✅
- /members/tiers ตั้ง Tier ลูกค้า Silver/Gold
- ระบบคิดแต้มให้อัตโนมัติหลังซื้อ
- ใช้แต้มลดราคาตอน checkout
- แต้มมีวันหมดอายุตาม policy
- /rewards หน้าแลกของด้วยแต้ม

---

### Block AdminTeam-146 ถึง 150 ✅
- /admin-role สร้าง/จัดการบทบาทของแอดมิน
- /members/:id/role เลือก role ให้แอดมิน
- /logs/action ดูการกระทำทั้งหมด
- ใช้ Guard ตรวจ role ก่อนเข้า route
- /settings/invite สร้างลิงก์ invite แอดมินใหม่

---

### Block DataIO-151 ถึง 155 ✅
- /customers/export ดึงรายชื่อลูกค้าเป็น CSV
- /orders/export ออเดอร์รายงาน export ได้
- /products/import นำเข้าสินค้าด้วยไฟล์ CSV
- /products/bulk-update แก้สินค้าหลายชิ้นพร้อมกัน
- /tools/import-log บันทึกประวัติ import/export

---

### Block NotiCore-156 ถึง 160 ✅
- /notifications กล่องแจ้งเตือนภายในระบบ
- badge ตัวเลขแจ้งเตือนแสดงทุกหน้า
- /settings/line-notify mock ส่ง LINE Notify
- /settings/web-push toggle แจ้งเตือนผ่าน browser
- /profile/notifications ตั้งค่าการแจ้งเตือนรายบุคคล

---

### Block EmailSystem-161 ถึง 165 ✅
- /email-template สร้าง template ส่งอีเมล
- ส่ง email ยืนยันคำสั่งซื้อ (mock)
- /orders/:id/invoice สร้าง PDF ใบเสร็จ
- /send-invoice mock แนบ PDF ในอีเมล
- /logs/email ดูประวัติการส่งอีเมล

---

### Block DocUpload-166 ถึง 170 ✅
- /checkout/slip-upload แนบสลิปหลังโอน
- /orders/:id/slip แอดมินดูไฟล์ลูกค้า
- /verify/id ลูกค้าอัปโหลดบัตร/เอกสาร
- /orders/:id/attach แนบไฟล์จากแอดมิน
- /storage ดูภาพรวมเอกสารทั้งหมดในระบบ

---

### Block ReturnFlow-171 ถึง 175 ✅
- /orders/:id/return ลูกค้าแจ้งคืนสินค้า
- /returns/:id แอดมินตรวจสอบคำขอ
- /returns/refund กรอกรายละเอียดการคืนเงิน
- /orders/:id/exchange ลูกค้าขอเปลี่ยนสินค้าแทน
- /returns หน้าสรุปทั้งหมด + กราฟสาเหตุ

---

### Block CouponCore-176 ถึง 180 ✅
- /marketing/coupons สร้างคูปอง ลดราคา
- /coupons/:id ตั้งเงื่อนไขการใช้งาน
- /checkout ใช้คูปอง พร้อมตรวจสอบกติกา
- /analytics/coupons รายงานการใช้คูปอง
- ระบบ auto ใส่โปรตามยอดซื้อได้อัตโนมัติ

---

### Block InsightCore-181 ถึง 185 ✅
- /insight/kpi Dashboard สรุปยอดขายหลัก
- /insight/customer วิเคราะห์พฤติกรรมลูกค้า
- /insight/product รายงานสินค้าขายดี
- /insight/time เวลายอดขายพีคในแต่ละวัน
- /insight/export สรุปทั้งหมดเป็น PDF

---

### Block TaxSys-186 ถึง 190 ✅
- /settings/tax ตั้งค่า % VAT และรูปแบบการคิดภาษี
- /checkout แสดงยอดภาษีแยกก่อนสั่งซื้อ
- /orders/:id/tax-invoice สร้างใบกำกับภาษี PDF
- /settings/company ตั้งข้อมูลบริษัท
- /accounting/export export รายงานภาษีแบบบัญชี

---

### Block SupportSys-191 ถึง 195 ✅
- /store/help ศูนย์ช่วยเหลือสำหรับลูกค้า
- /help/contact ลูกค้าส่งเรื่องเข้าระบบ
- /support/inbox แอดมินดูรายการ ticket
- /support/:id ตอบกลับ + ดูประวัติ
- /support/stats สถิติ + SLA การตอบกลับ

---

### Block AutoFlow-196 ถึง 200 ✅
- /automation/rules สร้าง if-then rule อัตโนมัติ
- trigger event แบบ order_created (mock)
- action: ส่งข้อความ / แอด tag / เปิด ticket
- log การทำงานของ workflow แต่ละตัว

### Block 381–385 | Billing Metrics API for External Dashboarding | route: /api/metrics/billing

1. Create /api/metrics/billing endpoint returning summary metrics (mock JSON)
2. Include total billed, total paid, overdue rate, avg payment time
3. Support query params for date range and tag filters
4. Add basic API key auth for external access (mock only)
5. Log API usage to /admin/logs/metrics with timestamp and origin

Status: planned

### Block 386–390 | Billing Archive System & Clean-up Policy | route: /admin/billing/archive

1. Add /admin/billing/archive to manage archived/expired bills
2. Allow admin to manually archive or restore bills
3. Auto-archive unpaid bills older than X days (configurable)
4. Add cleanup policy UI: how long to retain audit/log data
5. Show archive status clearly in bill list and detail view

Status: planned

### Block 391–395 | Customer Portal for Billing History | route: /profile/bills

1. Create /profile/bills page for customers to view their own billing history
2. List all bills with status, date, and total amount
3. Allow customers to filter by status and date range
4. Add links to view /bill/:id and download PDF
5. Hide canceled/expired bills unless toggled

Status: planned

### Block 396–400 | Final Billing Review & Go-Live Checklist | route: /admin/billing/checklist

1. Add /admin/billing/checklist page summarizing billing system readiness
2. Auto-check config: templates, notifications, backup, permissions
3. Show checklist with toggle/checkmark + explanations
4. Provide manual test steps and mock test data generators
5. Add “Ready to Go Live” indicator and timestamp (mock)

Status: planned

### Block 401–405 | System Transition — Post-Billing Integration Phase | route: /admin/dashboard, /core/system

1. Audit all existing billing flows for integration compatibility (e.g., dashboard, report, roles)
2. Refactor route structure and system registry for modular billing blocks
3. Sync billing insights to core dashboard summary (total, due, overdue)
4. Identify redundant mock stores or duplicated state across billing submodules
5. Plan branching path: connect to real database or maintain long-term mock infrastructure

Status: planned

### Block AdminTools-091 ถึง 095 ✅
- /tasks ระบบมอบหมายงานในทีม
- /orders/:id/notes เพิ่มโน้ตในออเดอร์
- /tasks/board กระดานงานแบบ Kanban
- /settings/notify-rules กฎการแจ้งเตือนภายใน
- /chat แชทระหว่างแอดมิน (mock only)

---

### Block SystemCore-096 ถึง 100 ✅
- /logs/access บันทึกการเข้าใช้งานแอดมิน
- /settings/lock ตั้งรหัสพิเศษก่อนแก้ค่าหลัก
- /insight/performance Dashboard KPI แบบ mock
- /campaigns UI ตามเงื่อนไขแคมเปญ
- /settings/system-backup export/import config

---

### Block CoreMock-101 ถึง 105 ✅
- /core/mock/store สร้างระบบจัดการ mock แบบรวม
- checkout → thankyou → track-order ใช้ order เดียวกันจาก store
- order จากลูกค้าแสดงฝั่งแอดมินได้จริง
- จำสถานะผ่าน localStorage
- devtools สำหรับ reset/mock ใหม่

---

### Block AuthCore-106 ถึง 110 ✅
- /auth/login mock login + AuthStore
- route guard แยกสิทธิ์ admin/staff/guest
- จำ session ใน localStorage
- /dashboard/profile ดู/แก้ข้อมูลแอดมิน
- /devtools/auth debug ผู้ใช้ปัจจุบัน

---

### Block UICore-111 ถึง 115 ✅
- /dashboard ใช้ DashboardLayout รวมทั้งฝั่งแอดมิน
- /store ใช้ StorefrontLayout
- /fallback ใช้ FallbackComponent รวมทุกสถานะ
- route not found → fallback/404
- Suspense wrapper ครอบทุกหน้า

---

### Block DevCore-116 ถึง 120 ✅
- /devtools แถบควบคุม dev floating bar
- /devtools/flags เปิด/ปิดฟีเจอร์ด้วย flag
- /devtools/env เปลี่ยน environment (dev/preview/prod)
- /footer แสดงเวอร์ชัน mock
- toggle demo data mode บน UI จริง

---

### Block StoreUX-121 ถึง 125 ✅
- /store/dev/responsive toggle ดูแบบ Desktop/Mobile
- /dev/simulator แสดง simulator มือถือจริง
- /store/* โหลดรูปแบบ Lazy Load
- preload route /products/:id ตอน hover
- เพิ่ม bottom nav สำหรับมือถือ

---

### Block StoreBuilder-126 ถึง 130 ✅
- /storefront/theme เลือกธีมหน้าร้าน
- /storefront/colors ปรับสีแบบละเอียด
- /storefront/layout จัดหน้าร้านด้วย Drag & Drop
- /store/preview ดูร้านแบบ live preview
- บันทึก layout/theme ลง MockStore config

---

### Block SaleCampaign-131 ถึง 135 ✅
- /customers/reorder ส่งข้อความกลับหาลูกค้าเก่าที่เคยสั่ง (mock)
- /orders/:id/upsell เสนอสินค้าที่เกี่ยวข้องแบบ Auto Suggestion
- /broadcast ตั้งข้อความ + ส่งย้อนหลัง
- /analytics/conversion กำหนดเป้าหมายการซื้อเสร็จ
- /analytics/campaigns สรุปผลแคมเปญจากโฆษณา

---

### Block Feedback-136 ถึง 140 ✅
- /orders/:id/request-review ส่งคำขอให้ลูกค้ารีวิว
- /store/review/:id ลูกค้าให้ดาว + คำแนะนำ
- /dashboard/reviews แอดมินจัดการรีวิว
- /analytics/reviews สรุปผลคะแนน
- /store/survey/nps แบบสอบถาม NPS

---

### Block MemberPoint-141 ถึง 145 ✅
- /members/tiers ตั้ง Tier ลูกค้า Silver/Gold
- ระบบคิดแต้มให้อัตโนมัติหลังซื้อ
- ใช้แต้มลดราคาตอน checkout
- แต้มมีวันหมดอายุตาม policy
- /rewards หน้าแลกของด้วยแต้ม

---

### Block AdminTeam-146 ถึง 150 ✅
- /admin-role สร้าง/จัดการบทบาทของแอดมิน
- /members/:id/role เลือก role ให้แอดมิน
- /logs/action ดูการกระทำทั้งหมด
- ใช้ Guard ตรวจ role ก่อนเข้า route
- /settings/invite สร้างลิงก์ invite แอดมินใหม่

---

### Block DataIO-151 ถึง 155 ✅
- /customers/export ดึงรายชื่อลูกค้าเป็น CSV
- /orders/export ออเดอร์รายงาน export ได้
- /products/import นำเข้าสินค้าด้วยไฟล์ CSV
- /products/bulk-update แก้สินค้าหลายชิ้นพร้อมกัน
- /tools/import-log บันทึกประวัติ import/export

---

### Block NotiCore-156 ถึง 160 ✅
- /notifications กล่องแจ้งเตือนภายในระบบ
- badge ตัวเลขแจ้งเตือนแสดงทุกหน้า
- /settings/line-notify mock ส่ง LINE Notify
- /settings/web-push toggle แจ้งเตือนผ่าน browser
- /profile/notifications ตั้งค่าการแจ้งเตือนรายบุคคล

---

### Block EmailSystem-161 ถึง 165 ✅
- /email-template สร้าง template ส่งอีเมล
- ส่ง email ยืนยันคำสั่งซื้อ (mock)
- /orders/:id/invoice สร้าง PDF ใบเสร็จ
- /send-invoice mock แนบ PDF ในอีเมล
- /logs/email ดูประวัติการส่งอีเมล

---

### Block DocUpload-166 ถึง 170 ✅
- /checkout/slip-upload แนบสลิปหลังโอน
- /orders/:id/slip แอดมินดูไฟล์ลูกค้า
- /verify/id ลูกค้าอัปโหลดบัตร/เอกสาร
- /orders/:id/attach แนบไฟล์จากแอดมิน
- /storage ดูภาพรวมเอกสารทั้งหมดในระบบ

---

### Block ReturnFlow-171 ถึง 175 ✅
- /orders/:id/return ลูกค้าแจ้งคืนสินค้า
- /returns/:id แอดมินตรวจสอบคำขอ
- /returns/refund กรอกรายละเอียดการคืนเงิน
- /orders/:id/exchange ลูกค้าขอเปลี่ยนสินค้าแทน
- /returns หน้าสรุปทั้งหมด + กราฟสาเหตุ

---

### Block CouponCore-176 ถึง 180 ✅
- /marketing/coupons สร้างคูปอง ลดราคา
- /coupons/:id ตั้งเงื่อนไขการใช้งาน
- /checkout ใช้คูปอง พร้อมตรวจสอบกติกา
- /analytics/coupons รายงานการใช้คูปอง
- ระบบ auto ใส่โปรตามยอดซื้อได้อัตโนมัติ

---

### Block InsightCore-181 ถึง 185 ✅
- /insight/kpi Dashboard สรุปยอดขายหลัก
- /insight/customer วิเคราะห์พฤติกรรมลูกค้า
- /insight/product รายงานสินค้าขายดี
- /insight/time เวลายอดขายพีคในแต่ละวัน
- /insight/export สรุปทั้งหมดเป็น PDF

---

### Block TaxSys-186 ถึง 190 ✅
- /settings/tax ตั้งค่า % VAT และรูปแบบการคิดภาษี
- /checkout แสดงยอดภาษีแยกก่อนสั่งซื้อ
- /orders/:id/tax-invoice สร้างใบกำกับภาษี PDF
- /settings/company ตั้งข้อมูลบริษัท
- /accounting/export export รายงานภาษีแบบบัญชี

---

### Block SupportSys-191 ถึง 195 ✅
- /store/help ศูนย์ช่วยเหลือสำหรับลูกค้า
- /help/contact ลูกค้าส่งเรื่องเข้าระบบ
- /support/inbox แอดมินดูรายการ ticket
- /support/:id ตอบกลับ + ดูประวัติ
- /support/stats สถิติ + SLA การตอบกลับ

---

### Block AutoFlow-196 ถึง 200 ✅
- /automation/rules สร้าง if-then rule อัตโนมัติ
- trigger event แบบ order_created (mock)
- action: ส่งข้อความ / แอด tag / เปิด ticket
- log การทำงานของ workflow แต่ละตัว

### Block 381–385 | Billing Metrics API for External Dashboarding | route: /api/metrics/billing

1. Create /api/metrics/billing endpoint returning summary metrics (mock JSON)
2. Include total billed, total paid, overdue rate, avg payment time
3. Support query params for date range and tag filters
4. Add basic API key auth for external access (mock only)
5. Log API usage to /admin/logs/metrics with timestamp and origin

Status: planned

### Block 386–390 | Billing Archive System & Clean-up Policy | route: /admin/billing/archive

1. Add /admin/billing/archive to manage archived/expired bills
2. Allow admin to manually archive or restore bills
3. Auto-archive unpaid bills older than X days (configurable)
4. Add cleanup policy UI: how long to retain audit/log data
5. Show archive status clearly in bill list and detail view

Status: planned

### Block 391–395 | Customer Portal for Billing History | route: /profile/bills

1. Create /profile/bills page for customers to view their own billing history
2. List all bills with status, date, and total amount
3. Allow customers to filter by status and date range
4. Add links to view /bill/:id and download PDF
5. Hide canceled/expired bills unless toggled

Status: planned

### Block 396–400 | Final Billing Review & Go-Live Checklist | route: /admin/billing/checklist

1. Add /admin/billing/checklist page summarizing billing system readiness
2. Auto-check config: templates, notifications, backup, permissions
3. Show checklist with toggle/checkmark + explanations
4. Provide manual test steps and mock test data generators
5. Add “Ready to Go Live” indicator and timestamp (mock)

Status: planned

### Block 401–405 | System Transition — Post-Billing Integration Phase | route: /admin/dashboard, /core/system

1. Audit all existing billing flows for integration compatibility (e.g., dashboard, report, roles)
2. Refactor route structure and system registry for modular billing blocks
3. Sync billing insights to core dashboard summary (total, due, overdue)
4. Identify redundant mock stores or duplicated state across billing submodules
5. Plan branching path: connect to real database or maintain long-term mock infrastructure

Status: planned