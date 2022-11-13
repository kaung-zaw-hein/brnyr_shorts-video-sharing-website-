import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/Logo.png';
import { createOrGetUser } from '../utils';

import useAuthStore from '../store/authStore';

const Navbar = () => {

  const { userProfile, addUser, removeUser } : any = useAuthStore();

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b-2 border-gray-200">
      <Link href="/" >
        <div className="w-[100px] md:w-[130px]">
          <Image className='cursor-pointer' src={Logo} alt="TikTik" layout='responsive'/>
        </div>
      </Link>
      <div>Search</div>
      <div>
        { userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className='flex items-center gap-2 px-2 font-semibold border-2 md:px-4 text-md'>
                <IoMdAdd className='text-xl' /> {``}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
          {userProfile.image && (
            <Link href="/">
              <>
                <Image 
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                  src={userProfile.image}
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