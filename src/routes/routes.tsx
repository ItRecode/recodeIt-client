import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddRecord from '@pages/AddRecord/AddRecord'
import DetailRecord from '@pages/DetailRecord/DetailRecord'
import Main from '@pages/Main/Main'
import NotFound from '@pages/NotFound/NotFound'
import Rank from '@pages/Rank/Rank'
import MyRecord from '@pages/MyRecord/MyRecord'
import Setting from '@pages/Setting/Setting'
import NavBar from '@components/Navbar'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Main />} />
          <Route path="rank" element={<Rank />} />
          <Route path="myrecord" element={<MyRecord />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="/record/add" element={<AddRecord />} />
        <Route path="/record/:recordId" element={<DetailRecord />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
