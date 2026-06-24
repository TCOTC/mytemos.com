import { spawnSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT = join(__dirname, '../src/data/github-contributions.json')

const USERNAME = process.env.GITHUB_USERNAME ?? 'TCOTC'
const TOKEN = process.env.GITHUB_TOKEN

// 与 src/constants/github.ts GITHUB_VISIBLE_WEEKS 保持一致
const VISIBLE_WEEKS = 22

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const QUERY =
  'query ($login: String!) { user(login: $login) { login bio followers { totalCount } following { totalCount } starredRepositories { totalCount } repositories(ownerAffiliations: OWNER) { totalCount } contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }'

function mapWeeks(weeks) {
  return weeks.map((week) => ({
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVEL_MAP[day.contributionLevel] ?? 0,
    })),
  }))
}

function prevCalendarDay(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`)
  date.setDate(date.getDate() - 1)
  return date.toISOString().slice(0, 10)
}

function computeCurrentStreak(weeks) {
  const counts = new Map()

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      counts.set(day.date, day.contributionCount)
    }
  }

  if (!counts.size) return 0

  const today = new Date().toISOString().slice(0, 10)
  let cursor = today

  if ((counts.get(today) ?? 0) === 0) {
    cursor = prevCalendarDay(today)
  }

  let streak = 0
  while ((counts.get(cursor) ?? 0) > 0) {
    streak++
    cursor = prevCalendarDay(cursor)
  }

  return streak
}

function buildContributions(user) {
  if (!user) {
    throw new Error(`GitHub 用户不存在: ${USERNAME}`)
  }

  const calendar = user.contributionsCollection.contributionCalendar
  const allWeeks = mapWeeks(calendar.weeks)
  const weeks = allWeeks.slice(-VISIBLE_WEEKS)

  return {
    login: user.login,
    bio: user.bio ?? '',
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    repos: user.repositories.totalCount,
    starred: user.starredRepositories.totalCount,
    currentStreak: computeCurrentStreak(calendar.weeks),
    totalContributions: calendar.totalContributions,
    href: `https://github.com/${user.login}`,
    weeks,
  }
}

function parsePayload(payload) {
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((e) => e.message).join('; '))
  }

  return buildContributions(payload.data?.user)
}

async function fetchViaHttp() {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github+json',
    'User-Agent': 'mytemos.com-fetch-script',
  }

  if (TOKEN) {
    headers.Authorization = `Bearer ${TOKEN}`
  }

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: QUERY,
      variables: { login: USERNAME },
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`)
  }

  return parsePayload(await response.json())
}

function isGhAvailable() {
  const result = spawnSync('gh', ['--version'], { encoding: 'utf8' })
  return result.status === 0
}

function fetchViaGhCli() {
  if (!isGhAvailable()) {
    throw new Error('未安装 gh cli')
  }

  const result = spawnSync(
    'gh',
    ['api', 'graphql', '-f', `query=${QUERY}`, '-f', `login=${USERNAME}`],
    { encoding: 'utf8' },
  )

  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || '').trim()
    throw new Error(detail || 'gh api graphql 失败')
  }

  let payload
  try {
    payload = JSON.parse(result.stdout)
  } catch {
    throw new Error('gh api graphql 返回了无效 JSON')
  }

  return parsePayload(payload)
}

async function fetchGithubContributions() {
  let httpError

  try {
    return await fetchViaHttp()
  } catch (error) {
    httpError = error
    console.warn(`GitHub API 请求失败，尝试 gh cli… (${httpError.message})`)
  }

  try {
    return fetchViaGhCli()
  } catch (ghError) {
    throw new Error(`GitHub API: ${httpError.message}\ngh cli: ${ghError.message}`)
  }
}

const data = await fetchGithubContributions()
writeFileSync(OUTPUT, `${JSON.stringify(data)}\n`, 'utf8')
console.log(
  `已写入 ${OUTPUT} — @${data.login}: ${data.totalContributions} contributions, streak ${data.currentStreak}, ${data.weeks.length} weeks`,
)
