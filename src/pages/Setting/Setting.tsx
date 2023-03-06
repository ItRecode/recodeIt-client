import { useUser } from '@react-query/hooks/useUser'
import React, { useState } from 'react'
import SettingSection from './SettingSection'
import { ReactComponent as Front } from '@assets/front_white.svg'
import { useNavigate } from 'react-router-dom'
import Alert from '@components/Alert'
import Loading from '@components/Loading'

export default function Setting() {
  const { user, isLoading, logoutUser } = useUser()
  const [isClickedLogout, setIsClickedLogout] = useState(false)

  const PADDING_VALUE = 24

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      logoutUser()
      navigate('/')
    } catch (e) {
      alert('로그아웃에 실패하였습니다.')
    }
  }

  const getPaddingIgnoreWidth = () => {
    return `ml-[-${PADDING_VALUE}px] w-[calc(100%+${PADDING_VALUE * 2}px)]`
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="flex  h-full flex-col px-6 pt-10">
      {user !== null ? (
        <div>
          <section>
            <div className="pb-10 text-2xl font-semibold text-grey-10">
              <p className=" text-primary-2">
                {user?.data}
                <span className=" text-grey-10"> 님,</span>
              </p>
              <p>안녕하세요</p>
            </div>
            <SettingSection
              routeText="내 정보 수정"
              routeUrl="/setting/modifyinfo"
              state={{ nickname: user.data }}
            />
            <SettingSection
              routeText="내 댓글 관리"
              routeUrl="/setting/managecomment"
            />
          </section>
          <div className={`h-[15px] ${getPaddingIgnoreWidth()} bg-grey-2`} />
        </div>
      ) : (
        ''
      )}
      <section>
        {!user && (
          <div
            onClick={() => navigate('/login')}
            className="flex cursor-pointer items-center justify-between rounded-2xl bg-primary-2 py-6 px-5 text-grey-1"
          >
            <div>
              <p className="mb-2 text-lg font-semibold">레코딧 회원가입</p>
              <p className="text-xs font-normal">
                회원가입하고 더 많은 추억을 공유해보세요.
              </p>
            </div>
            <Front />
          </div>
        )}
        <SettingSection
          routeText="팀 소개"
          routeUrl="/setting/teamintroduction"
        />
        <SettingSection
          routeText="피드백 메일"
          routeUrl="/setting/feedbackmail"
        />
      </section>
      {user && (
        <div>
          <div className={`h-[15px] ${getPaddingIgnoreWidth()} bg-grey-2`} />
          <section
            id="logout-item-section"
            onClick={() => setIsClickedLogout(true)}
          >
            <SettingSection routeText="로그아웃" />
          </section>
          {/* <section id="withdraw-item-section">
            <SettingSection routeText="회원탈퇴" routeUrl="/setting/withdraw" />
          </section> */}
        </div>
      )}
      {isClickedLogout && (
        <Alert
          visible={true}
          mainMessage={
            <>
              <span className="text-sub-1">로그아웃</span> 하시겠어요?
            </>
          }
          confirmMessage="둘러보기"
          cancelMessage="로그아웃"
          onConfirm={() => setIsClickedLogout(false)}
          onClose={() => setIsClickedLogout(false)}
          onCancel={handleLogout}
        />
      )}
    </div>
  )
}
