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

export const searchThoughts = async (tagArray) => {
  let tag = ''
  if (tagArray.length > 0) {
    tag = `&tag=${tagArray.join(',').toLowerCase()}`
  }

  const resp = await api.get(`/thoughts/search?${tag}`)
  return resp.data
}