import {Link, useHistory} from 'react-router-dom'

import './index.css'

const Navbar = () => {
  const history = useHistory()
  const onSearchSubmit = event => {
    event.preventDefault()
    const query = event.target.search.value.trim()
    if (query !== '') {
      history.push(`/search?query=${query}`)
    }
  }

  return (
    <nav className="navbar">
      <h1 className="logo">movieDB</h1>

      <form className="search-form" onSubmit={onSearchSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          aria-label="Search movies"
          placeholder="Search Movies"
          className="search-input"
        />

        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      <div className="nav-links">
        <Link to="/" className="nav-link-item" aria-label="Popular">
          <h1>Popular</h1>
        </Link>
        <Link to="/top-rated" className="nav-link-item" aria-label="Top Rated">
          <h1>Top Rated</h1>
        </Link>
        <Link to="/upcoming" className="nav-link-item" aria-label="Upcoming">
          <h1>Upcoming</h1>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
