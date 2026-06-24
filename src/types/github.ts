export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionWeek {
  days: ContributionDay[]
}

export interface GithubContributions {
  login: string
  bio: string
  followers: number
  following: number
  repos: number
  starred: number
  currentStreak: number
  totalContributions: number
  href: string
  weeks: ContributionWeek[]
}
