import React from 'react'
import { ReactComponent as Record_icon } from '@assets/nav_icons/record_icon.svg'
import { Outlet, useNavigate } from 'react-router-dom'
import NavbarItem from './NavbarItem'

export default function NavBar() {
  const navigate = useNavigate()

  return (
    <>
      <Outlet />
      <nav className="fixed bottom-0 z-20 flex h-[60px] w-full max-w-[420px] justify-between rounded-t-xl border border-solid border-grey-3 bg-white px-3 pt-1.5">
        <nav className="left-3 flex">
          <NavbarItem pageName="홈" linkSrc="/" className="mr-5" />
          <NavbarItem pageName="모아보기" linkSrc="/rank" />
        </nav>
        <Record_icon
          className="relative bottom-[50px] cursor-pointer"
          onClick={() => navigate('/record/add')}
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
    </>
  )
}
