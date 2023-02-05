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
import NotRecord from '@pages/NotRecord/NotRecord'
import ScrollTop from '@components/ScrollTop'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ScrollTop>
        <NavBar />
      </ScrollTop>
    ),
    children: [
      { index: true, element: <Main /> },
      { path: 'rank', element: <Rank /> },
      {
        path: 'myrecord',
        element: (
          <ProtectedRoute route={'/myrecord'}>
            <MyRecord />
          </ProtectedRoute>
        ),
      },
      {
        path: 'setting',
        element: (
          <ProtectedRoute route={'/setting'}>
            <Setting />
          </ProtectedRoute>
        ),
      },
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
      <ProtectedRoute route={'/record/add'}>
        <ScrollTop>
          <AddRecord />
        </ScrollTop>
      </ProtectedRoute>
    ),
  },
  { path: 'record/:recordIdParams', element: <DetailRecord /> },
  { path: '*', element: <NotFound /> },
  { path: '/notrecord', element: <NotRecord /> },
  {
    path: '/notservice',
    element: <NotService />,
  },
])

export default router
