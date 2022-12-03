import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/Logo.png';
import { createOrGetUser } from '../utils';

import useAuthStore from '../store/authStore';
import { BiSearch } from 'react-icons/bi';
import { IUser } from '../types';

const Navbar = () => {
  const [ user, setUser ] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState('');
  
  const router = useRouter();
  const { userProfile, addUser, removeUser } : any = useAuthStore();
  
  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue){
      if(searchValue.charAt(0) === "#"){
        router.push(`/?topic=${searchValue.slice(1)}`)
        return;
      }
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 mb-5 border-b-2 border-gray-600">
      <div className="flex items-center justify-between">
        <Link href="/" >
          <div className="w-[70px] md:w-[90px]">
            <Image className='cursor-pointer' src={Logo} alt="TikTik" layout='responsive'/>
          </div>
        </Link>
        <div className="relative hidden ml-5 md:block">
          <form
            onSubmit={handleSearch}
            className="absolute md:static top-10 -left-20"
          >
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search accounts and videos"
              className='bg-[#1B2730] p-3 md:text-md font-medium border-2 border-gray-600 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0 transition-all'
            />
            <button
              onClick={handleSearch}
              className='absolute pl-4 text-2xl text-gray-400 border-l-2 border-gray-300 md:right-5 right-6 top-4'
            >
              <BiSearch />
            </button>
          </form>  
        </div>
      </div>

      <div>
        { user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/upload">
              <button className='flex items-center gap-2 px-2 font-semibold border-2 border-transparent md:px-4 text-md'>
                <IoMdAdd className='text-xl' /> {``}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
          {user.image && (
            <Link href="/">
              <>
                <Image 
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                  src={user.image}
                  alt="Profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
               googleLogout();
               removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Error')}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar