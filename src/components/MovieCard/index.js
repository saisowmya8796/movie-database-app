import {Link} from 'react-router-dom'

import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        className="movie-poster"
        alt={title}
      />

      <div className="card-details">
        <div className="name-rating">
          <p className="movie-card-title">{title}</p>
          <p className="rating-text">{voteAverage}</p>
        </div>

        <Link to={`/movie/${id}`}>
          <button type="button" className="details-btn">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MovieCard
