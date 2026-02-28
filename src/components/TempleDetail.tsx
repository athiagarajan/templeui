import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getTempleById } from '../services/templeService'
import { useParams } from 'react-router-dom'

// Fix for default marker icon not showing
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const TempleDetail = ({ onBack }) => {
  const { id } = useParams()
  const [temple, setTemple] = useState(null)

  useEffect(() => {
    if (id) {
      getTempleById(id)
        .then((response) => {
          setTemple(response.data)
        })
        .catch((error) => {
          console.error('Error fetching temple details:', error)
        })
    }
  }, [id])

  if (!temple) {
    return <div>Loading...</div>
  }

  // Convert string coordinates to numbers
  const position = [
    parseFloat(temple.location.latitude),
    parseFloat(temple.location.longitude),
  ]

  return (
    <div className="temple-detail">
      <h2>{temple.name}</h2>
      <p>
        <strong>Location:</strong> {temple.location.address}
      </p>
      <p>
        <strong>Deity:</strong> {temple.deity}
      </p>
      <p>
        <strong>Construction Date:</strong> {temple.constructionDate}
      </p>
      <p>
        <strong>Description:</strong> {temple.description}
      </p>

      {position[0] && position[1] && (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>{temple.name}</Popup>
          </Marker>
        </MapContainer>
      )}

      <button onClick={onBack} className="back-button">
        Back to List
      </button>
    </div>
  )
}

export default TempleDetail
