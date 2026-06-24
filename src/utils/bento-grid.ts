import {
  BENTO_CELL_DESKTOP,
  BENTO_CELL_MOBILE,
  BENTO_GRID_COLUMNS,
  BENTO_GRID_COLUMNS_MOBILE,
  BENTO_GRID_ROW_HEIGHT,
} from '@/constants/bento'
import type { BioBlock, BlockLayout, BlockTheme } from '@/types/bio'

type RowTrackKind = 'auto' | 'cell' | 'standard'

function resolveLayout(block: BioBlock, mobile: boolean): BlockLayout {
  if (mobile && block.layoutMobile) return block.layoutMobile
  return block.layout
}

function getRowTrackKind(block: BioBlock, mobile: boolean): RowTrackKind {
  if (block.type === 'title') {
    const layout = resolveLayout(block, mobile)
    return !mobile || layout.y === 0 ? 'auto' : 'cell'
  }

  if (!mobile && block.type === 'website' && block.layout.w <= 2 && block.layout.h === 2) {
    return 'cell'
  }

  return mobile ? 'cell' : 'standard'
}

function rowTrackSize(kind: RowTrackKind, cellPx: number, standardPx: number): string {
  if (kind === 'auto') return 'auto'
  if (kind === 'cell') return `${cellPx}px`
  return `${standardPx}px`
}

export function gridColumnStyle(layout: BlockLayout, columns: number): string {
  if (layout.w >= columns) return '1 / -1'
  return `${layout.x + 1} / span ${layout.w}`
}

export function gridRowStyle(layout: BlockLayout): string {
  return `${layout.y + 1} / span ${layout.h}`
}

export function buildGridRowTemplate(blocks: BioBlock[], mobile: boolean): string {
  const cellPx = mobile ? BENTO_CELL_MOBILE : BENTO_CELL_DESKTOP
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
    tracks.push(rowTrackSize(kind, cellPx, BENTO_GRID_ROW_HEIGHT))
  }

  return tracks.join(' ')
}

export function blockPlacementStyle(block: BioBlock): Record<string, string> {
  const mobileLayout = block.layoutMobile ?? block.layout

  return {
    '--grid-col': gridColumnStyle(block.layout, BENTO_GRID_COLUMNS),
    '--grid-row': gridRowStyle(block.layout),
    '--grid-col-mobile': gridColumnStyle(mobileLayout, BENTO_GRID_COLUMNS_MOBILE),
    '--grid-row-mobile': gridRowStyle(mobileLayout),
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

export function gridContainerStyle(blocks: BioBlock[]): Record<string, string> {
  return {
    '--bento-grid-rows': buildGridRowTemplate(blocks, false),
    '--bento-grid-rows-mobile': buildGridRowTemplate(blocks, true),
    '--bento-columns': String(BENTO_GRID_COLUMNS),
    '--bento-columns-mobile': String(BENTO_GRID_COLUMNS_MOBILE),
  }
}
