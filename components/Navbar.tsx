import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/Logo.png';

const Navbar = () => {

  const user = false;

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b-2 border-gray-200">
      <Link href="/" >
        <div className="w-[100px] md:w-[130px]">
          <Image className='cursor-pointer' src={Logo} alt="TikTik" layout='responsive'/>
        </div>
      </Link>
      <div>Search</div>
      <div>
        { user ? (
          <div>Logged In</div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => console.log(response)}
            onError={() => console.log('Error')}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar