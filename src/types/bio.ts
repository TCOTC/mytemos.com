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

export type BioBlock =
  | (BioBlockBase & { type: 'title'; content: { text: string } })
  | (BioBlockBase & { type: 'website'; content: Record<string, unknown> })
  | (BioBlockBase & { type: 'website-image'; content: Record<string, unknown> })
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
