import type { BioBlock, UserProfile } from '@/types/bio'

export interface SiteMeta {
  title: string
  description: string
}

export interface GithubUiCopy {
  appName: string
  loginPrefix: string
  reposLabel: string
  followersLabel: string
  followingLabel: string
  starredLabel: string
  streakLabel: string
  streakSuffix: string
  contributionsSuffix: string
  bioQuoteOpen: string
  bioQuoteClose: string
  less: string
  more: string
}

export interface GraphUiCopy {
  dayLabels: string[]
  months: string[]
  cellTitle: string
}

export interface SiteUiCopy {
  online: string
  titleDeco: string
  github: GithubUiCopy
  graph: GraphUiCopy
}

export interface SiteContent {
  meta: SiteMeta
  ui: SiteUiCopy
  profile: UserProfile
  blocks: BioBlock[]
}
