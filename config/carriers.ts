export const carriers = ['Flash', 'Kerry', 'ไปรษณีย์ไทย', 'J&T'] as const
export type Carrier = (typeof carriers)[number]
