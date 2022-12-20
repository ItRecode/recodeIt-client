import React from 'react'
import { ReactComponent as Back } from '@assets/back.svg'
import { useNavigate } from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate()
  const handleLocateBack = () => {
    navigate(-1)
  }

  return <Back onClick={handleLocateBack}></Back>
}

export default BackButton
