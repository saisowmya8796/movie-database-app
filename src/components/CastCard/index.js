import './index.css'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const CastCard = props => {
  const {castDetails} = props
  const {name, character, profilePath} = castDetails

  return (
    <div className="cast-card">
      {profilePath ? (
        <img
          src={`${IMAGE_BASE_URL}${profilePath}`}
          className="cast-image"
          alt={name}
        />
      ) : (
        <div className="no-image">No Image</div>
      )}

      <p className="cast-name">{name}</p>
      <p className="cast-character">{character}</p>
    </div>
  )
}

export default CastCard
