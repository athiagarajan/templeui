import apiService from './apiService'

export const getAllTemples = () => {
  return apiService.get('/')
}

export const getTempleById = (id) => {
  return apiService.get(`/${id}`)
}

export const createTemple = (temple) => {
  return apiService.post('/', temple)
}

export const updateTemple = (id, temple) => {
  return apiService.put(`/${id}`, temple)
}

export const deleteTemple = (id) => {
  return apiService.delete(`/${id}`)
}
