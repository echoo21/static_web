import { useRef } from "react"
import useDramas from "../hooks/useDramas"
import DramaCard from "../components/dramacard"
import { AiringTodayDramas, OnTheAirDramas, PopularDramas, TopRatedDramas } from "../axios/dramas"

function Drama() {
  const airingRef = useRef(null)

  const scroll = (dir) => {
    airingRef.current.scrollBy({ left: dir === "left" ? -600 : 600, behavior: "smooth" })
  }

  const airingtodaydramas = useDramas(AiringTodayDramas)
  const ontheair = useDramas(OnTheAirDramas)
  const populardramas = useDramas(PopularDramas)
  const toprateddramas = useDramas(TopRatedDramas)

  return (
    <div className="min-h-screen bg-zinc-950 px-8 py-10">

      <section className="mb-12">
        <h2 className="text-white text-2xl font-bold mb-6">Airing Today</h2>
        <div className="relative group">
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">‹</button>
          <div ref={airingRef} className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
            {airingtodaydramas.map((drama) => (
              <div key={drama.id} className="shrink-0 w-40"><DramaCard drama={drama} /></div>
            ))}
          </div>
          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">›</button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-white text-2xl font-bold mb-6">On the Air</h2>
        <div className="relative group">
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">‹</button>
          <div ref={airingRef} className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
            {ontheair.map((drama) => (
              <div key={drama.id} className="shrink-0 w-40"><DramaCard drama={drama} /></div>
            ))}
          </div>
          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">›</button>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-white text-2xl font-bold mb-6">Popular Dramas</h2>
        <div className="relative group">
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">‹</button>
          <div ref={airingRef} className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
            {populardramas.map((drama) => (
              <div key={drama.id} className="shrink-0 w-40"><DramaCard drama={drama} /></div>
            ))}
          </div>
          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">›</button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-white text-2xl font-bold mb-6">Top Rated Dramas</h2>
        <div className="relative group">
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">‹</button>
          <div ref={airingRef} className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
            {toprateddramas.map((drama) => (
              <div key={drama.id} className="shrink-0 w-40"><DramaCard drama={drama} /></div>
            ))}
          </div>
          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover:opacity-100 transition-all duration-200">›</button>
        </div>
      </section>

    </div>
  )
}

export default Drama