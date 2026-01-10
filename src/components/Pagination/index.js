import './index.css'

const Pagination = props => {
  const {page, totalPages, onPrev, onNext} = props

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={page > 1 ? onPrev : undefined}
        disabled={page <= 1}
      >
        Prev
      </button>

      <p className="page-number">{page}</p>

      <button
        type="button"
        onClick={page < totalPages ? onNext : undefined}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
