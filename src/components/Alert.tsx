import React, { ReactNode, useState } from 'react'
import Modal from './Modal'
interface IAlertProps {
  visible: boolean
  mainMessage: ReactNode
  subMessage?: string
  cancelMessage: string
  confirmMessage: string
  onClose: () => void
  onCancel: () => void
  onConfirm: () => void
}

export default function Alert({
  visible,
  mainMessage,
  subMessage,
  cancelMessage,
  confirmMessage,
  onClose,
  onCancel,
  onConfirm,
}: IAlertProps) {
  const buttonClassName =
    'h-full w-1/2 cursor-pointer bg-transparent py-4 text-base font-semibold'

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className="flex h-[171px] w-[270px] flex-col justify-center">
        <div className="flex flex-col items-center justify-center border-b border-grey-2 py-6 text-center">
          {mainMessage}
          {subMessage && (
            <p className="pt-4 text-xs font-medium text-grey-8">{subMessage}</p>
          )}
        </div>
        <div className="flex justify-center align-middle">
          <button
            className={`${buttonClassName} text-grey-8`}
            onClick={onCancel}
          >
            {cancelMessage}
          </button>
          <button
            className={`${buttonClassName} text-primary-2`}
            onClick={onConfirm}
          >
            {confirmMessage}
          </button>
        </div>
      </div>
    </Modal>
  )
}
