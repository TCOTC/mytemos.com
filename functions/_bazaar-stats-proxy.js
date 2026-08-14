const ORIGIN = 'https://siyuan-bazaar-stats.pages.dev'

export function proxyBazaarStats(request, rest) {
  const incoming = new URL(request.url)
  const suffix = rest ? `/${rest}` : '/'
  const target = new URL(`${ORIGIN}/siyuan-bazaar-stats${suffix}`)
  target.search = incoming.search

  const init = {
    method: request.method,
    headers: request.headers,
    redirect: 'manual',
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body
  }
  return fetch(target.toString(), init)
}
