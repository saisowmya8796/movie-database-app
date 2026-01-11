import './index.css'

const Pagination = props => {
  const {page, totalPages, onPrev, onNext} = props

  return (
    <div className="pagination">
      {/* Test Case: must have button with text content "Prev" */}
      <button type="button" onClick={onPrev} disabled={page === 1}>
        Prev
      </button>

      {/* Test Case: must find element with text content of the page number */}
      <p>{page}</p>

      {/* Test Case: must have button with text content "Next" */}
      <button type="button" onClick={onNext} disabled={page === totalPages}>
        Next
      </button>
    </div>
  )
}

export default Pagination
