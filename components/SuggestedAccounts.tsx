import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import { IUser } from '../types';


const SuggestedAccounts = ({ SugAccounts } : any) => {
  
  return (
    <div className='pb-4 border-gray-200 xl:border-b-2'>
      <p className='hidden m-3 mt-4 font-semibold text-gray-500 xl:block'>
        Suggested accounts
      </p>
      <div>
        {SugAccounts?.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 p-2 font-semibold transition-all rounded cursor-pointer hover:bg-gray-500 '>
              <div className='w-8 h-8'>
                <Image
                  width={62}
                  height={62}
                  className='rounded-full '
                  src={user?.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </div>

              <div className='hidden xl:block'>
                <p className='flex items-center gap-1 font-bold lowercase text-md text-primary'>
                  {user.userName.replace(/\s+/g, '')}{' '}
                  <GoVerified className='text-blue-400' />
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts