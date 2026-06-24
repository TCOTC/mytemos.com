import type { BioBlock, SpaceProfile } from '@/types/bio'
import type { SiteContent } from '@/types/content'
import { resolveImage } from '@/data/assets'
import raw from './content.json'

export const content = applyImages(raw as SiteContent)

export const { meta, ui, profile, blocks } = content

export const spaceProfile: SpaceProfile = {
  user: profile,
  blocks,
}

function applyBlockImages(block: BioBlock): BioBlock {
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
