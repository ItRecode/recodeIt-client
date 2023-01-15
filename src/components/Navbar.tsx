import React, { useState } from 'react'
import { ReactComponent as Record_icon } from '@assets/nav_icons/record_icon.svg'
import { Outlet, useNavigate } from 'react-router-dom'
import NavbarItem from './NavbarItem'
import { useUser } from '@react-query/hooks/useUser'
import Alert from './Alert'

export default function NavBar() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [isCheckedLogin, setIsCheckedLogin] = useState(false)

  const handleClickRecordAddButton = () => {
    if (!user) {
      setIsCheckedLogin(true)
      return
    }

    setIsCheckedLogin(false)
    navigate('/record/add')
  }

  return (
    <>
      <Outlet />
      <nav className="absolute bottom-0 flex h-[60px] w-full justify-between rounded-t-xl border border-solid border-grey-3 px-3 pt-1.5">
        <nav className="left-3 flex">
          <NavbarItem pageName="홈" linkSrc="/" className="mr-5" />
          <NavbarItem pageName="랭킹" linkSrc="/rank" />
        </nav>
        <Record_icon
          className="relative bottom-[50px] cursor-pointer"
          onClick={handleClickRecordAddButton}
        />
        <nav className="right-3 flex">
          <NavbarItem
            pageName="마이레코드"
            linkSrc="/myrecord"
            className="mr-5"
          />
          <NavbarItem pageName="설정" linkSrc="/setting" />
        </nav>
      </nav>
      {isCheckedLogin && (
        <Alert
          visible={isCheckedLogin}
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
          onClose={() => setIsCheckedLogin(false)}
          onCancel={() => setIsCheckedLogin(false)}
          onConfirm={() => navigate('/login')}
        />
      )}
    </>
  )
}
