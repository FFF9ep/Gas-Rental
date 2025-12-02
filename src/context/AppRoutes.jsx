import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import CarDetail from '../pages/CarDetail'
import BookingWizard from '../pages/BookingWizard'
import PaymentSuccess from '../pages/PaymentSuccess'
import History from '../pages/History'
import Login from '../pages/Login'
import AdminManageCars from '../pages/admin/ManageCars'

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/car/:id" element={<CarDetail />} />
      <Route path="/car/:id/booking" element={<BookingWizard />} />
      <Route path="/payment-success/:id" element={<PaymentSuccess />} />
      <Route path="/history" element={<History />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/manage-cars" element={<AdminManageCars />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
