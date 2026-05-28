import './App.css'
import Navbar from './components/navbar'
import Home from './pages/home'
import Anime from './pages/anime'
import Movie from './pages/movie'
import Drama from './pages/drama'
import WatchMovie from './pages/watchmovie'
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // basename must match your vite.config.js base
    <HashRouter>
      <Navbar />
      
      <Routes>
        {/* 'path' stays simple, basename handles the prefix */}
        <Route path="/" element={<Home />} />
        <Route path='/movie' element={<Movie />} />
        <Route path="/drama" element={<Drama />} />
        <Route path="/anime" element={<Anime />} />
        <Route path='/wtchmovie/:id' element={<WatchMovie />} />
      </Routes>
    </HashRouter>
  )
}

export default App