export const customQueryMatcher = /(.*?\/global\/custom-query\/type1)(.*)/

export function decodeCustomQueryParameters(url: string): string {
  const matched = url.match(customQueryMatcher)
  if (!matched) {
    return url;
  }
  const path = matched[1]
  const encodedParameters = matched[2]
  const newUrl = `${path}${decodeURIComponent(encodedParameters)}`
  return newUrl
}