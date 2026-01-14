import './index.css'

const Pagination = props => {
  const {page, totalPages, onPrev, onNext} = props

  return (
    <div className="pagination">
      <button type="button" onClick={onPrev} disabled={page === 1}>
        Prev
      </button>

      <p>{page}</p>

      <button type="button" onClick={onNext} disabled={page === totalPages}>
        Next
      </button>
    </div>
  )
}

export default Pagination
