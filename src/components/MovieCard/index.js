import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import './index.css'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <div className="movie-card">
      <img
        src={`${IMAGE_BASE_URL}${posterPath}`}
        className="movie-poster"
        alt={title}
      />

      <div className="card-details">
        <div className="name-rating">
          <h2 className="movie-card-title">{title}</h2>
          <div className="movie-card-rating">
            <FaStar color="#f5c518" />
            <p className="rating-text">{voteAverage}</p>
          </div>
        </div>

        <Link to={`/movie/${id}`}>
          <button type="button" className="details-btn">
            <p className="button-text">View Details</p>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MovieCard
