import api from './api-config'

export const getOneUser = async (id) => {
  const resp = await api.get(`/users/${id}`)
  return resp
}

export const getUserThoughts = async (id) => {
  const resp = await api.get(`/users/${id}/thoughts`)
  return resp
}

export const updateUser = async (id, userData) => {
  const resp = await api.put(`/users/${id}`, { user: userData })
  return resp.data
}

export const destroyUser = async (id) => {
  const resp = await api.delete(`/users/${id}`)
  return resp
}