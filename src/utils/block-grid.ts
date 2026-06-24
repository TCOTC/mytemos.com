import {
  BLOCK_GRID_COLUMNS,
  BLOCK_GRID_COLUMNS_MOBILE,
  BLOCK_GRID_ROW_HEIGHT,
} from '@/constants/block-grid'
import type { Block, BlockLayout, BlockTheme } from '@/types/block'

type RowTrackKind = 'auto' | 'title-section' | 'cell' | 'standard'

function resolveLayout(block: Block, mobile: boolean): BlockLayout {
  if (mobile && block.layoutMobile) return block.layoutMobile
  return block.layout
}

function isSquareWebsiteBlock(block: Block, mobile: boolean): boolean {
  if (block.type !== 'website') return false
  const layout = resolveLayout(block, mobile)
  return layout.w <= 2 && layout.h === 2
}

function getRowTrackKind(block: Block, mobile: boolean): RowTrackKind {
  if (block.type === 'title') return block.sectionGap ? 'title-section' : 'auto'
  if (isSquareWebsiteBlock(block, mobile)) return 'cell'
  return 'standard'
}

function rowTrackSize(kind: RowTrackKind, standardPx: number): string {
  if (kind === 'auto') return 'var(--block-grid-title-row-height)'
  if (kind === 'title-section') return 'var(--block-grid-title-section-row-height)'
  if (kind === 'cell') return 'var(--block-grid-cell)'
  return `${standardPx}px`
}

export function gridColumnStyle(layout: BlockLayout, columns: number): string {
  if (layout.w >= columns) return '1 / -1'
  return `${layout.x + 1} / span ${layout.w}`
}

export function gridRowStyle(layout: BlockLayout): string {
  return `${layout.y + 1} / span ${layout.h}`
}

export function buildGridRowTemplate(blocks: Block[], mobile: boolean): string {
  const maxRow = Math.max(...blocks.map((block) => resolveLayout(block, mobile).y + resolveLayout(block, mobile).h))
  const tracks: string[] = []

  for (let y = 0; y < maxRow; y++) {
    const starter = blocks.find((block) => resolveLayout(block, mobile).y === y)
    const spanBlock =
      starter ??
      blocks.find((block) => {
        const layout = resolveLayout(block, mobile)
        return layout.y < y && layout.y + layout.h > y
      })

    const kind = spanBlock ? getRowTrackKind(spanBlock, mobile) : 'standard'
    tracks.push(rowTrackSize(kind, BLOCK_GRID_ROW_HEIGHT))
  }

  return tracks.join(' ')
}

export function blockPlacementStyle(block: Block): Record<string, string> {
  const mobileLayout = block.layoutMobile ?? block.layout

  return {
    '--block-grid-col': gridColumnStyle(block.layout, BLOCK_GRID_COLUMNS),
    '--block-grid-row': gridRowStyle(block.layout),
    '--block-grid-col-mobile': gridColumnStyle(mobileLayout, BLOCK_GRID_COLUMNS_MOBILE),
    '--block-grid-row-mobile': gridRowStyle(mobileLayout),
  }
}

export function blockThemeStyle(theme?: BlockTheme): Record<string, string> {
  if (!theme) return {}

  const style: Record<string, string> = {}

  if (theme.cardBg) style['--card-bg'] = theme.cardBg
  if (theme.cardAccent) style['--card-accent'] = theme.cardAccent
  if (theme.cardShadow) style['--card-shadow'] = theme.cardShadow
  if (theme.cardDeco) style['--card-deco'] = `'${theme.cardDeco}'`
  if (theme.cardTilt) style['--card-tilt'] = theme.cardTilt
  if (theme.titleAccent) style['--title-accent'] = theme.titleAccent

  return style
}

export function gridContainerStyle(blocks: Block[]): Record<string, string> {
  return {
    '--block-grid-rows': buildGridRowTemplate(blocks, false),
    '--block-grid-rows-mobile': buildGridRowTemplate(blocks, true),
    '--block-grid-columns': String(BLOCK_GRID_COLUMNS),
    '--block-grid-columns-mobile': String(BLOCK_GRID_COLUMNS_MOBILE),
  }
}
