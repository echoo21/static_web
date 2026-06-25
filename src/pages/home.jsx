import { useMemo } from "react"
import useFetch from "../hooks/useFetch"
import { PopularMovies, TopRatedMovies, UpcomingMovies } from "../axios/movies"
import MovieCard from "../components/moviecard"
import { Link } from "react-router-dom"

function Home() {
  const popularMovies = useFetch(PopularMovies)
  const topRatedMovies = useFetch(TopRatedMovies)
  const upcomingMovies = useFetch(UpcomingMovies)

  // Limit items per section so we don't render hundreds of cards
  const limitedPopular = useMemo(() => popularMovies.slice(0, 20), [popularMovies])
  const limitedTop = useMemo(() => topRatedMovies.slice(0, 20), [topRatedMovies])
  const limitedUpcoming = useMemo(() => upcomingMovies.slice(0, 20), [upcomingMovies])

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">

        {/* Grid background — CSS only, no cost */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <span className="text-xs text-zinc-400 tracking-widest uppercase">React streaming project</span>
        </div>

        <h1 className="relative z-10 text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight max-w-2xl mb-6">
          Your next favorite{" "}
          <span className="text-teal-400">stream</span>{" "}
          starts here
        </h1>

        <p className="relative z-10 text-zinc-400 text-lg max-w-md leading-relaxed mb-10">
          A modern web streaming platform built with React. Browse movies,
          top-rated films, and upcoming releases — all in one place.
        </p>

        <div className="relative z-10 flex items-center gap-3 flex-wrap justify-center">
          <Link
            to="/movie"
            className="flex items-center gap-2 bg-white text-zinc-950 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-zinc-100 transition-colors duration-200"
          >
            Get started
          </Link>
          <Link
            to="/movie"
            className="flex items-center gap-2 text-white border border-white/15 px-6 py-3 rounded-xl text-sm hover:bg-white/5 transition-colors duration-200"
          >
            Browse movies
          </Link>
        </div>

        <div className="relative z-10 flex items-center gap-8 mt-16 text-zinc-600 text-sm">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg>
            Popular movies
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Top rated
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            Upcoming
          </span>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* Movie sections with content-visibility: auto for offscreen deferred rendering */}
      <div className="mx-auto max-w-7xl px-6 py-16 space-y-16">

        <section style={{ contentVisibility: "auto", containIntrinsicSize: "400px" }}>
          <h2 className="text-white text-xl font-semibold mb-6">Popular movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {limitedPopular.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section style={{ contentVisibility: "auto", containIntrinsicSize: "400px" }}>
          <h2 className="text-white text-xl font-semibold mb-6">Top rated</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {limitedTop.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section style={{ contentVisibility: "auto", containIntrinsicSize: "400px" }}>
          <h2 className="text-white text-xl font-semibold mb-6">Upcoming</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {limitedUpcoming.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default Home
