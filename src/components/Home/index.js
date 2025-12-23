import {useState, useEffect, useCallback} from 'react'

import {API_KEY, BASE_URL} from '../../constants'

import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const MAX_PAGES = 500

const Home = () => {
  const [page, setPage] = useState(1)
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })

  const fetchPopularMovies = useCallback(async () => {
    setApiResponse({
      status: apiStatusConstants.inProgress,
      data: null,
      errorMsg: null,
    })

    const apiUrl = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
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
  }, [page])

  useEffect(() => {
    fetchPopularMovies()
  }, [fetchPopularMovies])

  const renderSuccessView = () => {
    const {data} = apiResponse

    const totalPagesFromApi = data.total_pages
    const effectiveTotalPages = Math.min(totalPagesFromApi, MAX_PAGES)

    const formattedMovieData = data.results.map(movie => ({
      id: movie.id,
      movieName: movie.title,
      posterPath: movie.poster_path,
      rating: movie.vote_average.toFixed(1),
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

  const renderPopularMovies = () => {
    const {status, errorMsg} = apiResponse

    switch (status) {
      case apiStatusConstants.inProgress:
        return <LoadingView />
      case apiStatusConstants.failure:
        return <FailureView errorMsg={errorMsg} onRetry={fetchPopularMovies} />
      case apiStatusConstants.success:
        return renderSuccessView()
      default:
        return null
    }
  }

  return (
    <div className="home-container">
      <h1 className="page-title">Popular Movies</h1>
      {renderPopularMovies()}
    </div>
  )
}

export default Home
