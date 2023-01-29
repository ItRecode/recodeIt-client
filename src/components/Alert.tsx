import React, { ReactNode } from 'react'
import Modal from './Modal'
interface IAlertProps {
  visible: boolean
  mainMessage: ReactNode
  subMessage?: ReactNode
  cancelMessage?: string
  confirmMessage: string
  onClose: () => void
  onCancel?: () => void
  onConfirm: () => void
  danger?: boolean
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
  danger,
}: IAlertProps) {
  const buttonClassName =
    'h-full w-1/2 cursor-pointer bg-transparent py-4 text-base font-semibold'

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className="flex h-auto w-[270px] flex-col justify-center">
        <div className="flex flex-col items-center justify-center border-b border-grey-2 py-6 text-center">
          <div className="text-base font-semibold leading-6">{mainMessage}</div>
          {subMessage && (
            <div className="pt-4 text-xs font-medium text-grey-8">
              {subMessage}
            </div>
          )}
        </div>
        <div className="flex justify-center align-middle">
          {onCancel && (
            <button
              aria-label="alert-cancel-message"
              className={`${buttonClassName} border-r border-r-grey-2 text-grey-8`}
              onClick={onCancel}
            >
              {cancelMessage}
            </button>
          )}

          <button
            aria-label="alert-confirm-message"
            className={`${buttonClassName} ${
              danger ? 'text-sub-2' : 'text-primary-2'
            }`}
            onClick={onConfirm}
          >
            {confirmMessage}
          </button>
        </div>
      </div>
    </Modal>
  )
}
