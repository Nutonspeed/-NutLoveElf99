export interface ChatAgent {
  id: string
  name: string
  kpi: number
  online: boolean
}

export let chatAgents: ChatAgent[] = [
  { id: 'agent1', name: 'Alice', kpi: 90, online: true },
  { id: 'agent2', name: 'Bob', kpi: 75, online: true },
  { id: 'agent3', name: 'Cara', kpi: 65, online: true },
  { id: 'agent4', name: 'Dan', kpi: 50, online: false },
  { id: 'agent5', name: 'Eve', kpi: 45, online: true },
  { id: 'agent6', name: 'Frank', kpi: 30, online: false },
]

export function listAgents() {
  return chatAgents
}

export function toggleAgentStatus(id: string) {
  const agent = chatAgents.find((a) => a.id === id)
  if (agent) agent.online = !agent.online
}

export function getAgent(id: string) {
  return chatAgents.find((a) => a.id === id)
}

export function findNextAvailableAgent(): ChatAgent | undefined {
  return chatAgents.find((a) => a.online)
}
