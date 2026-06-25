import { useMemo } from "react"
import useFetch from "../hooks/useFetch"
import { PopularMovies, TopRatedMovies, UpcomingMovies } from "../axios/movies"
import MovieCard from "../components/moviecard"
import ScrollSection from "../components/ScrollSection"

const LIMIT = 20

function Movie() {
  const popularMovies = useFetch(PopularMovies)
  const topRatedMovies = useFetch(TopRatedMovies)
  const upcomingMovies = useFetch(UpcomingMovies)

  const popularSlice = useMemo(() => popularMovies.slice(0, LIMIT), [popularMovies])
  const topSlice = useMemo(() => topRatedMovies.slice(0, LIMIT), [topRatedMovies])
  const upcomingSlice = useMemo(() => upcomingMovies.slice(0, LIMIT), [upcomingMovies])

  return (
    <div className="min-h-screen bg-zinc-950 px-8 py-10">

      <ScrollSection title="Popular Movies">
        {popularSlice.map((movie) => (
          <div key={movie.id} className="shrink-0 w-40"><MovieCard movie={movie} /></div>
        ))}
      </ScrollSection>

      <ScrollSection title="Top Rated">
        {topSlice.map((movie) => (
          <div key={movie.id} className="shrink-0 w-40"><MovieCard movie={movie} /></div>
        ))}
      </ScrollSection>

      <ScrollSection title="Upcoming">
        {upcomingSlice.map((movie) => (
          <div key={movie.id} className="shrink-0 w-40"><MovieCard movie={movie} /></div>
        ))}
      </ScrollSection>

    </div>
  )
}

export default Movie
