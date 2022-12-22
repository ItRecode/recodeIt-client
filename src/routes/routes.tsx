import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddRecord from '@pages/AddRecord/AddRecord'
import DetailRecord from '@pages/DetailRecord/DetailRecord'
import Main from '@pages/Main/Main'
import NotFound from '@pages/NotFound/NotFound'
import Login from '@pages/Login/Login'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/record/add" element={<AddRecord />} />
        <Route path="/record/:recordId" element={<DetailRecord />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
