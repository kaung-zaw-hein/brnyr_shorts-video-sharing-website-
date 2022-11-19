import { useState, useEffect } from "react";
import Image from 'next/image';
import { GoVerified } from "react-icons/go";
import axios from 'axios';

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}

const Profile = ({ data } : IProps) => {

    const [ showUserVideos, setShowUserVideos ] = useState(true);
    const [ videosList, setVideosList ] = useState<Video[]>([]);

    const { user, userVideos, userLikedVideos } = data;
    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

    useEffect(() => {
        if(showUserVideos){
            setVideosList(userVideos);
        } else {
            setVideosList(userLikedVideos);
        }
    }, [showUserVideos, userLikedVideos, userVideos]);

    return (
        <div className='w-full'>
            <div className='flex w-full gap-6 mb-4 bg-white md:gap-10'>
                <div className='w-16 h-16 md:w-32 md:h-32'>
                <Image
                    width={120}
                    height={120}
                    layout='responsive'
                    className='rounded-full'
                    src={user.image}
                    alt='user-profile'
                />
                </div>

                <div>
                <div className='flex items-center justify-center gap-2 font-bold tracking-wider lowercase text-md md:text-2xl'>
                    <span>{user.userName.replace(/\s+/g, '')} </span>
                    <GoVerified className='text-blue-400 md:text-xl text-md' />
                </div>
                <p className='text-sm font-medium'> {user.userName}</p>
                </div>
            </div>
            <div>
                <div className='flex w-full gap-10 mt-10 mb-10 bg-white border-b-2 border-gray-200'>
                <p className={`text-xl font-semibold cursor-pointer ${videos} mt-2`} onClick={() => setShowUserVideos(true)}>
                    Videos
                </p>
                <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(false)}>
                    Liked
                </p>
                </div>
                <div className='flex flex-wrap gap-6 md:justify-start'>
                {videosList.length > 0 ? (
                    videosList.map((post: Video, idx: number) => (
                    <VideoCard key={idx} data={post} />
                    ))
                ) : (
                    <NoResults
                    text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
                    />
                )}
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({
    params: { id }
} : {
    params: { id: string}
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

    return {
        props: { data: res.data}
    }
}

export default Profile;