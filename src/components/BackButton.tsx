import React from 'react'
import { ReactComponent as Back } from '@assets/back.svg'
import { useNavigate } from 'react-router-dom'

const BackButton = React.memo(function BackBtn({
  onClick,
}: {
  onClick?: () => void
}) {
  const navigate = useNavigate()

  const handleLocateBack = () => {
    if (navigate(-1) === undefined) {
      navigate('/')
    } else {
      navigate(-1)

      if (onClick) {
        return onClick()
      }
    }
  }

  return <Back className="cursor-pointer" onClick={handleLocateBack} />
})

export default BackButton
