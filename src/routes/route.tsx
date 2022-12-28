import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { noNeedNavbarPages, needNavbarPages, PageType } from './page'
import ProtectedRoute from './protectedRoute'
import NavBar from '@components/Navbar'

const renderRouteWithProtectedRoute = ({
  pathname,
  isPublic,
  element,
}: PageType) => (
  <Route
    key={pathname}
    path={pathname}
    element={<ProtectedRoute isPublic={isPublic}>{element()}</ProtectedRoute>}
  />
)

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {noNeedNavbarPages.map((route) => renderRouteWithProtectedRoute(route))}
        {needNavbarPages.map((route) => (
          <Route key={route.pathname} element={<NavBar />}>
            {renderRouteWithProtectedRoute(route)}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
