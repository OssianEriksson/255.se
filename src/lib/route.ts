export function buildUrl<T extends object>(routeId: string, params: T) {
  let url = routeId
    .replaceAll(/\(.+?\)/g, '')
    .replaceAll(/\[\[(.+?)\]\]/g, '[$1]')
    .replaceAll(/\[(.+?)(=.+?)\]/g, '[$1]')

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value !== 'undefined') {
      url = url.replaceAll(`[${key}]`, `${value}`)
    }
  })

  url = url
    .replaceAll(/\[(.+?)\]/g, '')
    .replaceAll(/\/\//g, '/')
    .replace(/\/$/, '')

  return url
}
