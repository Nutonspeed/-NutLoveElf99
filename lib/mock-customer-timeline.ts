export type ActivityType = 'order' | 'fabric' | 'claim' | 'review'

export interface CustomerActivity {
  id: string
  customerId: string
  type: ActivityType
  admin: string
  timestamp: string
}

let initialActivities: CustomerActivity[] = [
  {
    id: '1',
    customerId: '2',
    type: 'order',
    admin: 'Admin A',
    timestamp: new Date().toISOString(),
  },
]

export let activities: CustomerActivity[] = [...initialActivities]

export function loadActivities() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('customerActivities')
    if (stored) activities = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('customerActivities', JSON.stringify(activities))
  }
}

export function addActivity(data: Omit<CustomerActivity, 'id'>) {
  const entry: CustomerActivity = { ...data, id: Date.now().toString() }
  activities = [entry, ...activities]
  save()
  return entry
}

export function listActivities(customerId: string) {
  return activities.filter((a) => a.customerId === customerId)
}
