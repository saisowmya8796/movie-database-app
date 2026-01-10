import {Switch, Route} from 'react-router-dom'

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
    <Switch>
      <Route exact path="/" component={Popular} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/movie/:id" component={MovieDetails} />
      <Route exact path="/search" component={SearchResults} />
    </Switch>
  </>
)

export default App
