import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import NavBar from '@components/Navbar'
import Main from '@pages/Main/Main'
import Rank from '@pages/Rank/Rank'
import MyRecord from '@pages/MyRecord/MyRecord'
import Login from '@pages/Login/Login'
import AddRecord from '@pages/AddRecord/AddRecord'
import DetailRecord from '@pages/DetailRecord/DetailRecord'
import NotFound from '@pages/NotFound/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute isPublic={true}>
        <NavBar />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Main /> },
      { path: 'rank', element: <Rank /> },
      { path: 'myrecord', element: <MyRecord /> },
      { path: 'setting', element: <MyRecord /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/record/add',
    element: (
      <ProtectedRoute isPublic={true}>
        <AddRecord />
      </ProtectedRoute>
    ),
  },
  { path: 'record/:recordId', element: <DetailRecord /> },

  { path: '*', element: <NotFound /> },
])

export default router
