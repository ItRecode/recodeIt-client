import BackButton from '@components/BackButton'
import React from 'react'
import { ReactComponent as Arrow } from '@assets/6x12RightArrow.svg'

function TeamIntroduction() {
  return (
    <div>
      <header className="p-4">
        <BackButton />
      </header>
      <div className="mt-6 aspect-[375/277] w-full bg-[url('@assets/teamIntroductionImage.svg')] bg-cover" />
      <div className="px-6 py-10">
        <p className="text-xl font-semibold leading-normal">
          <span className="text-primary-2">텐져스</span>를 소개합니다!
        </p>
        <div className="mt-4 text-sm text-grey-9">
          <p>감정 공유에 진심인 10명이 모여 감정을 기록할 수 있는</p>
          <p>
            서비스 <span className="text-primary-2">Recordit</span>을 개발 중인
            팀 텐져스 입니다.
          </p>
        </div>

        <button
          onClick={() =>
            window.open(
              'https://itrecord.notion.site/itrecord/b55dba4e491144d5b62efd0bdbe15b36'
            )
          }
          className="mt-8 flex w-full cursor-pointer items-center justify-between bg-transparent p-0 text-base font-semibold"
        >
          <p>
            더 자세한 팀 <span className="text-primary-2">텐져스의 이야기</span>{' '}
            보러가기
          </p>
          <Arrow />
        </button>
      </div>
    </div>
  )
}

export default TeamIntroduction
