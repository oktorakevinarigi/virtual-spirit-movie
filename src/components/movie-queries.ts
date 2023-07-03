import {
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query'

import { FetcherArgs, cleanQuery, FetchError, fetchBrowser, queryToString } from '@/utils'
import { MovieListResponse, MovieDetailResponse } from './movie-model'

type MovieQuery = {
  language: string
  page: string
  region: string
}
type MovieDetailQuery = {
  movie_id: string
  append_to_response: string
  language: string
}
export const MoviePlayingKeys = {
  all: ['MOVIE_PLAYING'],
  lists: () => [...MoviePlayingKeys.all, 'LISTS'],
  list: (query: MovieQuery) => [...MoviePlayingKeys.lists(), cleanQuery(query)],
}
export const MoviePopularKeys = {
  all: ['MOVIE_POPULAR'],
  lists: () => [...MoviePopularKeys.all, 'LISTS'],
  list: (query: MovieQuery) => [...MoviePopularKeys.lists(), cleanQuery(query)],
}
export const MovieTopRatedKeys = {
  all: ['MOVIE_TOP_RATED'],
  lists: () => [...MovieTopRatedKeys.all, 'LISTS'],
  list: (query: MovieQuery) => [...MovieTopRatedKeys.lists(), cleanQuery(query)],
}
export const MovieUpcomingKeys = {
  all: ['MOVIE_UPCOMING'],
  lists: () => [...MovieUpcomingKeys.all, 'LISTS'],
  list: (query: MovieQuery) => [...MovieUpcomingKeys.lists(), cleanQuery(query)],
}
export const MovieKeys = {
  all: ['MOVIE'],
  lists: () => [...MovieKeys.all, 'LISTS'],
  list: (query: MovieQuery) => [...MovieKeys.lists(), cleanQuery(query)],
  details: () => [...MovieKeys.all, 'DETAIL'],
  detail: (query: MovieDetailQuery) => [...MovieKeys.details(), cleanQuery(query)],

}

export const getMoviePlaying = async ({ fetch, query }: FetcherArgs<MovieQuery>) => {
  const data = await fetch.get<MovieListResponse>(`https://api.themoviedb.org/3/movie/now_playing${queryToString(query)}`)
  return data
}
export type MoviePlayingCache = Awaited<ReturnType<typeof getMoviePlaying>>
export function useGetMoviePlaying<TData = MoviePlayingCache>(
  query: MovieQuery,
  options?: UseQueryOptions<MoviePlayingCache, FetchError, TData>
) {
  return useQuery<MoviePlayingCache, FetchError, TData>(
    MoviePlayingKeys.list(query),
    () => {
      const fetch = fetchBrowser()
      return getMoviePlaying({ fetch, query })
    },
    options
  )
}


export const getMoviePopular = async ({ fetch, query }: FetcherArgs<MovieQuery>) => {
  const data = await fetch.get<MovieListResponse>(`https://api.themoviedb.org/3/movie/popular${queryToString(query)}`)
  return data
}
export type MoviePopularCache = Awaited<ReturnType<typeof getMoviePopular>>
export function useGetMoviePopular<TData = MoviePopularCache>(
  query: MovieQuery,
  options?: UseQueryOptions<MoviePopularCache, FetchError, TData>
) {
  return useQuery<MoviePopularCache, FetchError, TData>(
    MoviePopularKeys.list(query),
    () => {
      const fetch = fetchBrowser()
      return getMoviePopular({ fetch, query })
    },
    options
  )
}

export const getMovieTopRated = async ({ fetch, query }: FetcherArgs<MovieQuery>) => {
  const data = await fetch.get<MovieListResponse>(`https://api.themoviedb.org/3/movie/top_rated${queryToString(query)}`)
  return data
}
export type MovieTopRatedCache = Awaited<ReturnType<typeof getMovieTopRated>>
export function useGetMovieTopRated<TData = MovieTopRatedCache>(
  query: MovieQuery,
  options?: UseQueryOptions<MovieTopRatedCache, FetchError, TData>
) {
  return useQuery<MovieTopRatedCache, FetchError, TData>(
    MovieTopRatedKeys.list(query),
    () => {
      const fetch = fetchBrowser()
      return getMovieTopRated({ fetch, query })
    },
    options
  )
}

export const getMovieUpcoming = async ({ fetch, query }: FetcherArgs<MovieQuery>) => {
  const data = await fetch.get<MovieListResponse>(`https://api.themoviedb.org/3/movie/upcoming${queryToString(query)}`)
  return data
}
export type MovieUpcomingCache = Awaited<ReturnType<typeof getMovieUpcoming>>
export function useGetMovieUpcoming<TData = MovieUpcomingCache>(
  query: MovieQuery,
  options?: UseQueryOptions<MovieUpcomingCache, FetchError, TData>
) {
  return useQuery<MovieUpcomingCache, FetchError, TData>(
    MovieUpcomingKeys.list(query),
    () => {
      const fetch = fetchBrowser()
      return getMovieUpcoming({ fetch, query })
    },
    options
  )
}

export const getMovieDetail = async ({ fetch, query }: FetcherArgs<MovieDetailQuery>) => {
  const {movie_id, ...rest} = query
  const data = await fetch.get<MovieDetailResponse>(`https://api.themoviedb.org/3/movie/${movie_id}${queryToString(rest)}`)
  return data
}
export type MovieDetailCache = Awaited<ReturnType<typeof getMovieDetail>>
export function useGetMovieDetail<TData = MovieDetailCache>(
  query: MovieDetailQuery,
  options?: UseQueryOptions<MovieDetailCache, FetchError, TData>
) {
  return useQuery<MovieDetailCache, FetchError, TData>(
    MovieKeys.detail(query),
    () => {
      const fetch = fetchBrowser()
      return getMovieDetail({ fetch, query })
    },
    options
  )
}
