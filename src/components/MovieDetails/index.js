import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

import CastCard from '../CastCard'

import './index.css'

const API_KEY = 'd058755b6f8c782dce7a0831a9f4e3a4'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const MovieDetails = () => {
  const {id} = useParams()

  const [retryCount, setRetryCount] = useState(0)
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    movie: null,
    cast: [],
    errorMsg: null,
  })

  const retryFetchMovieDetails = () => {
    setRetryCount(prev => prev + 1)
  }

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        movie: null,
        cast: [],
        errorMsg: null,
      })

      const movieUrl = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
      const castUrl = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`

      const movieResponse = await fetch(movieUrl)
      const movieData = await movieResponse.json()

      const castResponse = await fetch(castUrl)
      const castData = await castResponse.json()

      if (movieResponse.ok && castResponse.ok) {
        const formattedMovieData = {
          id: movieData.id,
          title: movieData.title,
          posterPath: movieData.poster_path,
          rating: movieData.vote_average,
          duration: movieData.runtime,
          releaseDate: movieData.release_date,
          overview: movieData.overview,
          genres: Array.isArray(movieData.genres)
            ? movieData.genres.map(each => each.name)
            : [],
        }

        const formattedCastData = castData.cast.map(each => ({
          id: each.id,
          originalName: each.original_name,
          character: each.character,
          profilePath: each.profile_path,
        }))

        setApiResponse({
          status: apiStatusConstants.success,
          movie: formattedMovieData,
          cast: formattedCastData,
          errorMsg: null,
        })
      } else {
        setApiResponse({
          status: apiStatusConstants.failure,
          movie: null,
          cast: [],
          errorMsg: movieData.status_message || 'Something went wrong',
        })
      }
    }

    fetchMovieDetails()
  }, [retryCount, id])

  const renderSuccessView = () => {
    const {movie, cast} = apiResponse

    const formatDuration = minutes => {
      if (!minutes) {
        return 'N/A'
      }

      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60

      return hours === 0 ? `${mins}m` : `${hours}h ${mins}m`
    }

    return (
      <>
        <div className="movie-details">
          <img
            src={`${IMAGE_BASE_URL}${movie.posterPath}`}
            className="movie-poster-large"
            alt={movie.title}
          />

          <div className="movie-info">
            <h1 className="movie-title">{movie.title}</h1>

            <div className="info-row">
              <p className="row-chip">{movie.rating.toFixed(1)}</p>
              <p className="row-chip">
                Duration: {formatDuration(movie.duration)}
              </p>
              <p className="row-chip">Release Date: {movie.releaseDate}</p>
            </div>

            <p className="movie-genres">
              <span>Genres: </span>
              {movie.genres.join(', ')}
            </p>
            <h3 className="overview">Overview:</h3>
            <p className="movie-overview">{movie.overview}</p>
          </div>
        </div>

        <h2 className="cast-title">Cast</h2>
        <hr className="horizontal-line" />

        <ul className="cast-grid">
          {cast.map(eachCast => (
            <CastCard key={eachCast.id} castDetails={eachCast} />
          ))}
        </ul>
      </>
    )
  }

  const renderMovieDetails = () => {
    const {status, errorMsg} = apiResponse

    switch (status) {
      case apiStatusConstants.inProgress:
        return <LoadingView />
      case apiStatusConstants.failure:
        return (
          <FailureView errorMsg={errorMsg} onRetry={retryFetchMovieDetails} />
        )
      case apiStatusConstants.success:
        return renderSuccessView()
      default:
        return null
    }
  }

  return <div className="movie-container">{renderMovieDetails()}</div>
}

export default MovieDetails
