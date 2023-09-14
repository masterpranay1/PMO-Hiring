import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from "./pages/Register"
import Login from "./pages/Login"
import HiringForm from "./pages/HiringForm"
import { auth } from "./util/firabse"
import { signOut } from "firebase/auth"
import { useEffect } from "react"

export default function App() {

  useEffect(() => {
    const signOutUser = async () => {
      await signOut(auth);
    }
    return () => {
      signOutUser();
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/hiring-form' element={<HiringForm />} />
      </Routes>
    </>
  )
}