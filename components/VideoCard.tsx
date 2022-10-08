import React, { useState, useEffect, useRef } from 'react';

import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';

import { Video } from '../types';

interface IProps {
    data: Video;
}

const VideoCard: NextPage<IProps> = ({ data}) => {

  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if(playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  }

  return (
    <div className="flex flex-col pb-6 border-b-2 border-gray-200">
      <div>
        <div className='flex gap-3 p-2 font-semibold rounded cursor-pointer'>
          <div className='w-10 h-10 md:w-16 md:h-16'>
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={data.postedBy.image}
                  alt="profile phoot"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/`}>
              <div className='flex items-center gap-2'>
                <p className='flex items-center gap-2 font-bold md:text-md text-primary'>
                  {data.postedBy.userName}{' '}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='hidden text-xs font-medium text-gray-500 capitalize md:block'>
                  {data.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative flex gap-4 lg:ml-20">
        <div className="rounded-3xl"
            onMouseEnter={() => setIsHover(true) }
            onMouseLeave={() => setIsHover(false) }
        >
        <Link href={`/detail/${data._id}`}>
            <video 
              loop
              ref={videoRef}
              src={data.video.asset.url}
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'>
            </video>
        </Link>
        { isHover && (
           <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3'>
              { playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-2xl text-black lg:text-4xl" />
                </button>
              ) : (
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className='text-2xl text-black lg:text-4xl' />
                  </button>
              )}
             {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-2xl text-black lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-2xl text-black lg:text-4xl' />
                </button>
              )}
          </div>
        ) }
        </div>

      </div>
    </div>
  )
}

export default VideoCard