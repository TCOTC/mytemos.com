import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT = join(__dirname, '../src/data/github-contributions.json')

const USERNAME = process.env.GITHUB_USERNAME ?? 'TCOTC'
const TOKEN = process.env.GITHUB_TOKEN

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      login
      name
      bio
      followers { totalCount }
      repositories(ownerAffiliations: OWNER) { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`

async function fetchGithubContributions() {
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
    throw new Error(`GitHub API HTTP ${response.status}: ${await response.text()}`)
  }

  const payload = await response.json()

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((e) => e.message).join('; '))
  }

  const user = payload.data?.user
  if (!user) {
    throw new Error(`GitHub 用户不存在: ${USERNAME}`)
  }

  const calendar = user.contributionsCollection.contributionCalendar

  return {
    login: user.login,
    name: user.name ?? user.login,
    bio: user.bio ?? '',
    followers: user.followers.totalCount,
    repos: user.repositories.totalCount,
    totalContributions: calendar.totalContributions,
    href: `https://github.com/${user.login}`,
    fetchedAt: new Date().toISOString(),
    weeks: calendar.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_MAP[day.contributionLevel] ?? 0,
      })),
    })),
  }
}

const data = await fetchGithubContributions()
writeFileSync(OUTPUT, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
console.log(
  `已更新 ${OUTPUT} — ${data.login}: ${data.totalContributions} contributions, ${data.weeks.length} weeks`,
)
