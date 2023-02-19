import React, { Dispatch, SetStateAction } from 'react'
import useClickOutside from '@hooks/useClickOutside'
import { keyOfRankingPeriod, RANKINGPERIOD } from '@assets/constant/ranking'

export default function PeriodModal({
  setRankingPeriod,
  setOpenModal,
}: {
  setRankingPeriod: Dispatch<SetStateAction<keyOfRankingPeriod>>
  setOpenModal: Dispatch<SetStateAction<boolean>>
}) {
  const modalRef = useClickOutside<HTMLDivElement>(() => {
    setOpenModal(false)
  })

  const handleClickBtn = (key: keyOfRankingPeriod) => {
    setRankingPeriod(key)
    setOpenModal(false)
  }

  return (
    <>
      <div
        ref={modalRef}
        className="absolute bottom-0 z-30 flex h-[262px] w-full animate-[popUp_150ms_linear] flex-col items-center justify-center rounded-t-lg bg-grey-1 px-6"
      >
        <table className="table w-full border-collapse border-hidden">
          {Object.entries(RANKINGPERIOD).map(([key, value]) => (
            <tbody key={key}>
              <tr onClick={() => handleClickBtn(key as keyOfRankingPeriod)}>
                <td className="table-cell h-[54px] cursor-pointer border-t border-solid border-grey-2">
                  <p className="text-left text-base font-semibold leading-[54px]">
                    {value}
                  </p>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="fixed left-0 z-10 flex h-full w-screen items-end justify-center">
        <div className="absolute flex h-full w-screen bg-grey-10 opacity-50" />
      </div>
    </>
  )
}
