import CoookieBrowser from 'js-cookie'
import CoookieNode from 'cookie'
import {Query} from './react-query'

type options = {
  config?: RequestInit
  typeRequest?: 'json' | 'formData'
  responseType?: 'json' | 'binary' | 'blob'
  blobConfig?: any
  fileName?: string
  tokenName?: string
}

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

function OptionsDefault(options: options | undefined) {
  return {
    typeRequest: options?.typeRequest ?? 'json',
    responseType: options?.responseType ?? 'json',
    fileName: options?.fileName ?? '',
    tokenName: options?.tokenName ?? 'token',
    blobConfig: options?.blobConfig ?? { type: 'application/pdf' },
  }
}

export function getErrorMessage(error: any) {
  let errorMessage = ''
  let errorStatus = null
  if (error) {
    errorStatus = error.statusCode
    errorMessage = error.message
  } else {
    errorMessage = 'Error'
  }
  return {
    message: errorMessage,
    status: errorStatus,
  }
}

export async function handleResponse(res: Response, options?: options) {
  function ResultResponese(result: any, callback: () => void) {
    if (!res.ok) {
      if (res.status === 404) {
        throw { statusCode: 404, message: result.message, ...result }
      } else {
        throw result
          ? { statusCode: res.status, ...result }
          : { statusCode: res.status, message: 'Network response was not ok' }
      }
    } else {
      return callback()
    }
  }

  if (options && options.responseType === 'json') {
    const result = await res.json()
    return ResultResponese(result, () => {
      // if (result.status !== 'success') {
      //   throw { statusCode: result.status, ...result }
      // } else {
      return result
      // }
    })
  } else if (options && options.responseType === 'blob') {
    const result = await res.blob()
    return ResultResponese(result, () => {
      const createBlob = new Blob([result], options.blobConfig)
      const createUrl = URL.createObjectURL(createBlob)
      return createUrl
    })
  }
}

export function fetchBrowser() {
  const cookies = CoookieBrowser.get()

  async function get<TResponse>(url: string, options?: options) {
    return await fetch(url, {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDU3MDFlNGFhZDliNzRiMmY2Zjk0MTk2OWQxNTYzZCIsInN1YiI6IjY0YTIzYmY2ZDQwMGYzMDBlYmZlNjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.onf64C683ZIDbi4R8EW1PafgzW8_pBFUePoDJ5uaa6c`,
      },
      ...(options && options.config && { ...options.config }),
    })
      .then(data => handleResponse(data, OptionsDefault(options)))
      .then(data => data as TResponse)
      .catch(e => Promise.reject(getErrorMessage(e)))
  }

  async function post<TResponse>(url: string, body: any = null, options?: options) {
    return await fetch(url, {
      method: 'POST',
      ...(body && {
        body: OptionsDefault(options).typeRequest === 'json' ? JSON.stringify(body) : body,
      }),
      headers: {
        ...(OptionsDefault(options).typeRequest === 'json' && DEFAULT_HEADERS),
        authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDU3MDFlNGFhZDliNzRiMmY2Zjk0MTk2OWQxNTYzZCIsInN1YiI6IjY0YTIzYmY2ZDQwMGYzMDBlYmZlNjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.onf64C683ZIDbi4R8EW1PafgzW8_pBFUePoDJ5uaa6c`,
      },
      ...(options && options.config && { ...options.config }),
    })
      .then(data => handleResponse(data, OptionsDefault(options)))
      .then(data => data as TResponse)
      .catch(e => Promise.reject(getErrorMessage(e)))
  }

  async function put<TResponse>(url: string, body: any = null, options?: options) {
    return await fetch(url, {
      method: 'PUT',
      ...(body && {
        body: OptionsDefault(options).typeRequest === 'json' ? JSON.stringify(body) : body,
      }),
      headers: {
        ...(OptionsDefault(options).typeRequest === 'json' && DEFAULT_HEADERS),
        authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDU3MDFlNGFhZDliNzRiMmY2Zjk0MTk2OWQxNTYzZCIsInN1YiI6IjY0YTIzYmY2ZDQwMGYzMDBlYmZlNjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.onf64C683ZIDbi4R8EW1PafgzW8_pBFUePoDJ5uaa6c`,
      },
      ...(options && options.config && { ...options.config }),
    })
      .then(data => handleResponse(data, OptionsDefault(options)))
      .then(data => data as TResponse)
      .catch(e => Promise.reject(getErrorMessage(e)))
  }

  async function _delete<TResponse>(url: string, body: any = null, options?: options) {
    return await fetch(url, {
      method: 'DELETE',
      ...(body && {
        body: OptionsDefault(options).typeRequest === 'json' ? JSON.stringify(body) : body,
      }),
      headers: {
        ...(OptionsDefault(options).typeRequest === 'json' && DEFAULT_HEADERS),
        authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDU3MDFlNGFhZDliNzRiMmY2Zjk0MTk2OWQxNTYzZCIsInN1YiI6IjY0YTIzYmY2ZDQwMGYzMDBlYmZlNjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.onf64C683ZIDbi4R8EW1PafgzW8_pBFUePoDJ5uaa6c`,
      },
      ...(options && options.config && { ...options.config }),
    })
      .then(data => handleResponse(data, OptionsDefault(options)))
      .then(data => data as TResponse)
      .catch(e => Promise.reject(getErrorMessage(e)))
  }

  return {
    get,
    post,
    put,
    delete: _delete,
  }
}

