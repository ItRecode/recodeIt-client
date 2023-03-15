import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import NavBar from '@components/Navbar'
import Login from '@pages/Login/Login'
import NotFound from '@pages/NotFound/NotFound'
import OauthLogin from '@pages/Login/[type]'
import SignUp from '@pages/SignUp/SignUp'
import ScrollTop from '@components/ScrollTop'
import Loading from '@components/Loading'

const Main = React.lazy(() => import('@pages/Main/Main'))
const Collect = React.lazy(() => import('@pages/Collect/Collect'))
const MyRecord = React.lazy(() => import('@pages/MyRecord/MyRecord'))
const SearchRecord = React.lazy(
  () => import('@pages/MyRecord/Search/SearchRecord')
)
const CalendarRecord = React.lazy(
  () => import('@pages/MyRecord/Calendar/CalendarRecord')
)
const Setting = React.lazy(() => import('@pages/Setting/Setting'))
const ModifyInfo = React.lazy(
  () => import('@pages/Setting/ModifyInfo/ModifyInfo')
)
const ManageComment = React.lazy(
  () => import('@pages/Setting/ManageComment/ManageComment')
)
const TeamIntroduction = React.lazy(
  () => import('@pages/Setting/TeamIntroduction/TeamIntroduction')
)
const FeedbackMail = React.lazy(
  () => import('@pages/Setting/FeedbackMail/FeedbackMail')
)
const Withdraw = React.lazy(() => import('@pages/Setting/Withdraw/Withdraw'))
const AddRecord = React.lazy(() => import('@pages/AddRecord/AddRecord'))
const DetailRecord = React.lazy(
  () => import('@pages/DetailRecord/DetailRecord')
)

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
      {
        path: 'setting',
        children: [
          {
            index: true,
            element: <Setting />,
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
            element: <Withdraw />,
          },
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
          <Suspense fallback={<Loading />}>
            <AddRecord />
          </Suspense>
        </ScrollTop>
      </ProtectedRoute>
    ),
  },
  {
    path: 'record/:recordIdParams',
    element: (
      <Suspense fallback={<Loading />}>
        <DetailRecord />
      </Suspense>
    ),
  },
  { path: '*', element: <NotFound /> },
])

export default router
