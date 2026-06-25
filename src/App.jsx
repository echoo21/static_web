import { lazy, Suspense } from 'react'
import Navbar from './components/navbar'
import { HashRouter, Routes, Route } from 'react-router-dom'

// Lazy-load every page — they become separate chunks loaded on demand
const Home = lazy(() => import('./pages/home'))
const Movie = lazy(() => import('./pages/movie'))
const Drama = lazy(() => import('./pages/drama'))
const Anime = lazy(() => import('./pages/anime'))
const StreamingPage = lazy(() => import('./pages/streaming'))

// Shared fallback for all lazy routes
function PageFallback() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-zinc-500 text-sm animate-pulse">Loading...</div>
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/movie' element={<Movie />} />
          <Route path="/drama" element={<Drama />} />
          <Route path="/anime" element={<Anime />} />
          <Route path='/streamingmovie/:id' element={<StreamingPage />} />
          <Route path='/watchtv/:id' element={<StreamingPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
