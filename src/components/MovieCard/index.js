import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import {IMAGE_BASE_URL} from '../../constants'

import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, movieName, posterPath, rating} = movieDetails

  return (
    <div className="movie-card">
      <img
        src={`${IMAGE_BASE_URL}${posterPath}`}
        className="movie-poster"
        alt={movieName}
      />

      <div className="card-details">
        <div className="name-rating">
          <h2 className="movie-card-title">{movieName}</h2>
          <div className="movie-card-rating">
            <FaStar color="#f5c518" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>

        <Link to={`/movie/${id}`} className="details-btn">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default MovieCard
