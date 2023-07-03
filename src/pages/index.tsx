import { Card } from '../components'
import { useGetMoviePlaying, useGetMoviePopular, useGetMovieTopRated, useGetMovieUpcoming } from '@/components/movie-queries'

export default function Home() {
  const query = { language: 'id', page: '1', region: 'id' }
  const getMoviePlaying = useGetMoviePlaying(query)
  const getMoviePopular = useGetMoviePopular(query)
  const getMovieTopRated = useGetMovieTopRated(query)
  const getMovieUpcoming = useGetMovieUpcoming(query)
  return (
    <div>
      <header className='flex container mx-auto'>
        <div className='w-10 text-xl font-normal'>The Movie Tracker</div>
        <div className='w-full flex justify-center items-center'>
          <input type='text' placeholder='Search a movie or a series' className='h-10 border rounded-full px-5 focus:border-blue-500 outline-none bg-[#D9D9D9] w-[630px] text-center' />
        </div>
      </header>

      <main className='container mx-auto mt-10'>
        <div className='text-base font-medium my-5'>Now Playing</div>
        <div className='flex flex-wrap gap-4'>
          {getMoviePlaying.data?.results.slice(0, 12).map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>

        <div className='text-base font-medium my-5'>Now Popular</div>
        <div className='flex flex-wrap gap-4'>
          {getMoviePopular.data?.results.slice(0, 12).map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>

        <div className='text-base font-medium my-5'>Top Rated</div>
        <div className='flex flex-wrap gap-4'>
          {getMovieTopRated.data?.results.slice(0, 12).map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>

        <div className='text-base font-medium my-5'>Upcoming</div>
        <div className='flex flex-wrap gap-4'>
          {getMovieUpcoming.data?.results.slice(0, 12).map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </main>
    </div>
  )
}
