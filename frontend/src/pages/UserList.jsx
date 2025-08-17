"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import UserTable from "../components/UserTable"
import userService from "../utils/userService"

const UserList = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [page, search])

  const fetchUsers = async () => {
    try {
      const data = search
        ? await userService.searchUsers(search, page)
        : await userService.getUsers(page)
      setUsers(data.docs)
      setTotalPages(data.totalPages)
    } catch (err) {
      toast.error("Failed to fetch users")
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleStatusChange = async (id, status) => {
    try {
      await userService.editUser(id, { status })
      toast.success("Status updated")
      fetchUsers()
    } catch (err) {
      toast.error("Failed to update status")
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.deleteUser(id)
        toast.success("User deleted")
        fetchUsers()
      } catch (err) {
        toast.error("Failed to delete user")
      }
    }
  }

  const handleExport = async () => {
    try {
      await userService.exportCSV()
      toast.success("CSV exported")
    } catch (err) {
      toast.error("Failed to export CSV")
    }
  }

  return (
    <div className="p-8 min-h-screen bg-[#FFEBCD]">
      <div className="max-w-7xl mx-auto">
        {}
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-12 text-center">
          User Information
        </h1>

        {}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="w-full md:w-96">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={handleSearch}
              className="w-full p-4 text-base border-2 border-gray-400 rounded-lg 
                         focus:outline-none focus:border-[#106694] focus:ring-2 
                         focus:ring-[#106694]/20 font-serif shadow-sm bg-white"
            />
          </div>
          <div className="flex gap-6">
            <button
              className="px-8 py-3 bg-green-600 text-white rounded-lg 
                         hover:bg-green-700 transition-colors duration-300 
                         font-serif shadow-md hover:shadow-lg"
              onClick={() => navigate("/add")}
            >
              Add User
            </button>
            <button
              className="px-8 py-3 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 transition-colors duration-300 
                         font-serif shadow-md hover:shadow-lg"
              onClick={handleExport}
            >
              Export to CSV
            </button>
          </div>
        </div>

        {}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 ml-8">
          <UserTable
            users={users}
            onView={(id) => navigate(`/view/${id}`)}
            onEdit={(id) => navigate(`/edit/${id}`)}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        </div>

        {}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg 
                       hover:bg-gray-700 disabled:bg-gray-400 
                       disabled:cursor-not-allowed transition-colors 
                       duration-300 font-serif shadow-md"
          >
            Prev
          </button>
          <span className="text-lg font-serif text-gray-800 px-4">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg 
                       hover:bg-gray-700 disabled:bg-gray-400 
                       disabled:cursor-not-allowed transition-colors 
                       duration-300 font-serif shadow-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserList
