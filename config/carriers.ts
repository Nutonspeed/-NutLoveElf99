export const carriers = ['Kerry', 'Flash', 'JT', 'EMS'] as const
export type Carrier = (typeof carriers)[number]
