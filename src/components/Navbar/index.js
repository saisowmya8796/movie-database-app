import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import './index.css'

const Navbar = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')

  const onSearch = () => {
    const query = searchText.trim()
    if (query !== '') {
      navigate(`/search?query=${query}`)
    }
  }

  return (
    <nav className="navbar">
      <h1 className="logo">movieDB</h1>

      <div className="search-form">
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Search Movies"
          aria-label="Search movies"
          className="search-input"
        />
        <button type="button" className="search-btn" onClick={onSearch}>
          Search
        </button>
      </div>

      <div className="nav-links">
        <h1><Link to="/" className="nav-link-item">Popular</Link></h1>
        <h1><Link to="/top-rated"className="nav-link-item">Top Rated</Link></h1>
        <h1><Link to="/upcoming" className="nav-link-item">Upcoming</Link></h1>
      </div>
    </nav>
  )
}

export default Navbar
