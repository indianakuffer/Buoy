import api from './api-config'

export const updateUser = async (id, userData) => {
  const resp = await api.put(`/users/${id}`, { user: userData })
  return resp.data
}

export const destroyUser = async (id) => {
  const resp = await api.delete(`/users/${id}`)
  return resp
}