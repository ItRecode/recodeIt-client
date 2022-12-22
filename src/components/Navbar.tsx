import React from 'react'
import { ReactComponent as Home_icon } from '@assets/nav_icons/home_icon.svg'
import { ReactComponent as Lank_icon } from '@assets/nav_icons/lank_icon.svg'
import { ReactComponent as MyRecord_icon } from '@assets/nav_icons/myrecord_icon.svg'
import { ReactComponent as Setting_icon } from '@assets/nav_icons/setting_icon.svg'
import { ReactComponent as Record_icon } from '@assets/nav_icons/record_icon.svg'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function NavBar() {
  const { pathname } = useLocation()

  const checkText = (name: string) => {
    if (pathname === `${name}`) {
      return 'text-primary-2'
    } else return ''
  }

  const checkIcon = (name: string) => {
    if (pathname === `${name}`) {
      return 'fill-primary-2'
    } else return ''
  }

  const containerFormat =
    'group flex h-full w-[54px] flex-col items-center justify-items-center hover:cursor-pointer'
  const iconFormat = 'fill-grey-3 group-hover:fill-primary-2'
  const textFormat = 'text-xs text-grey-3  group-hover:text-primary-2'

  return (
    <>
      <Outlet />
      <div className="absolute bottom-0 flex h-[60px] w-[375px] justify-between rounded-t-xl border border-solid border-grey-3 px-3 pt-1.5">
        <div className="left-3 flex">
          <Link to="/" className={`${containerFormat} mr-5`}>
            <Home_icon className={`${iconFormat} ${checkIcon('/')}`} />
            <p className={`${textFormat} ${checkText('/')}`}>홈</p>
          </Link>
          <Link to="/rank" className={containerFormat}>
            <Lank_icon className={`${iconFormat} ${checkIcon('/rank')}`} />
            <p className={`${textFormat} ${checkText('/rank')}`}>랭킹</p>
          </Link>
        </div>
        <Link
          to="/record/add"
          className="relative bottom-[50px] cursor-pointer"
        >
          <Record_icon />
        </Link>
        <div className="right-3 flex">
          <Link to="/myrecord" className={`${containerFormat} mr-5`}>
            <MyRecord_icon
              className={`${iconFormat} ${checkIcon('/myrecord')}`}
            />
            <p className={`${textFormat} ${checkText('/myrecord')}`}>
              마이레코드
            </p>
          </Link>
          <Link to="/setting" className={containerFormat}>
            <Setting_icon
              className={`${iconFormat} ${checkIcon('/setting')}`}
            />
            <p className={`${textFormat} ${checkText('/setting')}`}>설정</p>
          </Link>
        </div>
      </div>
    </>
  )
}
