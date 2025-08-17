"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import userService, { BASE_URL } from "../utils/userService"
import { toast } from "react-toastify"

function UserDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getUser(id)
        setUser(data)
      } catch (err) {
        toast.error("Failed to load user details")
        navigate("/")
      }
    }
    fetchUser()
  }, [id, navigate])

  if (!user)
    return (
      <div className="min-h-screen bg-[#FFEBCD] flex justify-center items-center">
        <div className="text-xl font-serif text-gray-800">Loading...</div>
      </div>
    )

  return (
    <div className="min-h-screen p-5 bg-[#FFEBCD] flex justify-center items-center">
      <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl border-2 border-[#106694]">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 font-serif">User Details</h2>

        {user.photoUrl && (
          <div className="flex justify-center mb-6">
            <img
              src={`${BASE_URL}/${user.photoUrl}`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-[#106694] shadow-lg"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-serif text-gray-800">
              <strong className="text-[#106694]">ID:</strong> {user.userId || user._id}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-serif text-gray-800">
              <strong className="text-[#106694]">Full Name:</strong> {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-serif text-gray-800">
              <strong className="text-[#106694]">Email:</strong> {user.email}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-serif text-gray-800">
              <strong className="text-[#106694]">Gender:</strong> {user.gender}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-serif text-gray-800">
              <strong className="text-[#106694]">Mobile:</strong> {user.mobile}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-serif text-gray-800">
              <strong className="text-[#106694]">Status:</strong>
              <span
                className={`ml-2 px-2 py-1 rounded text-sm ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {user.status}
              </span>
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg md:col-span-2">
            <p className="font-serif text-gray-800">
              <strong className="text-[#106694]">Location:</strong> {user.location}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#106694] text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-serif text-lg"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
