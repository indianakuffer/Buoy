import api from './api-config'

export const getAllThoughts = async () => {
  const resp = await api.get('/thoughts')
  return resp.data
}

export const getThought = async (id) => {
  const resp = await api.get(`/thoughts/${id}`)
  return resp.data
}

export const postThought = async (thoughtData) => {
  const resp = await api.post('/thoughts', { thought: thoughtData })
  return resp.data
}

export const destroyThought = async (id) => {
  const resp = await api.delete(`/thoughts/${id}`)
  return resp
}

export const giveThoughtTag = async (thoughtId, tagName) => {
  const resp = await api.put(`/thoughts/${thoughtId}/tags/${tagName}`)
  return resp.data
}

export const likeThought = async (id) => {
  const resp = await api.put(`/thoughts/${id}/like`)
  return resp.data
}

export const searchThoughts = async (queryArray) => {
  let query = ''
  if (queryArray.length > 0) {
    query = `&query=${queryArray.join(',').toLowerCase()}`
  }

  const resp = await api.get(`/thoughts/search?${query}`)
  return resp.data
}