"use client"
import useSWR from 'swr'
import type { FakeBill } from '@/core/mock/fakeBillDB'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useBillSync(id: string) {
  const { data, error, mutate } = useSWR<FakeBill>(`/api/bill/view/${id}`, fetcher, {
    refreshInterval: 5000,
  })
  return { bill: data, isLoading: !data && !error, error, mutate }
}
