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
const getPopularMoviesURL =
  'https://api.themoviedb.org/3/movie/popular?api_key=d058755b6f8c782dce7a0831a9f4e3a4&language=en-US&page='

const Popular = () => {
  const [page, setPage] = useState(1)
  const [displayPage, setDisplayPage] = useState(1)
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })

  useEffect(() => {
    const fetchMovies = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
      })
      const res = await fetch(`${getPopularMoviesURL}${page}`)
      const data = await res.json()

      setApiResponse(
        res.ok
          ? {status: apiStatusConstants.success, data, errorMsg: null}
          : {
              status: apiStatusConstants.failure,
              data: null,
              errorMsg: data.status_message,
            },
      )
    }
    fetchMovies()
  }, [page])

  const totalPages = apiResponse.data
    ? Math.min(apiResponse.data.total_pages || 1, MAX_PAGES)
    : 1

  const renderContent = () => {
    const {status, data, errorMsg} = apiResponse

    if (status === apiStatusConstants.inProgress) return <LoadingView />
    if (status === apiStatusConstants.failure)
      return <FailureView errorMsg={errorMsg} onRetry={() => setPage(1)} />

    if (status === apiStatusConstants.success && data) {
      return (
        <ul className="movies-grid">
          {data.results.map(movie => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>
      )
    }

    return null
  }

  return (
    <div className="page-container">
      {renderContent()}
      <Pagination
        page={displayPage}
        totalPages={totalPages}
        onPrev={() => {
          if (displayPage > 1) {
            setDisplayPage(p => p - 1)
            setPage(p => p - 1)
          }
        }}
        onNext={() => {
          setDisplayPage(p => p + 1)
          setPage(p => p + 1)
        }}
      />
    </div>
  )
}

export default Popular
