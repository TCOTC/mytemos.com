const LATIN_RE = /[\u0020-\u007E\u00A0-\u00FF]/

/**
 * @param {Set<string>} set
 * @param {string | undefined | null} text
 * @param {{ latinOnly?: boolean }} [options]
 */
function addText(set, text, options = {}) {
  if (!text) return
  for (const ch of text) {
    if (options.latinOnly && !LATIN_RE.test(ch)) continue
    set.add(ch)
  }
}

/**
 * @param {Record<string, unknown>} content
 * @param {Record<string, unknown> | null} github
 */
export function collectGlyphs(content, github) {
  const display = new Set()
  const body = new Set()
  const pixel = new Set()

  const { meta, ui, profile, blocks } = content

  // 按 DOM 原文收集；text-transform 不改变字符码位，不能用 toUpperCase()
  addText(display, meta.title, { latinOnly: true })
  addText(display, profile.nickname, { latinOnly: true })
  addText(display, ui.github.appName, { latinOnly: true })

  for (const block of blocks) {
    if (block.type === 'title') {
      addText(display, block.content.text, { latinOnly: true })
    }
    if (block.type === 'website' || block.type === 'website-image') {
      addText(body, block.content.title, { latinOnly: true })
      addText(pixel, block.content.url)
    }
  }

  addText(body, profile.description, { latinOnly: true })
  addText(body, ui.github.reposLabel, { latinOnly: true })
  addText(body, ui.github.followersLabel, { latinOnly: true })
  addText(body, ui.github.followingLabel, { latinOnly: true })
  addText(body, ui.github.starredLabel, { latinOnly: true })
  addText(body, ui.github.streakLabel, { latinOnly: true })
  addText(body, ui.github.streakSuffix, { latinOnly: true })
  addText(body, ui.github.bioQuoteOpen, { latinOnly: true })
  addText(body, ui.github.bioQuoteClose, { latinOnly: true })
  addText(body, /** @type {string | undefined} */ (github?.bio), { latinOnly: true })

  addText(pixel, ui.online)
  addText(pixel, ui.titleDeco)
  addText(pixel, ui.github.loginPrefix)
  addText(pixel, ui.github.contributionsSuffix)
  addText(pixel, ui.github.less)
  addText(pixel, ui.github.more)
  addText(pixel, ui.graph.cellTitle)

  for (const month of ui.graph.months) addText(pixel, month)
  for (const day of ui.graph.dayLabels) addText(pixel, day)

  addText(pixel, /** @type {string | undefined} */ (github?.login))
  addText(pixel, String(github?.totalContributions ?? ''))
  addText(pixel, String(github?.repos ?? ''))
  addText(pixel, String(github?.followers ?? ''))
  addText(pixel, String(github?.following ?? ''))
  addText(pixel, String(github?.starred ?? ''))
  addText(pixel, String(github?.currentStreak ?? ''))

  for (const week of /** @type {Array<{ days: Array<{ date: string; count: number }> }>} */ (
    github?.weeks ?? []
  )) {
    for (const day of week.days ?? []) {
      addText(pixel, day.date)
      addText(pixel, String(day.count))
    }
  }

  for (const ch of '0123456789') {
    body.add(ch)
    pixel.add(ch)
    display.add(ch)
  }

  for (const ch of ' .,:-()\'"/&') body.add(ch)
  for (const ch of ' ./:-') pixel.add(ch)

  return {
    display: [...display].sort().join(''),
    body: [...body].sort().join(''),
    pixel: [...pixel].sort().join(''),
  }
}
