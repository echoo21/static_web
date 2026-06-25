import { useRef, useCallback } from "react"

export default function ScrollSection({ title, children }) {
  const ref = useRef(null)

  const scroll = useCallback((dir) => {
    ref.current?.scrollBy({ left: dir === "left" ? -600 : 600, behavior: "smooth" })
  }, [])

  return (
    <section className="mb-12" style={{ contentVisibility: "auto", containIntrinsicSize: "380px" }}>
      <h2 className="text-white text-2xl font-bold mb-6">{title}</h2>
      <div className="relative group/scroll">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover/scroll:opacity-100 transition-all duration-200"
          aria-label="Scroll left"
        >
          ‹
        </button>
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide"
          style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
        >
          {children}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full text-xl opacity-0 group-hover/scroll:opacity-100 transition-all duration-200"
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  )
}
