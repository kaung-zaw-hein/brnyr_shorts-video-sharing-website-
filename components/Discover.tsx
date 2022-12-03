import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Discover = ({ tags} : any) => {

    const router = useRouter();
    const { topic } = router.query;

    const activeTopicStyle = 'px-3 py-4 flex  gap-2 justify-start cursor-pointer text-[#F2D202] transition-all';
    const topicStyle = 'px-3 py-4 flex  gap-2 justify-start cursor-pointer text-white';
    
    let uniqueTags=tags.filter((tag : string, index: number, array: any) =>{
        return array.indexOf(tag)===index
    })

    return (
        <div className="pb-6 xl:border-b-2 xl:border-gray-200">
            <p className="hidden m-3 mt-4 font-semibold teaxt-gray-500 xl:block">
                Trends For you
            </p> 
            <div className='flex flex-col hidden xl:block'>
                {uniqueTags?.slice(0,5).map((tag : string) => (
                <Link href={`/?topic=${tag}`} key={tag}>
                    <div className={topic === tag ? activeTopicStyle : topicStyle}>
                    <span className={`font-medium text-md hidden xl:block capitalize`}>
                        #{tag}
                    </span>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    )
}

export default Discover