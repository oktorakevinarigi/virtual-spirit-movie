import { QueryClient, dehydrate } from '@tanstack/react-query'
import type { GetServerSidePropsContext } from 'next'

import { fetchNode, nullify } from '@/utils'
import { Card, Header } from '../components'
import {
  MoviePlayingKeys,
  useGetMoviePlaying,
  getMoviePlaying,
  MoviePopularKeys,
  useGetMoviePopular,
  getMoviePopular,
  MovieTopRatedKeys,
  useGetMovieTopRated,
  getMovieTopRated,
  MovieUpcomingKeys,
  useGetMovieUpcoming,
  getMovieUpcoming
} from '@/components/movie-queries'

export default function Home() {
  const query = { language: 'en-US', page: '1', region: '' }
  const getMoviePlaying = useGetMoviePlaying(query)
  const getMoviePopular = useGetMoviePopular(query)
  const getMovieTopRated = useGetMovieTopRated(query)
  const getMovieUpcoming = useGetMovieUpcoming(query)
  return (
    <div>
      <Header />

      <main className='container mx-auto mt-10 px-5 sm:px-0'>
        <div className='text-base font-medium my-5'>Now Playing</div>
        <div className='flex flex-wrap gap-4 justify-center sm:justify-start'>
          {getMoviePlaying.data?.results.slice(0, 12).map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>

        <div className='text-base font-medium my-5'>Now Popular</div>
        <div className='flex flex-wrap gap-4 justify-center sm:justify-start'>
          {getMoviePopular.data?.results.slice(0, 12).map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>

        <div className='text-base font-medium my-5'>Top Rated</div>
        <div className='flex flex-wrap gap-4 justify-center sm:justify-start'>
          {getMovieTopRated.data?.results.slice(0, 12).map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>

        <div className='text-base font-medium my-5'>Upcoming</div>
        <div className='flex flex-wrap gap-4 justify-center sm:justify-start'>
          {getMovieUpcoming.data?.results.slice(0, 12).map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async ({ req, params }: GetServerSidePropsContext) => {
  const queryClient = new QueryClient()
  const fetch = fetchNode()

  try {
    const query = { language: 'en-US', page: '1', region: '' }

    await Promise.all([
      queryClient.prefetchQuery(MoviePlayingKeys.list(query), () =>
        getMoviePlaying({ fetch, query })
      ),
      queryClient.prefetchQuery(MoviePopularKeys.list(query), () =>
        getMoviePopular({ fetch, query })
      ),
      queryClient.prefetchQuery(MovieTopRatedKeys.list(query), () =>
        getMovieTopRated({ fetch, query })
      ),
      queryClient.prefetchQuery(MovieUpcomingKeys.list(query), () => getMovieUpcoming({ fetch, query })),
    ])
  } catch (error) {
    /* empty */
  }

  return {
    props: {
      id: params && params.id ? `${params.id}` : '',
      dehydratedState: nullify(dehydrate(queryClient)),
    },
  }
}