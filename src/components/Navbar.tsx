import React from 'react'
import { ReactComponent as Record_icon } from '@assets/nav_icons/record_icon.svg'
import { Link, Outlet } from 'react-router-dom'
import NavbarItem from './NavbarItem'

export default function NavBar() {
  return (
    <>
      <Outlet />
      <nav className="absolute bottom-0 flex h-[60px] w-[375px] justify-between rounded-t-xl border border-solid border-grey-3 px-3 pt-1.5">
        <nav className="left-3 flex">
          <NavbarItem pageName="홈" linkSrc="/" className="mr-5" />
          <NavbarItem pageName="랭킹" linkSrc="/rank" />
        </nav>
        <Link
          to="/record/add"
          className="relative bottom-[50px] cursor-pointer"
        >
          <Record_icon />
        </Link>
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
