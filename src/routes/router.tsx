import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import NavBar from '@components/Navbar'
import Main from '@pages/Main/Main'
import Collect from '@pages/Collect/Collect'
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
import SearchRecord from '@pages/MyRecord/Search/SearchRecord'
import CalendarRecord from '@pages/MyRecord/Calendar/CalendarRecord'
import ModifyInfo from '@pages/Setting/ModifyInfo/ModifyInfo'
import ManageComment from '@pages/Setting/ManageComment/ManageComment'
import TeamIntroduction from '@pages/Setting/TeamIntroduction/TeamIntroduction'
import FeedbackMail from '@pages/Setting/FeedbackMail/FeedbackMail'
import Withdraw from '@pages/Setting/Withdraw/Withdraw'
import CheckedNicknameBeforeWithDraw from '@pages/Setting/Withdraw/CheckedNicknameBeforeWithDraw'
import CompletedWithdraw from '@pages/Setting/Withdraw/CompletedWithdraw'

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
      { path: 'collect', element: <Collect /> },
      {
        path: 'myrecord',
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute route={'/myrecord'}>
                <MyRecord />
              </ProtectedRoute>
            ),
          },
          {
            path: 'search',
            element: (
              <ProtectedRoute route={'/myrecord/search'}>
                <SearchRecord />
              </ProtectedRoute>
            ),
          },
          {
            path: 'date',
            element: (
              <ProtectedRoute route={'/myrecord/date'}>
                <CalendarRecord />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: 'setting',
    children: [
      {
        index: true,
        element: (
          <ScrollTop>
            <NavBar />
            <Setting />
          </ScrollTop>
        ),
      },
      {
        path: 'modifyinfo',
        element: (
          <ProtectedRoute route={'/modifyinfo'}>
            <ModifyInfo />
          </ProtectedRoute>
        ),
      },
      {
        path: 'managecomment',
        element: (
          <ProtectedRoute route={'/managecomment'}>
            <ManageComment />
          </ProtectedRoute>
        ),
      },
      {
        path: 'teamintroduction',
        element: <TeamIntroduction />,
      },
      {
        path: 'feedbackmail',
        element: <FeedbackMail />,
      },
      {
        path: 'withdraw',
        children: [
          { index: true, element: <Withdraw /> },
          { path: 'check', element: <CheckedNicknameBeforeWithDraw /> },
          { path: 'complete', element: <CompletedWithdraw /> },
        ],
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
