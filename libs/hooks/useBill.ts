import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useBill(id: string) {
  const { data, error } = useSWR(`/api/bill/${id}`, fetcher)
  return { bill: data, isLoading: !data && !error, error }
}
