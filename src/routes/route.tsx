/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { noNeedNavbarPages, needNavbarPages } from './page'
import ProtectedRoute from './protectedRoute'
import NavBar from '@components/Navbar'

const RootRoute = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {noNeedNavbarPages.map((r) => {
          return (
            <Route
              key={r.pathname}
              path={r.pathname}
              element={
                <ProtectedRoute isPublic={r.isPublic}>
                  {r.element}
                </ProtectedRoute>
              }
            />
          )
        })}
        {needNavbarPages.map((r) => {
          return (
            <Route key={r.pathname} element={<NavBar />}>
              <Route
                key={r.pathname}
                path={r.pathname}
                element={
                  <ProtectedRoute isPublic={r.isPublic}>
                    {r.element}
                  </ProtectedRoute>
                }
              />
            </Route>
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default RootRoute
