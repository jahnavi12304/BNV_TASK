import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserList from "./pages/UserList"
import UserForm from "./pages/UserForm"
import UserDetails from "./pages/UserDetails"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./styles/index.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FFEBCD]">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
          <Route path="/view/:id" element={<UserDetails />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  )
}

export default App
