import { useReducer, useRef } from 'react'

const BASE_URL: string = 'https://2904084071.eicp.vip/qy/api/v1/os/'

interface State<T> {
  fetchData?: () => Promise<void>
  data?: T
  error?: Error
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

function useFetch<T extends { code: number; message: string }>(
  url: string,
  options?: RequestInit
): State<T> {
  const cache = useRef<Cache<T>>({})

  // Used to prevent state update if the component is unmounted

  const initialState: State<T> = {
    error: undefined,
    data: undefined
  }

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState }
      case 'fetched':
        return { ...initialState, data: action.payload }
      case 'error':
        return { ...initialState, error: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  const fetchData = async () => {
    dispatch({ type: 'loading' })

    // If a cache exists for this url, return it
    if (cache.current[url]) {
      dispatch({ type: 'fetched', payload: cache.current[url] })
      return
    }

    try {
      const response = await fetch(BASE_URL + url, options)
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = (await response.json()) as T

      if (data.code !== 200) throw new Error(data.message)

      cache.current[url] = data

      dispatch({ type: 'fetched', payload: data })
    } catch (error: any) {
      dispatch({ type: 'error', payload: error as Error })
    }
  }

  return { ...state, fetchData }
}

export default useFetch
