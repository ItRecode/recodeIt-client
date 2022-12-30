import { FunctionComponent } from 'react'
import { ReactComponent as crown } from './crown.svg'
import { ReactComponent as gift } from './gift.svg'
import { ReactComponent as heart } from './heart.svg'
import { ReactComponent as like } from './like.svg'
import { ReactComponent as lock } from './lock.svg'
import { ReactComponent as medal } from './medal.svg'
import { ReactComponent as moon } from './moon.svg'
import { ReactComponent as music } from './music.svg'
import { ReactComponent as rocket } from './rocket.svg'
import { ReactComponent as speechbubble } from './speechbubble.svg'
import { ReactComponent as trashcan } from './trashcan.svg'
import { ReactComponent as umbrella } from './umbrella.svg'
import { ReactComponent as wine } from './wine.svg'

type iconType = {
  [index: string]: FunctionComponent<React.SVGProps<SVGSVGElement>>
}

const icons: iconType = {
  crown,
  gift,
  heart,
  like,
  lock,
  medal,
  moon,
  music,
  rocket,
  speechbubble,
  trashcan,
  umbrella,
  wine,
}

export default icons
