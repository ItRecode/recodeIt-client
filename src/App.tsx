import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RecoilRoot } from 'recoil'

import React from 'react'
import Layout from '@components/Layout'
import Router from '@routes/router'
import { RouterProvider } from 'react-router-dom'
import router from '@routes/router'

const queryClient = new QueryClient()

function App() {
  return (
    <Layout>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </Layout>
  )
}

export default App
