import React from 'react'
import { ReactComponent as Back } from '@assets/back.svg'
import { useNavigate } from 'react-router-dom'

function BackButton({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate()

  const handleLocateBack = () => {
    if (onClick) {
      return onClick()
    }

    navigate(-1)
  }

  return <Back className="cursor-pointer" onClick={handleLocateBack} />
}

export default BackButton
