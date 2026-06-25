import { useEffect, useState } from "react"

function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState([])

  useEffect(() => {
    let cancelled = false
    fetchFn().then(r => {
      if (!cancelled && r) {
        // TMDB list endpoints return { results: [...] }, detail endpoints return the object directly
        setData(r.results ?? r)
      }
    })
    return () => { cancelled = true }
  }, deps)

  return data
}

export default useFetch
