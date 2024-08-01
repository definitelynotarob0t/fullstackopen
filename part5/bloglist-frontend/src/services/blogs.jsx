import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newBlog, config)
  const response = await request
  return response.data
}

const updateBlog = async (blogToUpdate) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogUrl = `${baseUrl}/${blogToUpdate.id}`
  const request = axios.put(blogUrl, blogToUpdate, config)
  const response = await request
  return response.data
}

const deleteBlog = async (blogToDelete) => {
  const config = {
    headers: { Authorization: token }
  }

  const blogUrl = `${baseUrl}/${blogToDelete.id}`
  const request = axios.delete(blogUrl, config)
  const response = await request
  return response.data
}

export default { getAll, setToken, createBlog, updateBlog, deleteBlog }