import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { WebsiteContent } from '@/types/block'

export function useWebsiteLink(content: MaybeRefOrGetter<WebsiteContent>) {
  const href = computed(() => {
    const { url, href: customHref } = toValue(content)
    return String(customHref ?? `https://${url}`)
  })

  const isGitHub = computed(() => {
    const { url } = toValue(content)
    try {
      return new URL(href.value).hostname === 'github.com'
    } catch {
      return String(url) === 'github.com'
    }
  })

  return { href, isGitHub }
}
