import {Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieDetails from './components/MovieDetails'
import SearchResults from './components/SearchResults'

import './App.css'

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Popular />} />
      <Route path="/top-rated" element={<TopRated />} />
      <Route path="/upcoming" element={<Upcoming />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  </>
)

export default App