export function fetchNode(arg?: { cookie?: string; isMobile?: boolean }) {
  const { cookie = '' } = arg ?? {}
  const cookies = CoookieNode.parse(cookie)

  async function get<TResponse>(url: string, options?: options) {
    return await fetch(url, {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDU3MDFlNGFhZDliNzRiMmY2Zjk0MTk2OWQxNTYzZCIsInN1YiI6IjY0YTIzYmY2ZDQwMGYzMDBlYmZlNjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.onf64C683ZIDbi4R8EW1PafgzW8_pBFUePoDJ5uaa6c`,
      },
      ...(options && options.config && { ...options.config }),
    })
      .then(data => handleResponse(data, OptionsDefault(options)))
      .then(data => data as TResponse)
      .catch(e => Promise.reject(getErrorMessage(e)))
  }

  async function post<TResponse>(url: string, body: any = null, options?: options) {
    return await fetch(url, {
      method: 'POST',
      ...(body && {
        body: OptionsDefault(options).typeRequest === 'json' ? JSON.stringify(body) : body,
      }),
      headers: {
        ...(OptionsDefault(options).typeRequest === 'json' && DEFAULT_HEADERS),
        authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDU3MDFlNGFhZDliNzRiMmY2Zjk0MTk2OWQxNTYzZCIsInN1YiI6IjY0YTIzYmY2ZDQwMGYzMDBlYmZlNjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.onf64C683ZIDbi4R8EW1PafgzW8_pBFUePoDJ5uaa6c`,
      },
      ...(options && options.config && { ...options.config }),
    })
      .then(data => handleResponse(data, OptionsDefault(options)))
      .then(data => data as TResponse)
      .catch(e => Promise.reject(getErrorMessage(e)))
  }

  async function put<TResponse>(url: string, body: any = null, options?: options) {
    return await fetch(url, {
      method: 'PUT',
      ...(body && {
        body: OptionsDefault(options).typeRequest === 'json' ? JSON.stringify(body) : body,
      }),
      headers: {
        ...(OptionsDefault(options).typeRequest === 'json' && DEFAULT_HEADERS),
        authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDU3MDFlNGFhZDliNzRiMmY2Zjk0MTk2OWQxNTYzZCIsInN1YiI6IjY0YTIzYmY2ZDQwMGYzMDBlYmZlNjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.onf64C683ZIDbi4R8EW1PafgzW8_pBFUePoDJ5uaa6c`,
      },
      ...(options && options.config && { ...options.config }),
    })
      .then(data => handleResponse(data, OptionsDefault(options)))
      .then(data => data as TResponse)
      .catch(e => Promise.reject(getErrorMessage(e)))
  }

  async function _delete<TResponse>(url: string, body: any = null, options?: options) {
    return await fetch(url, {
      method: 'DELETE',
      ...(body && {
        body: OptionsDefault(options).typeRequest === 'json' ? JSON.stringify(body) : body,
      }),
      headers: {
        ...(OptionsDefault(options).typeRequest === 'json' && DEFAULT_HEADERS),
        authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDU3MDFlNGFhZDliNzRiMmY2Zjk0MTk2OWQxNTYzZCIsInN1YiI6IjY0YTIzYmY2ZDQwMGYzMDBlYmZlNjIxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.onf64C683ZIDbi4R8EW1PafgzW8_pBFUePoDJ5uaa6c`,
      },
      ...(options && options.config && { ...options.config }),
    })
      .then(data => handleResponse(data, OptionsDefault(options)))
      .then(data => data as TResponse)
      .catch(e => Promise.reject(getErrorMessage(e)))
  }

  return {
    get,
    post,
    put,
    delete: _delete,
  }
}

export type Fetch = ReturnType<typeof fetchBrowser>
export type FetchError = ReturnType<typeof getErrorMessage>

export interface FetcherArgs<LocalQuery extends Query = Query> {
  fetch: Fetch
  query: LocalQuery
}

export interface OptionalFetcherArgs<LocalQuery extends Query = Query> {
  fetch: Fetch
  query?: LocalQuery
}
