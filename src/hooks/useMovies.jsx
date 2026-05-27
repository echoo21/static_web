import { useEffect, useState } from "react"

function useMovies(fetchFunction) {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchFunction()
      if (data) {
        setMovies(data.results)
      }
    }
    loadMovies()
  }, [])

  return movies
}

export default useMovies