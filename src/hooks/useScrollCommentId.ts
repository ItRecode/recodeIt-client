import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const useScrollCommentId = () => {
  const { search } = useLocation()
  const query = new URLSearchParams(search)

  const [scrollCommentId, setScrollCommentId] = useState<number | null>(null)

  useEffect(() => {
    const commentIdInQuery = query.get('commentId')

    if (commentIdInQuery) {
      setScrollCommentId(parseInt(commentIdInQuery, 10))
    } else {
      setScrollCommentId(null)
    }
  }, [])

  return { scrollCommentId }
}
