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

const VideoCard: NextPage<IProps> = ({ data }) => {

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

  useEffect(() => {
    if(videoRef?.current){
      videoRef.current.muted = isVideoMuted;
    }

  }, [isVideoMuted])

  return (
    <div className='flex flex-col pr-2 py-6 rounded-3xl w-auto bg-[#1B2730]'>
      <div>
        <div className='flex gap-3 p-2 font-semibold rounded cursor-pointer '>
          <div className='w-10 h-10 md:w-16 md:h-16'>
            <Link href={`/profile/${data.postedBy?._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className='rounded-full '
                  src={data.postedBy?.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${data.postedBy?._id}`}>
              <div className='flex items-center gap-2'>
                <p className='flex items-center gap-2 font-bold md:text-md text-primary'>
                  {data.postedBy.userName}{' '}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
              </div>
            </Link>
            <Link href={`/detail/${data._id}`}>
              <p className='mt-2 font-normal '>{data.caption}</p>
            </Link>
          </div>
        </div>
      </div>

      <div className='relative flex gap-4 mx-auto lg:ml-20'>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className='rounded-3xl'
        >
          <Link href={`/detail/${data._id}`}>
            <video
              loop
              ref={videoRef}
              src={data.video.asset.url}
              className='lg:w-[800px] h-[400px] md:h-[378px] lg:h-[528px] md:w-[650px] w-[300px] rounded-2xl cursor-pointer bg-gray-100'
            ></video>
          </Link>

          {true && (
            <div className='absolute bottom-6 cursor-pointer left-0 flex gap-10  justify-between w-[250px] md:w-[650px] lg:w-[800px]'>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-2xl text-black lg:text-4xl' />
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
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard