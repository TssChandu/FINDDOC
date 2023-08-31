import React from 'react'
import { useState } from "react";
import { createContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ApplyDoctor from './pages/ApplyDoctor'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Notifications from './pages/Notifications'
import DoctorsList from './pages/Admin/DoctorsList'
import UsersList from './pages/Admin/UsersList'
import Profile from './pages/Doctor/Profile'
import BookAppointment from './pages/BookAppointment'
import Appointments from './pages/Appointments'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import OTPInput from './pages/recovery/OTPInput'
import Reset from './pages/recovery/Reset'

export const RecoveryContext = createContext();

export const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  const [page, setPage] = useState("");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  function NavigateComponents() {
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset />;
  }
  return (
    <BrowserRouter>
      {loading && (
        <div className='spinner-parent'>
          <div className="spinner-border text-warning" role="status"></div>
        </div>)}
      <Toaster position="top-center"
        reverseOrder={false} />
      <RecoveryContext.Provider
        value={{ page, setPage, otp, setOTP, setEmail, email }}>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>} />
          <Route path={`/${page}`} element={
            <PublicRoute>
              <NavigateComponents />
            </PublicRoute>}
          />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>} />
          <Route path="/apply-doctor" element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>} />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>} />
          <Route path="/admin/doctorslist" element={
            <ProtectedRoute>
              <DoctorsList />
            </ProtectedRoute>} />
          <Route path="/admin/userslist" element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>} />
          <Route path="/doctor/profile/:userId" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>} />
          <Route path="/book-appointment/:doctorId" element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>} />
          <Route path="/appointments" element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>} />
          <Route path="/doctor/appointments" element={
            <ProtectedRoute>
              <DoctorAppointments />
            </ProtectedRoute>} />
        </Routes>
      </RecoveryContext.Provider>
    </BrowserRouter>
  )
}

export default App