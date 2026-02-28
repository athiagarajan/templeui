import React, { useEffect, useState } from 'react'
import { getAllTemples, deleteTemple } from '../services/templeService'
import { Link } from 'react-router-dom'

const TempleList = ({ onSelectTemple, onEditTemple }) => {
  const [temples, setTemples] = useState([])

  useEffect(() => {
    fetchTemples()
  }, [])

  const fetchTemples = () => {
    getAllTemples()
      .then((response) => {
        setTemples(response.data)
      })
      .catch((error) => {
        console.error('Error fetching temples:', error)
      })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this temple?')) {
      deleteTemple(id)
        .then(() => {
          fetchTemples()
        })
        .catch((error) => {
          console.error('Error deleting temple:', error)
        })
    }
  }

  return (
    <div>
      <h2>Temple List</h2>
      <button onClick={() => onEditTemple(null)}>Add New Temple</button>
      <ul className="temple-list">
        {temples.map((temple) => (
          <li key={temple.id} className="temple-list-item">
            <h3>{temple.name}</h3>
            <div>
              <button onClick={() => onSelectTemple(temple)}>View</button>
              <button onClick={() => onEditTemple(temple)}>Edit</button>
              <button onClick={() => handleDelete(temple.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TempleList
