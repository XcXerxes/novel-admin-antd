import * as queryString from 'query-string'

function getRootUrl ():string {
  const dev = process.env.NODE_ENV !== 'production'
  const rootUrl = dev ? '' : ''
  return rootUrl
}

export default async function sendRequest(path: string, opts: any={}) {
  const ohterHeaderOpts = { 'Content-type': 'application/json; charset=UTF-8' }
  const headers = {
    ...opts.headers,
    ...ohterHeaderOpts
  }

  // 请求的参数
  const qs = (opts.qs && queryString.stringify(opts.qs)) || ''

  const response = await fetch(
    `${getRootUrl()}${path}${qs}`,
    {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      ...opts,
      headers
    }
  )

  const text = await response.text()
  if (response.status >= 400) {
    console.error(text)
    throw new Error(response.statusText)
  }
  try {
    const data = JSON.parse(text)
    if(data.error) {
      throw new Error(data.error)
    }
    return data
  } catch (error) {
    if (error instanceof SyntaxError) {
      return text
    }
    throw error
  }
}
