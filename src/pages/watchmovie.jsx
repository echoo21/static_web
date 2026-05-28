import { useState } from "react"
import useMovieDetail from "../hooks/useMovieDetail";
import { useParams } from "react-router-dom";

const SOURCES = [
    { label: "Server 1", url: (id) => `https://1embed.cc/embed/movie/${id}` },
    { label: "Server 2", url: (id) => `https://vidsrc.to/embed/movie/${id}` },
    { label: "Server 3", url: (id) => `https://www.vidking.net/embed/movie/${id}` }
]

function WatchMovie() {
    const { id } = useParams()
    const watchmovie = useMovieDetail(id);
    const [activeSource, setActiveSource] = useState(0)

    const hours = Math.floor(watchmovie.runtime / 60)
    const mins = watchmovie.runtime % 60

    return (
        <div className="min-h-screen bg-zinc-950">

            {/* Backdrop */}
            <div className="relative w-full h-[55vh] overflow-hidden">
                <img
                    src={`https://image.tmdb.org/t/p/original${watchmovie.backdrop_path}`}
                    alt={watchmovie.title}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />
            </div>

            <div className="mx-auto max-w-5xl px-4 sm:px-6 -mt-40 relative z-10 pb-20">

                {/* Poster + Info */}
                <div className="flex flex-col sm:flex-row gap-6 items-end mb-8">
                    <div className="shrink-0 w-36 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${watchmovie.poster_path}`}
                            alt={watchmovie.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white mb-1">
                            {watchmovie.title}
                            <span className="text-zinc-500 text-xl font-normal ml-2">({watchmovie.release_date?.slice(0, 4)})</span>
                        </h1>
                        <p className="text-teal-400 italic text-sm mb-3">{watchmovie.tagline}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {watchmovie.genres?.map(g => (
                                <span key={g.id} className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 border border-white/15 text-zinc-300">
                                    {g.name}
                                </span>
                            ))}
                            <span className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 border border-white/15 text-zinc-300">
                                {hours}h {mins}m
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 border border-white/15 text-zinc-300">
                                {watchmovie.status}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { label: "Score", value: watchmovie.vote_average?.toFixed(1) },
                                { label: "Votes", value: watchmovie.vote_count?.toLocaleString() },
                                { label: "Budget", value: `$${(watchmovie.budget / 1e6).toFixed(0)}M` },
                                { label: "Revenue", value: `$${(watchmovie.revenue / 1e6).toFixed(0)}M` },
                            ].map(s => (
                                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
                                    <div className="text-white font-bold text-base">{s.value}</div>
                                    <div className="text-zinc-500 text-xs uppercase tracking-wider">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Overview */}
                <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Overview</p>
                <p className="text-zinc-300 leading-relaxed mb-4">{watchmovie.overview}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-8">
                    <p><span className="text-zinc-500">Language: </span><span className="text-white uppercase">{watchmovie.original_language}</span></p>
                    <p><span className="text-zinc-500">Countries: </span><span className="text-white">{watchmovie.production_countries?.map(c => c.name).join(" · ")}</span></p>
                    <p><span className="text-zinc-500">Languages: </span><span className="text-white">{watchmovie.spoken_languages?.map(l => l.english_name).join(", ")}</span></p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/5 mb-8" />

                {/* Source switcher */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-zinc-500 text-xs uppercase tracking-widest mr-2">Source</span>
                    {SOURCES.map((source, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveSource(i)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${activeSource === i
                                ? "bg-white text-zinc-950 border-white"
                                : "bg-transparent text-zinc-400 border-white/15 hover:text-white hover:border-white/30"
                                }`}
                        >
                            {source.label}
                        </button>
                    ))}
                </div>
                <div> bro use some adblocker </div>
                {/* Player */}
                <iframe
                    key={activeSource}
                    src={SOURCES[activeSource].url(watchmovie.id)}
                    width="100%" height="100%"
                    allowFullScreen allow="autoplay; encrypted-media"
                    style={{ border: "none", aspectRatio: "16/9", borderRadius: "12px" }}
                />

                {/* Production companies */}
                <div className="mt-8">
                    <p className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Production</p>
                    <div className="flex flex-wrap gap-2">
                        {watchmovie.production_companies?.map(c => (
                            <span key={c.id} className="px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-zinc-400">
                                {c.name}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WatchMovie