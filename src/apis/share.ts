interface IShareDataType {
  recordId: number
  title: string
  description: string
  imageUrl?: string
}
export const ShareKakao = ({
  recordId,
  title,
  description,
  imageUrl,
}: IShareDataType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { Kakao }: any = window
  if (!Kakao.isInitialized()) {
    Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY)
  }

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: title,
      description: description,
      imageUrl: imageUrl
        ? imageUrl
        : 'https://record-it.s3.ap-northeast-2.amazonaws.com/imagefile-dev/sharing+png',

      link: {
        webUrl: process.env.REACT_APP_WEB_URL,
        mobileWebUrl: process.env.REACT_APP_WEB_URL,
      },
    },

    buttons: [
      {
        title: '레코드 보러가기',
        link: {
          mobileWebUrl: `${process.env.REACT_APP_WEB_URL}/record/${recordId}`,
          webUrl: `${process.env.REACT_APP_WEB_URL}/record/${recordId}`,
        },
      },
    ],
  })
}

export const copyLink = async (recordId: number) => {
  try {
    await navigator.clipboard.writeText(
      `${window.location.origin}/record/${recordId}`
    )
    alert('링크를 복사했습니다.')
  } catch (error) {
    alert('링크 복사에 실패했어요.')
  }
}
