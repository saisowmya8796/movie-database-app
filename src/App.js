import {Switch, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieDetails from './components/MovieDetails'
import SearchResults from './components/SearchResults'

import './App.css'

const App = () => {
  return (
    <>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/top-rated" component={TopRated} />
        <Route path="/upcoming" component={Upcoming} />
        <Route path="/movie/:id" component={MovieDetails} />
        <Route path="/search" component={SearchResults} />
      </Switch>
    </>
  )
}

export default App
