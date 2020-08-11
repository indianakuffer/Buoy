import api from './api-config'

export const getAllProfilePics = async () => {
  const resp = await api.get('/profile_pics')
  return resp.data
}

export const getOneProfilePic = async (id) => {
  const resp = await api.get(`/profile_pics${id}`)
  return resp.data
}