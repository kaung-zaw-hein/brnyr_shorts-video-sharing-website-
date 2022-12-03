import { useState, useEffect } from "react";
import Image from 'next/image';
import { GoVerified } from "react-icons/go";
import axios from 'axios';

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";
import useAuthStore from '../../store/authStore';

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
    const [ isEditing, setIsEditing ] = useState(false);
    
    
    const { user, userVideos, userLikedVideos } = data;
    const [ userName, setUserName ] = useState(user.userName);
    const { userProfile, addUser } : any = useAuthStore();

    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

    const editUserName  = async (e : any) => {
        e.preventDefault();
    
        if(userProfile && userName) {
          const { data } = await axios.put(`${BASE_URL}/api/profile/${user._id}`, {
            userId: userProfile._id,
            userName 
          });
          
          setUserName(data.userName);
          setIsEditing(false);
          addUser(data);
        }
    }
    useEffect(() => {
        if(showUserVideos){
            setVideosList(userVideos);
        } else {
            setVideosList(userLikedVideos);
        }
    }, [showUserVideos, userLikedVideos, userVideos]);

    return (
        <div className='flex flex-col m-10 mt-10 '>
            <div className='relative flex w-full gap-6 mb-4 md:gap-10'>
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
                { isEditing ? (
                    <div className="w-10 px-2 pb-6">
                        <form onSubmit={editUserName} className='flex gap-4'>
                            <input
                            value={userName}
                            onChange={(e) => setUserName(e.target.value.trim())}
                            className='text-[#3d3d3d] bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
                            placeholder='Edit username..'
                            />
                            <button className='text-gray-400 text-md '>
                            Edit
                            </button>
                        </form>

                    </div>
                ) : (
                    <div className='flex items-center justify-center gap-2 font-bold tracking-wider lowercase text-md md:text-2xl'>
                        <span>{userName.replace(/\s+/g, '')} </span>
                        <GoVerified className='text-blue-400 md:text-xl text-md' />
                    </div>  
                )}
                </div>
                { userProfile._id === user._id && <button
                    type='button'
                    className='absolute right-0 w-20 h-10 p-2 font-medium border-2 border-gray-300 rounded outline-none text-md lg:w-30'
                    onClick={() => setIsEditing((prev) => !prev)}
                    >
                    {isEditing ? "Cancel" : "Edit"}   
                </button>}
            </div>
            <div>
                <div className='flex w-full gap-10 mb-10'>
                    <p className={`text-xl font-semibold cursor-pointer ${videos} mt-2`} onClick={() => setShowUserVideos(true)}>
                        Videos
                    </p>
                    <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(false)}>
                        Liked
                    </p>
                </div>
                    <div className='flex flex-col flex-wrap items-center gap-5'>
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