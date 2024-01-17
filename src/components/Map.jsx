import {useNavigate, useSearchParams} from 'react-router-dom'
import styles from './Map.module.css'

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  console.log(lat, lng)
  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      Map
    </div>
  )
}

export default Map
