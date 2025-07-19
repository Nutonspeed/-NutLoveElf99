export interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
}

export interface EmailLog {
  id: string
  to: string
  subject: string
  templateId: string
  orderId?: string
  customerId?: string
  sentAt: string
}

const TEMPLATE_KEY = 'emailTemplates'
const LOG_KEY = 'emailLogs'
const SELECT_KEY = 'selectedEmailTemplate'

export let emailTemplates: EmailTemplate[] = [
  {
    id: 'default',
    name: 'Default Confirmation',
    subject: 'Order {{order.id}} Confirmation',
    content:
      '<p>Hello {{customer.name}}, your order {{order.id}} totaling {{order.total}} has been received.</p>',
  },
]

export let emailLogs: EmailLog[] = []
export let selectedTemplateId = 'default'

export function loadEmailData() {
  if (typeof window !== 'undefined') {
    const t = localStorage.getItem(TEMPLATE_KEY)
    if (t) emailTemplates = JSON.parse(t)
    const l = localStorage.getItem(LOG_KEY)
    if (l) emailLogs = JSON.parse(l)
    const s = localStorage.getItem(SELECT_KEY)
    if (s) selectedTemplateId = s
  }
}

function saveTemplates() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TEMPLATE_KEY, JSON.stringify(emailTemplates))
  }
}

function saveLogs() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOG_KEY, JSON.stringify(emailLogs))
  }
}

export function setSelectedTemplate(id: string) {
  selectedTemplateId = id
  if (typeof window !== 'undefined') {
    localStorage.setItem(SELECT_KEY, id)
  }
}

export function getEmailTemplate(id: string) {
  return emailTemplates.find((t) => t.id === id)
}

export function addEmailTemplate(data: Omit<EmailTemplate, 'id'>) {
  const template: EmailTemplate = { id: Date.now().toString(), ...data }
  emailTemplates.unshift(template)
  saveTemplates()
  return template
}

export function updateEmailTemplate(id: string, data: Partial<Omit<EmailTemplate, 'id'>>) {
  const t = emailTemplates.find((tmp) => tmp.id === id)
  if (t) {
    Object.assign(t, data)
    saveTemplates()
  }
  return t
}

export function deleteEmailTemplate(id: string) {
  const idx = emailTemplates.findIndex((t) => t.id === id)
  if (idx !== -1) {
    emailTemplates.splice(idx, 1)
    saveTemplates()
  }
}

function replaceVars(text: string, vars: Record<string, string>) {
  let res = text
  Object.keys(vars).forEach((k) => {
    res = res.replace(new RegExp(`{{${k}}}`, 'g'), vars[k])
  })
  return res
}

export function sendEmail(to: string, vars: Record<string, string>, templateId = selectedTemplateId) {
  const t = getEmailTemplate(templateId)
  if (!t) return false
  const subject = replaceVars(t.subject, vars)
  const content = replaceVars(t.content, vars)
  console.log('Mock send email', { to, subject })
  emailLogs.unshift({
    id: Date.now().toString(),
    to,
    subject,
    templateId,
    orderId: vars['order.id'],
    customerId: vars['customer.id'],
    sentAt: new Date().toISOString(),
  })
  saveLogs()
  return true
}

export function getEmailLogs() {
  return emailLogs
}

export function clearEmailLogs() {
  emailLogs = []
  saveLogs()
}
