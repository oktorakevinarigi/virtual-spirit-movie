import { useEffect, useState } from 'react'

export function useDebounce(val: string, delay: number) {
  const [debounceVal, setDebounce] = useState<string>(val)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(val)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  })
  return debounceVal
}
