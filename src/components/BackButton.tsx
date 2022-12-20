import React from 'react'
import { ReactComponent as Back } from '@assets/back.svg'
import { useNavigate } from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate()
  const locateBack = () => {
    navigate(-1)
  }

  return (
    <div onClick={locateBack}>
      <Back></Back>
    </div>
  )
}

export default BackButton
