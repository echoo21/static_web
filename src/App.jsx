import './App.css'
import Navbar from './components/navbar'
import Home from './pages/home'
import Anime from './pages/anime'
import Movie from './pages/movie'
import Drama from './pages/drama'
import StreamingMovie from './pages/streamingmovie'
import StreamingDrama from './pages/streamingdrama'
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
        <Route path='/streamingmovie/:id' element={<StreamingMovie />} />
        <Route path='/watchtv/:id' element={<StreamingDrama />} />
      </Routes>
    </HashRouter>
  )
}

export default App