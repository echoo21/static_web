import useMovies from "../hooks/useMovies"
import { PopularMovies, TopRatedMovies, UpcomingMovies } from "../axios/movies"
import MovieCard from "../components/MovieCard"
import { Link } from "react-router-dom"

function Home() {
  const popularMovies = useMovies(PopularMovies)
  const topRatedMovies = useMovies(TopRatedMovies)
  const upcomingMovies = useMovies(UpcomingMovies)

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">

        {/* Grid background */}
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

        {/* Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <span className="text-xs text-zinc-400 tracking-widest uppercase">React streaming project</span>
        </div>

        {/* Heading */}
        <h1 className="relative z-10 text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight max-w-2xl mb-6">
          Your next favorite{" "}
          <span className="text-teal-400">stream</span>{" "}
          starts here
        </h1>

        {/* Subtext */}
        <p className="relative z-10 text-zinc-400 text-lg max-w-md leading-relaxed mb-10">
          A modern web streaming platform built with React. Browse movies,
          top-rated films, and upcoming releases — all in one place.
        </p>

        {/* CTA Buttons */}
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

        {/* Feature pills */}
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
            <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            Upcoming
          </span>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-white/5" />

      {/* Movie sections */}
      <div className="mx-auto max-w-7xl px-6 py-16 space-y-16">

        <section>
          <h2 className="text-white text-xl font-semibold mb-6">Popular movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-6">Top rated</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topRatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-white text-xl font-semibold mb-6">Upcoming</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {upcomingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default Home