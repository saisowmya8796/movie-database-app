import {useState, useEffect} from 'react'

import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

import '../PageLayout/index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const MAX_PAGES = 500

const API_KEY = 'd058755b6f8c782dce7a0831a9f4e3a4'
const BASE_URL = 'https://api.themoviedb.org/3'

const TopRated = () => {
  const [page, setPage] = useState(1)
  const [retryCount, setRetryCount] = useState(0)
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })

  const retryFetchTopRated = () => {
    setRetryCount(prev => prev + 1)
  }

  const fetchMovies = async () => {
    setApiResponse({
      status: apiStatusConstants.inProgress,
      data: null,
      errorMsg: null,
    })

    const apiUrl = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    const response = await fetch(apiUrl)
    const responseData = await response.json()

    if (response.ok) {
      setApiResponse({
        status: apiStatusConstants.success,
        data: responseData,
        errorMsg: null,
      })
    } else {
      setApiResponse({
        status: apiStatusConstants.failure,
        data: null,
        errorMsg: responseData.status_message,
      })
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [retryCount])

  const renderSuccessView = () => {
    const {data} = apiResponse

    if (!data || data.results.length === 0) {
      return <p className="no-results">No Top Rated movies found.</p>
    }

    const totalPagesFromApi =
      data !== null && data !== undefined && data.total_pages
        ? data.total_pages
        : 1

    const effectiveTotalPages = Math.min(totalPagesFromApi, MAX_PAGES)

    const formattedMovieData = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
    }))

    return (
      <>
        <div className="movies-grid">
          {formattedMovieData.map(eachMovie => (
            <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
          ))}
        </div>

        <Pagination
          page={page}
          totalPages={effectiveTotalPages}
          onPrev={() => page > 1 && setPage(prev => prev - 1)}
          onNext={() => page < effectiveTotalPages && setPage(prev => prev + 1)}
        />
      </>
    )
  }

  const renderTopRatedMovies = () => {
    const {status, errorMsg} = apiResponse

    switch (status) {
      case apiStatusConstants.inProgress:
        return <LoadingView />
      case apiStatusConstants.failure:
        return <FailureView errorMsg={errorMsg} onRetry={retryFetchTopRated} />
      case apiStatusConstants.success:
        return renderSuccessView()
      default:
        return null
    }
  }

  return (
    <>
      <h1 className="page-title">Top Rated</h1>
      <div className="page-container">{renderTopRatedMovies()}</div>
    </>
  )
}

export default TopRated
