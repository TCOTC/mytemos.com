export type BlockType = 'title' | 'website' | 'website-image' | 'github'

export interface BlockLayout {
  x: number
  y: number
  w: number
  h: number
}

export interface BlockTheme {
  cardBg?: string
  cardAccent?: string
  cardShadow?: string
  cardDeco?: string
  cardTilt?: string
  titleAccent?: string
}

interface BioBlockBase {
  id: string
  layout: BlockLayout
  layoutMobile?: BlockLayout
  theme?: BlockTheme
  /** 标题块：与上一组卡片之间增加分段间距 */
  sectionGap?: boolean
}

export interface WebsiteContent {
  title: string
  url: string
  href?: string
  favicon: string
}

export interface WebsiteImageContent extends WebsiteContent {
  image: string
}

export type BioBlock =
  | (BioBlockBase & { type: 'title'; content: { text: string } })
  | (BioBlockBase & { type: 'website'; content: WebsiteContent })
  | (BioBlockBase & { type: 'website-image'; content: WebsiteImageContent })
  | (BioBlockBase & { type: 'github' })

export interface UserProfile {
  nickname: string
  description: string
  avatar: string
}

export interface SpaceProfile {
  user: UserProfile
  blocks: BioBlock[]
}
