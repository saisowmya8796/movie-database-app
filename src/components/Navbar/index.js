import {Link, withRouter} from 'react-router-dom'

import {FaFire, FaStar, FaClock, FaSearch} from 'react-icons/fa'

import './index.css'

const Navbar = props => {
  const {history} = props
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
          type="search"
          name="search"
          aria-label="Search movies"
          placeholder="Search Movies"
          className="search-input"
        />

        <button type="submit" className="search-btn" aria-label="Search">
          <FaSearch className="search-icon" />
        </button>
      </form>

      <div className="nav-links">
        <Link to="/" className="nav-link-item" aria-label="Popular">
          <FaFire className="nav-icon" />
          <span>Popular</span>
        </Link>
        <Link to="/top-rated" className="nav-link-item" aria-label="Top Rated">
          <FaStar className="nav-icon" />
          <span>Top Rated</span>
        </Link>
        <Link to="/upcoming" className="nav-link-item" aria-label="Upcoming">
          <FaClock className="nav-icon" />
          <span>Upcoming</span>
        </Link>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
