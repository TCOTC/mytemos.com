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

interface BlockBase {
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

export type Block =
  | (BlockBase & { type: 'title'; content: { text: string } })
  | (BlockBase & { type: 'website'; content: WebsiteContent })
  | (BlockBase & { type: 'website-image'; content: WebsiteImageContent })
  | (BlockBase & { type: 'github' })

export interface ProfileData {
  nickname: string
  description: string
  avatar: string
}

export interface SpaceProfile {
  user: ProfileData
  blocks: Block[]
}
