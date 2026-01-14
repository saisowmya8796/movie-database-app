import './index.css'

const FailureView = ({errorMsg, onRetry}) => (
  <div className="failure-container">
    <p className="failure-text">{errorMsg || 'Something went wrong'}</p>

    {onRetry && (
      <button type="button" className="retry-btn" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
)

export default FailureView
