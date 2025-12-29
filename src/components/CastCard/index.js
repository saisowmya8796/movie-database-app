import './index.css'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const CastCard = props => {
  const {castDetails} = props
  const {originalName, character, profilePath} = castDetails

  return (
    <li className="cast-card">
      {profilePath ? (
        <img
          src={`${IMAGE_BASE_URL}${profilePath}`}
          className="cast-image"
          alt={originalName}
        />
      ) : (
        <div className="no-image">No Image</div>
      )}

      <p className="cast-name">{originalName}</p>
      <p className="cast-character">{character}</p>
    </li>
  )
}

export default CastCard
