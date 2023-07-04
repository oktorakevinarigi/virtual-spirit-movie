
import { QueryClient, dehydrate } from '@tanstack/react-query'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'

import { ULR_IMAGE } from '@/constants'
import { fetchNode, nullify } from '@/utils'
import { useGetMovieDetail, MovieKeys, getMovieDetail } from '@/components/movie-queries'
import { Header } from '@/components'

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { id } = props
  const getMovieDetail = useGetMovieDetail({ movie_id: id, language: 'en-US', append_to_response: '' })
  return (
    <div>
      <Header />

      <main className='container mx-auto mt-10 px-5 sm:px-0'>
        <div className='flex flex-col gap-5'>
          <div className='text-4xl font-bold'>
            {getMovieDetail.data?.title}
          </div>

          <div className='flex'>
            <div className='flex gap-5 flex-col sm:flex-row items-center'>
              <Image
                width={195}
                height={287}
                src={`${ULR_IMAGE}/${getMovieDetail.data?.poster_path}`}
                alt={getMovieDetail.data?.title || ''}
                className='rounded-2xl'
                style={{ objectFit: 'cover', height: '100%' }}
                priority
              />
              <div className='flex flex-col justify-between w-full md:w-1/2'>
                <div>
                  <div className='flex gap-5 mb-2 flex-wrap'>
                    {getMovieDetail.data?.genres.map(item => (
                      <div key={item.id} className='border rounded-2xl border-black w-fit px-5'>{item.name}</div>
                    ))}
                  </div>
                  <div>
                    {getMovieDetail.data?.overview}
                  </div>
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <Image
                      width={15}
                      height={15}
                      src={'/images/star.png'}
                      alt='star'
                    />
                    <div>
                      <span className='font-bold'>{getMovieDetail.data?.vote_average}</span>/10
                    </div>
                  </div>
                  <div>Release Date: <span className='font-bold'>{getMovieDetail.data?.release_date}</span></div>
                </div>
              </div>
            </div>

            {getMovieDetail.data?.belongs_to_collection?.poster_path && (
              <div className='w-full hidden lg:block'>
                <Image
                  width={195}
                  height={287}
                  src={`${ULR_IMAGE}/${getMovieDetail.data?.belongs_to_collection.poster_path}`}
                  alt={getMovieDetail.data?.title || ''}
                  className='rounded-2xl'
                  style={{ objectFit: 'cover', height: '100%' }}
                />
              </div>
            )}
          </div>
        </div>

        <div className='font-bold mt-10 mb-5'>Production Companies</div>
        <div className='flex gap-3 flex-wrap'>
          {getMovieDetail.data?.production_companies.map(item => {
            if (item.logo_path) {
              return (
                <div key={item.id} className='flex flex-col items-center'>
                  <Image
                    width={100}
                    height={100}
                    src={`${ULR_IMAGE}/${item.logo_path}`}
                    alt={item.name || ''}
                    style={{ objectFit: 'contain', height: '100%' }}
                  />
                  <div className='text-center mt-2'>{item.name}</div>
                </div>
              )
            }
          })}
        </div>

      </main>
    </div>
  )
}

export const getServerSideProps = async ({ req, params }: GetServerSidePropsContext) => {
  const queryClient = new QueryClient()
  const fetch = fetchNode()

  if (params && params.id) {
    const queryDetail = { movie_id: params.id as string, language: 'en-US', append_to_response: '' }
    await queryClient.prefetchQuery(MovieKeys.detail(queryDetail), () =>
      getMovieDetail({ fetch, query: queryDetail })
    )
  }

  return {
    props: {
      id: params && params.id ? `${params.id}` : '',
      dehydratedState: nullify(dehydrate(queryClient)),
    },
  }
}
