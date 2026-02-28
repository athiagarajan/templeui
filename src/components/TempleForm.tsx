import React, { useState, useEffect } from 'react'
import { createTemple, updateTemple } from '../services/templeService'

const TempleForm = ({ temple, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: {
      address: '',
      latitude: '',
      longitude: '',
    },
    deity: '',
    constructionDate: '',
    description: '',
  })

  useEffect(() => {
    if (temple) {
      setFormData({
        name: temple.name || '',
        location: {
          address: temple.location?.address || '',
          latitude: temple.location?.latitude || '',
          longitude: temple.location?.longitude || '',
        },
        deity: temple.deity || '',
        constructionDate: temple.constructionDate || '',
        description: temple.description || '',
      })
    }
  }, [temple])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (temple) {
      updateTemple(temple.id, formData)
        .then(() => {
          onSave()
        })
        .catch((error) => {
          console.error('Error updating temple:', error)
        })
    } else {
      createTemple(formData)
        .then(() => {
          onSave()
        })
        .catch((error) => {
          console.error('Error creating temple:', error)
        })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{temple ? 'Edit Temple' : 'Add New Temple'}</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          name="location.address"
          value={formData.location.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Latitude:</label>
        <input
          type="text"
          name="location.latitude"
          value={formData.location.latitude}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Longitude:</label>
        <input
          type="text"
          name="location.longitude"
          value={formData.location.longitude}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Deity:</label>
        <input
          type="text"
          name="deity"
          value={formData.deity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Construction Date:</label>
        <input
          type="text"
          name="constructionDate"
          value={formData.constructionDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit" className="submit-button">
        Save
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}

export default TempleForm
