"use client"
import { BASE_URL } from "../utils/userService"

function UserTable({ users, onView, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="p-6 md:px-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-[#106694] text-white">
              <th className="p-4 text-center font-serif border-b border-gray-300 text-base">User ID</th>
              <th className="p-4 text-left font-serif border-b border-gray-300 text-base">Full Name</th>
              <th className="p-4 text-left font-serif border-b border-gray-300 text-base">Email ID</th>
              <th className="p-4 text-left font-serif border-b border-gray-300 text-base">Gender</th>
              <th className="p-4 text-left font-serif border-b border-gray-300 text-base">Status</th>
              <th className="p-4 text-left font-serif border-b border-gray-300 text-base">Profile Photo</th>
              <th className="p-4 text-left font-serif border-b border-gray-300 text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors duration-200`}
              >
                <td className="p-4 border-b border-gray-200 font-serif text-gray-800 text-center">{user.userId || user._id}</td>
                <td className="p-4 border-b border-gray-200 font-serif text-gray-800">{`${user.firstName} ${user.lastName}`}</td>
                <td className="p-4 border-b border-gray-200 font-serif text-gray-800">{user.email}</td>
                <td className="p-4 border-b border-gray-200 font-serif text-gray-800 capitalize">{user.gender}</td>
                <td className="p-4 border-b border-gray-200">
                  <select
                    value={user.status}
                    onChange={(e) => onStatusChange(user._id, e.target.value)}
                    className="p-2 border-2 border-gray-300 rounded-lg font-serif text-gray-800 bg-white focus:outline-none focus:border-[#106694] focus:ring-2 focus:ring-[#106694]/20 shadow-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td className="p-4 border-b border-gray-200">
                  {user.photoUrl && (
                    <img
                      src={`${BASE_URL}/${user.photoUrl}`}
                      alt="Profile"
                      className="w-14 h-14 object-cover rounded-full border-2 border-gray-300 shadow-sm"
                    />
                  )}
                </td>
                <td className="p-4 border-b border-gray-200">
                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md min-w-[36px] min-h-[36px] flex items-center justify-center"
                      title="View User"
                      onClick={() => onView(user._id)}
                    >
                      <i className="fas fa-eye text-white"></i>
                    </button>
                    <button
                      className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-200 shadow-sm hover:shadow-md min-w-[36px] min-h-[36px] flex items-center justify-center"
                      title="Edit User"
                      onClick={() => onEdit(user._id)}
                    >
                      <i className="fas fa-edit text-white"></i>
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md min-w-[36px] min-h-[36px] flex items-center justify-center"
                      title="Delete User"
                      onClick={() => onDelete(user._id)}
                    >
                      <i className="fas fa-trash text-white"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserTable