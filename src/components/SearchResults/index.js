import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

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
const searchMoviesURL =
  'https://api.themoviedb.org/3/search/movie?api_key=d058755b6f8c782dce7a0831a9f4e3a4&language=en-US&query='

const SearchResults = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get('query')

  const [page, setPage] = useState(1)
  const [displayPage, setDisplayPage] = useState(1)
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })

  useEffect(() => {
    setPage(1)
  }, [query])

  useEffect(() => {
    if (!query || query.trim() === '') return

    const fetchSearchResults = async () => {
      setApiResponse(prev => ({...prev, status: apiStatusConstants.inProgress}))

      const response = await fetch(
        `${searchMoviesURL}${encodeURIComponent(query)}&page=${page}`,
      )
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

    fetchSearchResults()
  }, [page, query])

  const totalPages = apiResponse.data
    ? Math.min(apiResponse.data.total_pages || 1, MAX_PAGES)
    : 1

  const renderContent = () => {
    const {status, data, errorMsg} = apiResponse

    if (status === apiStatusConstants.inProgress) return <LoadingView />

    if (status === apiStatusConstants.failure)
      return <FailureView errorMsg={errorMsg} onRetry={() => setPage(1)} />

    if (status === apiStatusConstants.success && data) {
      if (data.results.length === 0) {
        return <p className="no-results">No movies found for your search.</p>
      }

      return (
        <>
          <ul className="movies-grid">
            {data.results.map(movie => (
              <MovieCard key={movie.id} movieDetails={movie} />
            ))}
          </ul>
        </>
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

export default SearchResults
