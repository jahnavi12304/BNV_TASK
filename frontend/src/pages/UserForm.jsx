"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import userService, { BASE_URL } from "../utils/userService"
import { toast } from "react-toastify"

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  gender: Yup.string().oneOf(["male", "female"]).required("Required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Invalid mobile")
    .required("Required"),
  status: Yup.string().oneOf(["active", "inactive"]).required("Required"),
  location: Yup.string().required("Required"),
})

const UserForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    mobile: "",
    status: "active",
    location: "",
    photo: null,
  })

  useEffect(() => {
    if (id) fetchUser()
  }, [id])

  const fetchUser = async () => {
    try {
      const user = await userService.getUser(id)
      setInitialValues({ ...user, photo: null })
    } catch (err) {
      toast.error("Failed to load user")
    }
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (key === "photo" && value) formData.append("photo", value)
      else formData.append(key, value)
    })

    try {
      if (id) {
        await userService.editUser(id, formData)
        toast.success("User updated")
      } else {
        await userService.addUser(formData)
        toast.success("User added")
      }
      navigate("/")
    } catch (err) {
      toast.error("Operation failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-[#FFEBCD] flex justify-center items-center">
      <div className="w-full max-w-4xl mx-auto p-12 font-serif bg-white rounded-xl shadow-2xl border-2 border-[#106694]">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 uppercase tracking-wide">
          {id ? "Edit User" : "Add User"}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-base font-bold mb-2 text-gray-700">First Name *</label>
                  <Field
                    name="firstName"
                    className="w-full p-3 text-base font-serif border-2 border-gray-300 rounded-lg bg-white transition-all duration-300 focus:border-[#106694] focus:ring-2 focus:ring-[#106694]/20 focus:outline-none text-black shadow-sm"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-base font-bold mb-2 text-gray-700">Last Name *</label>
                  <Field
                    name="lastName"
                    className="w-full p-3 text-base font-serif border-2 border-gray-300 rounded-lg bg-white transition-all duration-300 focus:border-[#106694] focus:ring-2 focus:ring-[#106694]/20 focus:outline-none text-black shadow-sm"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div>
                <label className="block text-base font-bold mb-2 text-gray-700">Email *</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full p-3 text-base font-serif border-2 border-gray-300 rounded-lg bg-white transition-all duration-300 focus:border-[#106694] focus:ring-2 focus:ring-[#106694]/20 focus:outline-none text-black shadow-sm"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-base font-bold mb-2 text-gray-700">Gender *</label>
                  <Field
                    as="select"
                    name="gender"
                    className="w-full p-3 text-base font-serif border-2 border-gray-300 rounded-lg bg-white transition-all duration-300 focus:border-[#106694] focus:ring-2 focus:ring-[#106694]/20 focus:outline-none text-black shadow-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-base font-bold mb-2 text-gray-700">Mobile *</label>
                  <Field
                    name="mobile"
                    className="w-full p-3 text-base font-serif border-2 border-gray-300 rounded-lg bg-white transition-all duration-300 focus:border-[#106694] focus:ring-2 focus:ring-[#106694]/20 focus:outline-none text-black shadow-sm"
                  />
                  <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-base font-bold mb-2 text-gray-700">Status *</label>
                  <Field
                    as="select"
                    name="status"
                    className="w-full p-3 text-base font-serif border-2 border-gray-300 rounded-lg bg-white transition-all duration-300 focus:border-[#106694] focus:ring-2 focus:ring-[#106694]/20 focus:outline-none text-black shadow-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-base font-bold mb-2 text-gray-700">Location *</label>
                  <Field
                    name="location"
                    className="w-full p-3 text-base font-serif border-2 border-gray-300 rounded-lg bg-white transition-all duration-300 focus:border-[#106694] focus:ring-2 focus:ring-[#106694]/20 focus:outline-none text-black shadow-sm"
                  />
                  <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div>
                <label className="block text-base font-bold mb-2 text-gray-700">Profile Photo</label>
                {initialValues.photoUrl && (
                  <div className="mb-3">
                    <img
                      src={`${BASE_URL}/${initialValues.photoUrl}`}
                      alt="Current Profile"
                      className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                    />
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => setFieldValue("photo", e.target.files[0])}
                  className="w-full p-3 text-base font-serif border-2 border-gray-300 rounded-lg bg-white text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#106694] file:text-white hover:file:bg-[#0d5578] shadow-sm"
                />
              </div>

              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="px-8 py-4 text-lg font-serif border-none rounded-lg cursor-pointer transition-all duration-300 bg-[#106694] text-white hover:bg-[#0d5578] hover:scale-105 disabled:bg-blue-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  disabled={isSubmitting}
                >
                  {id ? "Update User" : "Add User"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UserForm