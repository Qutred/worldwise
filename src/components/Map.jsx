import {useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import styles from './Map.module.css'
import {MapContainer, Marker, TileLayer, Popup} from 'react-leaflet'

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [mapPosition, setMapPosition] = useState([51.505, -0.09])
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  console.log(lat, lng)
  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={`${styles.map}`}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map
