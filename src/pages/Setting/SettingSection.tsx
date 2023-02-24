import React from 'react'
import { ReactComponent as Front } from '@assets/front.svg'
import { useNavigate } from 'react-router-dom'

interface SettingSectionProps {
  routeUrl?: string
  routeText: string
}

function SettingSection({ routeUrl, routeText }: SettingSectionProps) {
  const navigate = useNavigate()

  const handleClickSection = () => {
    if (routeUrl) {
      navigate(routeUrl)
    }
  }

  return (
    <div
      onClick={handleClickSection}
      className="flex cursor-pointer items-center justify-between py-5 font-semibold "
    >
      <p>{routeText}</p>
      <Front />
    </div>
  )
}

export default SettingSection
