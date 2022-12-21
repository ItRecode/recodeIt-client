import React from 'react'
import { ReactComponent as Home_icon } from '@assets/nav_icons/home_icon.svg'
import { ReactComponent as Lank_icon } from '@assets/nav_icons/lank_icon.svg'
import { ReactComponent as MyRecord_icon } from '@assets/nav_icons/myrecord_icon.svg'
import { ReactComponent as Config_icon } from '@assets/nav_icons/config_icon.svg'
import { ReactComponent as Record_icon } from '@assets/nav_icons/record_icon.svg'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className="absolute bottom-0 flex h-[60px] w-[375px] justify-between rounded-t-xl border border-solid border-grey-3 px-3 pt-1.5">
      <div className="left-3 flex">
        <div className="group mr-2.5 flex h-full w-[54px] flex-col items-center justify-items-center hover:cursor-pointer">
          <Home_icon className="fill-grey-3 group-hover:fill-primary-2 " />
          <p className="text-xs text-grey-3  group-hover:text-primary-2">홈</p>
        </div>
        <div className="group flex h-full w-[54px] flex-col items-center justify-items-center hover:cursor-pointer">
          <Lank_icon className="fill-grey-3 group-hover:fill-primary-2" />
          <p className="text-xs text-grey-3  group-hover:text-primary-2">
            랭킹
          </p>
        </div>
      </div>
      <div className="relative bottom-[50px] cursor-pointer">
        <Record_icon />
      </div>
      <div className="right-3 flex">
        <div className="group mr-2.5 flex h-full w-[54px] flex-col items-center justify-items-center hover:cursor-pointer">
          <MyRecord_icon className="fill-grey-3 group-hover:fill-primary-2" />
          <p className="text-xs text-grey-3  group-hover:text-primary-2">
            마이레코드
          </p>
        </div>
        <div className="group flex h-full w-[54px] flex-col items-center justify-items-center hover:cursor-pointer">
          <Config_icon className="fill-grey-3 group-hover:fill-primary-2" />
          <p className="text-xs text-grey-3  group-hover:text-primary-2">
            설정
          </p>
        </div>
      </div>
    </div>
  )
}
