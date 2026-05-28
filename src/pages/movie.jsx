import { useRef } from "react"
import { PopularMovies, TopRatedMovies, UpcomingMovies } from "../axios/movies"
import MovieCard from "../components/moviecard"
import useMovies from "../hooks/useMovies";

function Movie() {
  const popularRef = useRef(null)
  const topRatedRef = useRef(null)
  const upcomingRef = useRef(null)

  const scroll = (ref, dir) => {
    ref.current.scrollBy({ left: dir === "left" ? -600 : 600, behavior: "smooth" })
  }

  const popularMovies = useMovies(PopularMovies)
  const topRatedMovies = useMovies(TopRatedMovies)
  const upcomingMovies = useMovies(UpcomingMovies)

  return (
    <div className="min-h-screen bg-zinc-950 px-8 py-10">

      <section className="mb-12">
        <h2 className="text-white text-2xl font-bold mb-6">Popular Movies</h2>
        <div className="relative group">
          <button onClick={() => scroll(popularRef, "left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">‹</button>
          <div ref={popularRef} className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
            {popularMovies.map((movie) => (
              <div key={movie.id} className="shrink-0 w-40"><MovieCard movie={movie} /></div>
            ))}
          </div>
          <button onClick={() => scroll(popularRef, "right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">›</button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-white text-2xl font-bold mb-6">Top Rated</h2>
        <div className="relative group">
          <button onClick={() => scroll(topRatedRef, "left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">‹</button>
          <div ref={topRatedRef} className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
            {topRatedMovies.map((movie) => (
              <div key={movie.id} className="shrink-0 w-40"><MovieCard movie={movie} /></div>
            ))}
          </div>
          <button onClick={() => scroll(topRatedRef, "right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">›</button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-white text-2xl font-bold mb-6">Upcoming</h2>
        <div className="relative group">
          <button onClick={() => scroll(upcomingRef, "left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">‹</button>
          <div ref={upcomingRef} className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
            {upcomingMovies.map((movie) => (
              <div key={movie.id} className="shrink-0 w-40"><MovieCard movie={movie} /></div>
            ))}
          </div>
          <button onClick={() => scroll(upcomingRef, "right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">›</button>
        </div>
      </section>

    </div>
  )
}

export default Movie