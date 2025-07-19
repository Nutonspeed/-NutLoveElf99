import { AutomationAction, AutomationLog, AutomationRule, AutomationTrigger } from '@/types/automation'

const RULES_KEY = 'automation_rules'
const LOGS_KEY = 'automation_logs'

export let rules: AutomationRule[] = []
export let logs: AutomationLog[] = []

export function loadAutomation() {
  if (typeof window !== 'undefined') {
    const r = localStorage.getItem(RULES_KEY)
    if (r) rules = JSON.parse(r)
    const l = localStorage.getItem(LOGS_KEY)
    if (l) logs = JSON.parse(l)
  }
}

function saveRules() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(RULES_KEY, JSON.stringify(rules))
  }
}

function saveLogs() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs))
  }
}

export function addRule(rule: AutomationRule) {
  rules.push(rule)
  saveRules()
}

export async function triggerEvent(event: AutomationTrigger, payload?: any) {
  const matched = rules.filter(r => r.active && r.trigger === event)
  for (const rule of matched) {
    let result = 'ok'
    try {
      if (rule.action === 'send_broadcast') {
        await sendBroadcast(payload)
      } else if (rule.action === 'create_support_ticket') {
        await createSupportTicket(payload)
      }
    } catch (e) {
      result = 'error'
    }
    const log: AutomationLog = {
      id: Date.now().toString(),
      time: new Date().toISOString(),
      ruleId: rule.id,
      event,
      action: rule.action,
      result,
    }
    logs.push(log)
  }
  saveLogs()
}

export async function sendBroadcast(data?: any) {
  console.log('mock send broadcast', data)
}

export async function createSupportTicket(data?: any) {
  console.log('mock create ticket', data)
}
