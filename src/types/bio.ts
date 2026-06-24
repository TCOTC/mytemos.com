export type BlockType = 'title' | 'website' | 'website-image' | 'github'

export interface BlockLayout {
  x: number
  y: number
  w: number
  h: number
}

export interface BioBlock {
  id: string
  type: BlockType
  layout: BlockLayout
  content: Record<string, unknown>
}

export interface UserProfile {
  username: string
  nickname: string
  description: string
  avatar: string
}

export interface SpaceProfile {
  user: UserProfile
  blocks: BioBlock[]
}
