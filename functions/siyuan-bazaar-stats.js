import { proxyBazaarStats } from './_bazaar-stats-proxy.js'

export function onRequest(context) {
  return proxyBazaarStats(context.request, '')
}
