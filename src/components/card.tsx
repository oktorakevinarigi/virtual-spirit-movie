import Image from 'next/image'
import Link from 'next/link'

import { ULR_IMAGE } from '@/constants'

type CardProps = {
  poster_path: string
  vote_average: number
  title: string
  release_date: string
  id: number
}

export function Card(props: CardProps) {
  return (
    <Link href={`/movie/${props.id}`} className='relative cursor-pointer'>
      <Image
        width={195}
        height={287}
        src={`${ULR_IMAGE}/${props.poster_path}`}
        alt={props.title}
        className='rounded-2xl'
        style={{ objectFit: 'cover', height: '287px', width: '195px' }}
        priority
      />

      <div className='absolute top-3 left-3 flex items-center gap-1'>
        <div>
          <Image
            width={15}
            height={15}
            src={'/images/star.png'}
            alt='sd'
          />
        </div>
        <div className='text-white'>{props.vote_average}</div>
      </div>

      <div className='opacity-0 hover:opacity-100 rounded-2xl hover:bg-black/60 absolute left-0 top-0 right-0 bottom-0 z-10 transition-all p-5 flex flex-col justify-between'>
        <div className='text-white'>{props.title}</div>
        <div className='text-white'>{props.release_date}</div>
      </div>
    </Link>
  )
}
