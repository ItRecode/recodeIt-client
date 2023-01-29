import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as Home_icon } from '@assets/nav_icons/home_icon.svg'
import { ReactComponent as Rank_icon } from '@assets/nav_icons/rank_icon.svg'
import { ReactComponent as MyRecord_icon } from '@assets/nav_icons/myrecord_icon.svg'
import { ReactComponent as Setting_icon } from '@assets/nav_icons/setting_icon.svg'

interface NavbarItemPropsType {
  pageName: string
  linkSrc: string
  className?: string
}

export default function NavbarItem({
  pageName,
  linkSrc,
  className,
}: NavbarItemPropsType) {
  const containerFormat =
    'group flex h-full w-[54px] flex-col items-center justify-items-center hover:cursor-pointer'
  const iconFormat = 'group-hover:fill-primary-2'
  const textFormat = 'text-xs group-hover:text-primary-2'

  const { pathname } = useLocation()

  const checkPathWithText = (linkSrc: string) => {
    if (pathname === `${linkSrc}`) {
      return 'text-primary-2'
    }
    return 'text-grey-3'
  }

  const checkPathWithIconImg = (linkSrc: string) => {
    if (pathname === linkSrc) {
      return 'fill-primary-2'
    }
    return 'fill-grey-3'
  }

  const navbarIcon = (linkSrc: string) => {
    switch (linkSrc) {
      case '/':
        return (
          <Home_icon
            className={`${iconFormat} ${checkPathWithIconImg(linkSrc)}`}
          />
        )
      case '/rank':
        return (
          <Rank_icon
            className={`${iconFormat} ${checkPathWithIconImg(linkSrc)}`}
          />
        )
      case '/myrecord':
        return (
          <MyRecord_icon
            className={`${iconFormat} ${checkPathWithIconImg(linkSrc)}`}
          />
        )
      case '/setting':
        return (
          <Setting_icon
            className={`${iconFormat} ${checkPathWithIconImg(linkSrc)}`}
          />
        )
    }
  }

  return (
    <Link to={linkSrc} className={`${containerFormat} ${className}`}>
      {navbarIcon(linkSrc)}
      <p className={`${textFormat} ${checkPathWithText(linkSrc)} w-max`}>
        {pageName}
      </p>
    </Link>
  )
}
