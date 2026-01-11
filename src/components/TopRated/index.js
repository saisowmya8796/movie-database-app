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
      const res = await fetch(`${topRatedMoviesURL}${page}`)
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

  if (apiResponse.status === apiStatusConstants.inProgress)
    return <LoadingView />
  if (apiResponse.status === apiStatusConstants.failure)
    return (
      <FailureView errorMsg={apiResponse.errorMsg} onRetry={() => setPage(1)} />
    )

  if (apiResponse.status === apiStatusConstants.success && apiResponse.data) {
    const totalPages = Math.min(apiResponse.data.total_pages || 1, MAX_PAGES)

    return (
      <div className="page-container">
        <ul className="movies-grid">
          {apiResponse.data.results.map(movie => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={() => page > 1 && setPage(prev => prev - 1)}
          onNext={() => page < totalPages && setPage(prev => prev + 1)}
        />
      </div>
    )
  }

  return null
}

export default TopRated
