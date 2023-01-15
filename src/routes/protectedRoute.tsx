import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@react-query/hooks/useUser'
import Alert from '@components/Alert'
import Loading from '@components/Loading'
interface RouteProps {
  children: React.ReactElement
  route?: string
}

const ProtectedRoute = ({ children, route }: RouteProps) => {
  const navigate = useNavigate()
  const { user, isLoading } = useUser()

  if (isLoading) {
    return <Loading />
  }

  if (!user && route === '/record/add') {
    return (
      <Alert
        visible={true}
        mainMessage={
          <div className="text-base font-semibold leading-6">
            비회원은 레코드를
            <br />
            <span className="text-sub-1">추가</span> 할 수 없어요
          </div>
        }
        subMessage="회원가입하고 추억을 공유해보세요."
        cancelMessage="닫기"
        confirmMessage="회원가입"
        onClose={() => navigate('/')}
        onCancel={() => navigate('/')}
        onConfirm={() => navigate('/login')}
      />
    )
  }

  return children
}

export default ProtectedRoute
