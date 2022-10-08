import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin } from 'react-google-login';
import { AiFillHome , AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';

const Sidebar = () => {
  const [ showSidebar, setShowSidebar ] = useState(true);
  const { pathname } = useRouter();

  const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F2D202] rounded';

  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';
  return (
    <div>
      <div className="block w-20 mt-3 text-xl xl:hidden"
           onClick={() => setShowSidebar((prev) => !prev)}
      >
        { showSidebar ? <ImCancelCircle  className="mx-auto"/> : <AiOutlineMenu className="mx-auto"/>}
      </div>
      { showSidebar && (
        <div className="flex flex-col justify-start w-20 p-3 mb-10 border-r-2 border-gray-100 xl:w-400 xl:border-0 ">
          <div className="border-gray-200 xl:border-b-2 xl:pb-4">
            <Link href="/">
              <div className={ pathname === "/" ? activeLink : normalLink }>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='hidden text-xl capitalize xl:block'>
                  For You
                </span>
              </div>
            </Link>
          </div>
          <Discover />
          <SuggestedAccounts
          />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar