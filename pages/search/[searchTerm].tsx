import React, { useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore';

const Search = ({ videos }: { videos: Video[] })  => {
    const [isAccounts, setIsAccounts] = useState(false);
    const { allUsers }: { allUsers: IUser[] } = useAuthStore();

    const router = useRouter();
    const { searchTerm } : any = router.query;

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const searchedAccounts =  allUsers.filter((user : IUser ) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));
  
    return (
    <div className="w-auto px-10">
        <div className='z-50 flex w-full gap-10 mb-10 '>
            <p onClick={() => setIsAccounts(true)} className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}>
            Accounts
            </p>
            <p className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`} onClick={() => setIsAccounts(false)}>
            Videos
            </p>
      </div>
      { isAccounts ? (
        <div className='md:mt-16'>
            {searchedAccounts.length > 0 ? (
              searchedAccounts.map((user: IUser, idx: number) => (
                <Link key={idx} href={`/profile/${user._id}`}>
                  <div className='flex gap-3 p-2 font-semibold border-b-2 border-gray-200 rounded cursor-pointer '>
                    <div>
                      <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image}/>
                    </div>
                    <div>
                      <div>
                        <p className='flex items-center gap-1 text-lg font-bold text-primary'>
                          {user.userName} <GoVerified className='text-blue-400' />
                        </p>
                        <p className='text-sm text-gray-400 capitalize'>
                          {user.userName}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoResults text={`No Account results for ${searchTerm}`} /> 
            )}
        </div>
      ) : (
        <div className='flex flex-col flex-wrap items-center gap-6 md:mt-16 md:justify-start '>
            {videos?.length ? (
                videos.map((video: Video, idx: any) => (
                    <VideoCard data={video} key={idx} />
                ))
            ) :
            ( <NoResults text={`No video results for ${searchTerm}`} /> ) 
            }
        </div>
    )}
    </div>
  )
}

export const getServerSideProps = async ({
    params: { searchTerm },
  }: {
    params: { searchTerm: string };
  }) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  
    return {
      props: { videos: res.data },
    };
};

export default Search