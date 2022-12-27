import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RecoilRoot } from 'recoil'

import React from 'react'
import Layout from '@components/Layout'
import RootRoute from '@routes/route'

const queryClient = new QueryClient()

function App() {
  return (
    <Layout>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <RootRoute />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </Layout>
  )
}

export default App
