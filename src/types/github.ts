export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionWeek {
  days: ContributionDay[]
}

export interface GithubContributions {
  name: string
  bio: string
  followers: number
  repos: number
  totalContributions: number
  href: string
  weeks: ContributionWeek[]
}
