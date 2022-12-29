const Kakao_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY

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
  const { Kakao }: any = window
  if (!Kakao.isInitialized()) Kakao.init(Kakao_API_KEY)

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title,
      description,
      imageUrl: '',
      link: {
        mobileWebUrl: 'https://developers.kakao.com',
      },
    },

    buttons: [
      {
        title: '레코드 보러가기',
        link: {
          mobileWebUrl: `https://recordit.vercel.app/record/${recordId}`,
          webUrl: `https://recordit.vercel.app/record/${recordId}`,
        },
      },
    ],
  })
}

export const copyLink = async (recordId: number) => {
  try {
    await navigator.clipboard.writeText(
      `https://recordit.vercel.app/record/${recordId}`
    )
    alert('링크를 복사했습니다.')
  } catch (error) {
    alert('링크 복사에 실패했어요.')
  }
}
