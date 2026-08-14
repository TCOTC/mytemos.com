import { proxyBazaarStats } from '../_bazaar-stats-proxy.js'

export function onRequest(context) {
  const rest = context.params.path
  const path = Array.isArray(rest) ? rest.join('/') : (rest ?? '')
  return proxyBazaarStats(context.request, path)
}
