import { useState } from "react"
import useDramaDetail from "../hooks/useDramaDetail"
import { useParams } from "react-router-dom"

const SOURCES = [
    { label: "Server 1", url: (id, s, e) => `https://1embed.cc/embed/tv/${id}/${s}/${e}` },
    { label: "Server 2", url: (id, s, e) => `https://vidsrc.to/embed/tv/${id}/${s}/${e}` },
    { label: "Server 3", url: (id, s, e) => `https://www.vidking.net/embed/tv/${id}/${s}/${e}` },
]

function StreamingDrama() {
    const { id } = useParams()
    const show = useDramaDetail(id)
    const [activeSource, setActiveSource] = useState(0)
    const [season, setSeason] = useState(1)
    const [episode, setEpisode] = useState(1)

    const runtime = show.episode_run_time?.[0] ?? 0
    const hours = Math.floor(runtime / 60)
    const mins = runtime % 60

    // seasons array already contains episode_count — no extra fetch needed
    const seasons = show.seasons?.filter(s => s.season_number > 0) ?? []
    const activeSeason = seasons.find(s => s.season_number === season)
    const episodeCount = activeSeason?.episode_count ?? 1

    function handleSeasonChange(s) {
        setSeason(s)
        setEpisode(1)
    }

    return (
        <div className="min-h-screen bg-zinc-950">

            {/* Backdrop */}
            <div className="relative w-full h-[55vh] overflow-hidden">
                <img
                    src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
                    alt={show.name}
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
                            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                            alt={show.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white mb-1">
                            {show.name}
                            <span className="text-zinc-500 text-xl font-normal ml-2">
                                ({show.first_air_date?.slice(0, 4)})
                            </span>
                        </h1>
                        <p className="text-teal-400 italic text-sm mb-3">{show.tagline}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {show.genres?.map(g => (
                                <span key={g.id} className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 border border-white/15 text-zinc-300">
                                    {g.name}
                                </span>
                            ))}
                            {runtime > 0 && (
                                <span className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 border border-white/15 text-zinc-300">
                                    {hours > 0 ? `${hours}h ` : ""}{mins}m / ep
                                </span>
                            )}
                            <span className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 border border-white/15 text-zinc-300">
                                {show.status}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { label: "Score", value: show.vote_average?.toFixed(1) },
                                { label: "Votes", value: show.vote_count?.toLocaleString() },
                                { label: "Seasons", value: show.number_of_seasons },
                                { label: "Episodes", value: show.number_of_episodes },
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
                <p className="text-zinc-300 leading-relaxed mb-4">{show.overview}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-8">
                    <p><span className="text-zinc-500">Language: </span><span className="text-white uppercase">{show.original_language}</span></p>
                    <p><span className="text-zinc-500">Countries: </span><span className="text-white">{show.production_countries?.map(c => c.name).join(" · ")}</span></p>
                    <p><span className="text-zinc-500">Languages: </span><span className="text-white">{show.spoken_languages?.map(l => l.english_name).join(", ")}</span></p>
                </div>

                <div className="w-full h-px bg-white/5 mb-8" />

                {/* Season selector */}
                {seasons.length > 0 && (
                    <div className="flex items-center gap-3 mb-5 flex-wrap">
                        <span className="text-zinc-500 text-xs uppercase tracking-widest">Season</span>
                        {seasons.map(s => (
                            <button
                                key={s.season_number}
                                onClick={() => handleSeasonChange(s.season_number)}
                                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 border ${season === s.season_number
                                        ? "bg-white text-zinc-950 border-white"
                                        : "bg-transparent text-zinc-400 border-white/15 hover:text-white hover:border-white/30"
                                    }`}
                            >
                                {s.season_number}
                            </button>
                        ))}
                    </div>
                )}

                {/* Episode selector */}
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="text-zinc-500 text-xs uppercase tracking-widest">Episode</span>
                    <div className="flex flex-wrap gap-1.5">
                        {Array.from({ length: episodeCount }, (_, i) => i + 1).map(ep => (
                            <button
                                key={ep}
                                onClick={() => setEpisode(ep)}
                                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 border ${episode === ep
                                        ? "bg-teal-500 text-white border-teal-500"
                                        : "bg-transparent text-zinc-400 border-white/15 hover:text-white hover:border-white/30"
                                    }`}
                            >
                                {ep}
                            </button>
                        ))}
                    </div>
                </div>

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
                <div className="text-zinc-500 text-xs mb-3">bro use some adblocker</div>

                {/* Player — key forces reload on source/season/episode change */}
                <iframe
                    key={`${activeSource}-${season}-${episode}`}
                    src={SOURCES[activeSource].url(show.id, season, episode)}
                    width="100%" height="100%"
                    allowFullScreen allow="autoplay; encrypted-media"
                    style={{ border: "none", aspectRatio: "16/9", borderRadius: "12px" }}
                />

                {/* Production companies */}
                <div className="mt-8">
                    <p className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Production</p>
                    <div className="flex flex-wrap gap-2">
                        {show.production_companies?.map(c => (
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

export default StreamingDrama