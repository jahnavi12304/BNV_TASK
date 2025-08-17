import axios from "axios"

export const BASE_URL = "https://bnv-task.onrender.com"
const API_URL = `${BASE_URL}/api/users`

const getUsers = async (page) => {
  return (await axios.get(`${API_URL}?page=${page}&limit=10`)).data
}

const searchUsers = async (q, page) => {
  return (await axios.get(`${API_URL}/search?q=${q}&page=${page}&limit=10`)).data
}

const getUser = async (id) => {
  return (await axios.get(`${API_URL}/${id}`)).data
}

const addUser = async (formData) => {
  return axios.post(API_URL, formData, { headers: { "Content-Type": "multipart/form-data" } })
}

const editUser = async (id, formData) => {
  return axios.put(`${API_URL}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
}

const deleteUser = async (id) => {
  return axios.delete(`${API_URL}/${id}`)
}

const exportCSV = async () => {
  const res = await axios.get(`${API_URL}/export`, { responseType: "blob" })
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", "users.csv")
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export default { getUsers, searchUsers, getUser, addUser, editUser, deleteUser, exportCSV }
