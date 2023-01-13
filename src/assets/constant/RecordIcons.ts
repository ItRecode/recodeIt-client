import Heart from '@assets/record_icons/heart.svg'
import Gift from '@assets/record_icons/gift.svg'
import Music from '@assets/record_icons/music.svg'
import Rocket from '@assets/record_icons/rocket.svg'
import Like from '@assets/record_icons/like.svg'
import Crown from '@assets/record_icons/crown.svg'
import Medal from '@assets/record_icons/medal.svg'
import Moon from '@assets/record_icons/moon.svg'
import Speechbubble from '@assets/record_icons/speechbubble.svg'
import Wine from '@assets/record_icons/wine.svg'
import Umbrella from '@assets/record_icons/umbrella.svg'
import Trashcan from '@assets/record_icons/trashcan.svg'
import Lock from '@assets/record_icons/lock.svg'

export const ADD_RECORD_ICONS = Object.freeze({
  celebration: [
    { src: Gift, choosed: true, id: 0 },
    { src: Heart, choosed: false, id: 1 },
    { src: Music, choosed: false, id: 2 },
    { src: Rocket, choosed: false, id: 3 },
    { src: Like, choosed: false, id: 4 },
    { src: Crown, choosed: false, id: 5 },
    { src: Medal, choosed: false, id: 6 },
  ],
  consolation: [
    { src: Moon, choosed: true, id: 0 },
    { src: Speechbubble, choosed: false, id: 1 },
    { src: Wine, choosed: false, id: 2 },
    { src: Umbrella, choosed: false, id: 3 },
    { src: Trashcan, choosed: false, id: 4 },
    { src: Lock, choosed: false, id: 5 },
  ],
})
