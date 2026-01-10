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
const topRatedMoviesURL =
  'https://api.themoviedb.org/3/movie/top_rated?api_key=d058755b6f8c782dce7a0831a9f4e3a4&language=en-US&page='

const TopRated = () => {
  const [page, setPage] = useState(1)
  const [retryCount, setRetryCount] = useState(0)
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })

  const retryFetch = () => setRetryCount(prev => prev + 1)

  useEffect(() => {
    const fetchMovies = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
      })

      const response = await fetch(`${topRatedMoviesURL}${page}`)
      const data = await response.json()

      if (response.ok) {
        setApiResponse({
          status: apiStatusConstants.success,
          data,
          errorMsg: null,
        })
      } else {
        setApiResponse({
          status: apiStatusConstants.failure,
          data: null,
          errorMsg: data.status_message,
        })
      }
    }

    fetchMovies()
  }, [page, retryCount])

  const renderSuccessView = () => {
    const {data} = apiResponse
    if (!data || !Array.isArray(data.results)) return null

    const totalPages = Math.min(data.total_pages || 1, MAX_PAGES)

    return (
      <>
        <ul className="movies-grid">
          {data.results.map(movie => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage(prev => prev - 1)}
          onNext={() => setPage(prev => prev + 1)}
        />
      </>
    )
  }

  const renderMovies = () => {
    switch (apiResponse.status) {
      case apiStatusConstants.inProgress:
        return <LoadingView />
      case apiStatusConstants.failure:
        return (
          <FailureView errorMsg={apiResponse.errorMsg} onRetry={retryFetch} />
        )
      case apiStatusConstants.success:
        return renderSuccessView()
      default:
        return null
    }
  }

  return <div className="page-container">{renderMovies()}</div>
}

export default TopRated
