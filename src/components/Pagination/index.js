import './index.css'

const Pagination = props => {
  const {page, totalPages, onPrev, onNext} = props

  return (
    <div className="pagination">
      {page > 1 && (
        <button type="button" onClick={onPrev}>
          Prev
        </button>
      )}

      <span className="page-number">
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <button type="button" onClick={onNext}>
          Next
        </button>
      )}
    </div>
  )
}

export default Pagination
