import React, { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import { MemoizedNavbar } from '@components/Navbar'
import Login from '@pages/Login/Login'
import NotFound from '@pages/NotFound/NotFound'
import OauthLogin from '@pages/Login/[type]'
import SignUp from '@pages/SignUp/SignUp'
import ScrollTop from '@components/ScrollTop'
import Loading from '@components/Loading'

const Main = lazy(() => import('@pages/Main/Main'))
const Collect = lazy(() => import('@pages/Collect/Collect'))
const MyRecord = lazy(() => import('@pages/MyRecord/MyRecord'))
const SearchRecord = lazy(() => import('@pages/MyRecord/Search/SearchRecord'))
const CalendarRecord = lazy(
  () => import('@pages/MyRecord/Calendar/CalendarRecord')
)
const Setting = lazy(() => import('@pages/Setting/Setting'))
const ModifyInfo = lazy(() => import('@pages/Setting/ModifyInfo/ModifyInfo'))
const ManageComment = lazy(
  () => import('@pages/Setting/ManageComment/ManageComment')
)
const TeamIntroduction = lazy(
  () => import('@pages/Setting/TeamIntroduction/TeamIntroduction')
)
const FeedbackMail = lazy(
  () => import('@pages/Setting/FeedbackMail/FeedbackMail')
)
const Withdraw = lazy(() => import('@pages/Setting/Withdraw/Withdraw'))
const CheckedNicknameBeforeWithDraw = lazy(
  () => import('@pages/Setting/Withdraw/CheckedNicknameBeforeWithDraw')
)
const CompletedWithdraw = lazy(
  () => import('@pages/Setting/Withdraw/CompletedWithdraw')
)
const AddRecord = lazy(() => import('@pages/AddRecord/AddRecord'))
const DetailRecord = lazy(() => import('@pages/DetailRecord/DetailRecord'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ScrollTop>
        <MemoizedNavbar />
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
            children: [
              {
                index: true,
                element: (
                  <ProtectedRoute route={'/setting/withdraw'}>
                    <Withdraw />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'check',
                element: (
                  <ProtectedRoute route={'/setting/withdraw/check'}>
                    <CheckedNicknameBeforeWithDraw />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'complete',
                element: (
                  <ProtectedRoute route={'/setting/withdraw/complete'}>
                    <CompletedWithdraw />
                  </ProtectedRoute>
                ),
              },
            ],
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
