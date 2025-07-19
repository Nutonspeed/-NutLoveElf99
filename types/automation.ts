export type AutomationTrigger = 'order_created' | 'refund_approved'

export type AutomationAction = 'send_broadcast' | 'create_support_ticket'

export interface AutomationRule {
  id: string
  trigger: AutomationTrigger
  action: AutomationAction
  active: boolean
}

export interface AutomationLog {
  id: string
  time: string
  ruleId: string
  event: AutomationTrigger
  action: AutomationAction
  result: string
}
