import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@react-query/hooks/useUser'
import Alert from '@components/Alert'
import Loading from '@components/Loading'
import { LocalStorage } from '@utils/localStorage'
interface RouteProps {
  children: React.ReactElement
  route?: string
}

const ProtectedRoute = ({ children, route }: RouteProps) => {
  const navigate = useNavigate()
  const { user, isLoading } = useUser()

  const redirectPage = (url: string) => {
    LocalStorage.set('redirectUrl', url)
    navigate('/login')
  }

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
        subMessage={<>로그인하고 추억을 공유해보세요.</>}
        cancelMessage="닫기"
        confirmMessage="로그인"
        onClose={() => navigate('/')}
        onCancel={() => navigate('/')}
        onConfirm={() => redirectPage('/record/add')}
      />
    )
  }

  if (!user && route?.indexOf('myrecord') !== -1) {
    return (
      <Alert
        visible={true}
        mainMessage={
          <div className="text-base font-semibold leading-6">
            비회원은 레코드를
            <br />
            <span className="text-sub-1">확인</span> 할 수 없어요
          </div>
        }
        subMessage={<>로그인하고 추억을 공유해보세요.</>}
        cancelMessage="닫기"
        confirmMessage="로그인"
        onClose={() => navigate('/')}
        onCancel={() => navigate('/')}
        onConfirm={() => redirectPage('/myrecord')}
      />
    )
  }

  if (!user && route?.indexOf('withdraw') !== -1) {
    return (
      <Alert
        visible={true}
        mainMessage={
          <div className="text-base font-semibold leading-6">
            비회원은 계정을
            <br />
            <span className="text-sub-1">탈퇴</span> 할 수 없어요
          </div>
        }
        cancelMessage="닫기"
        confirmMessage="로그인"
        onClose={() => navigate('/')}
        onCancel={() => navigate('/')}
        onConfirm={() => redirectPage('/setting')}
      />
    )
  }

  return children
}

export default ProtectedRoute
