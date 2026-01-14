import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props

  const {id} = movieDetails
  const {title} = movieDetails
  const posterPath = movieDetails.poster_path
  const voteAverage = movieDetails.vote_average

  return (
    <li className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        className="movie-poster"
        alt={title}
      />

      <div className="card-details">
        <h1 className="movie-card-title">{title}</h1>
        <p className="rating-text">{voteAverage}</p>

        <Link to={`/movie/${id}`} className="details-link">
          <button type="button" className="details-btn">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MovieCard
