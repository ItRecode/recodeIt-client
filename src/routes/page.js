/* eslint-disable react/react-in-jsx-scope */
import AddRecord from '@pages/AddRecord/AddRecord'
import DetailRecord from '@pages/DetailRecord/DetailRecord'
import Main from '@pages/Main/Main'
import NotFound from '@pages/NotFound/NotFound'
import Rank from '@pages/Rank/Rank'
import MyRecord from '@pages/MyRecord/MyRecord'
import Setting from '@pages/Setting/Setting'
import Login from '@pages/Login/Login'

export const noNeedNavbarPages = [
  { pathname: '/login', element: <Login />, isPublic: true },
  { pathname: '/record/add', element: <AddRecord />, isPublic: true },
  {
    pathname: '/record/:recordId',
    element: <DetailRecord />,
    isPublic: true,
  },
  { pathname: '*', element: <NotFound />, isPublic: true },
]

export const needNavbarPages = [
  { pathname: '/', element: <Main />, isPublic: true },
  { pathname: '/rank', element: <Rank />, isPublic: true },
  { pathname: '/myrecord', element: <MyRecord />, isPublic: true },
  { pathname: '/setting', element: <Setting />, isPublic: true },
]
