import Loader from 'react-loader-spinner'
import './index.css'

const LoaderView = () => (
  <div className="loader-container">
    <Loader type="ThreeDots" color="#1e90ff" width={50} height={50} />
  </div>
)

export default LoaderView
