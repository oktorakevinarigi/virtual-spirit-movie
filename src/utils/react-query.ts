import { QueryClient } from '@tanstack/react-query'

export type Query = Record<string, string | string[] | number | boolean | null | undefined>

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
})

export function cleanQuery(query: Query) {
  return Object.keys(query).reduce(
    (cleanedQuery, queryKey) =>
      query[queryKey] ? { ...cleanedQuery, [queryKey]: query[queryKey] } : { ...cleanedQuery },
    {} as Query
  )
}

export function queryToString(query: Query) {
  return (
    '?' +
    Object.keys(query)
      .map(queryKey => (query[queryKey] ? `${queryKey}=${query[queryKey]}` : null))
      .filter(Boolean)
      .join('&')
  )
}
