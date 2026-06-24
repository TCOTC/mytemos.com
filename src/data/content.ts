import type { Block, SpaceProfile } from '@/types/block'
import type { SiteContent } from '@/types/content'
import { resolveImage } from '@/data/assets'
import raw from './content.json'

const siteContent = applyImages(raw as SiteContent)

export const ui = siteContent.ui

export const spaceProfile: SpaceProfile = {
  user: siteContent.profile,
  blocks: siteContent.blocks,
}

function applyBlockImages(block: Block): Block {
  if (block.type === 'github' || block.type === 'title') return block

  if (block.type === 'website') {
    return {
      ...block,
      content: {
        ...block.content,
        favicon: resolveImage(block.content.favicon),
      },
    }
  }

  return {
    ...block,
    content: {
      ...block.content,
      favicon: resolveImage(block.content.favicon),
      image: resolveImage(block.content.image),
    },
  }
}

function applyImages(data: SiteContent): SiteContent {
  return {
    ...data,
    profile: {
      ...data.profile,
      avatar: resolveImage(data.profile.avatar),
    },
    blocks: data.blocks.map(applyBlockImages),
  }
}
