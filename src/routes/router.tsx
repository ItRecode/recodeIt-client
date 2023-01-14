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
import Setting from '@pages/Setting/Setting'
import NotService from '@pages/NotService/NotService'
import OauthLogin from '@pages/Login/[type]'
import SignUp from '@pages/SignUp/SignUp'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute isPublic={false}>
        <NavBar />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Main /> },
      { path: 'rank', element: <Rank /> },
      { path: 'myrecord', element: <MyRecord /> },
      { path: 'setting', element: <Setting /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/login/:type',
    element: <OauthLogin />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/record/add',
    element: (
      <ProtectedRoute isPublic={false}>
        <AddRecord />
      </ProtectedRoute>
    ),
  },
  { path: 'record/:recordIdParams', element: <DetailRecord /> },
  { path: '*', element: <NotFound /> },
  {
    path: '/notservice',
    element: <NotService />,
  },
])

export default router
