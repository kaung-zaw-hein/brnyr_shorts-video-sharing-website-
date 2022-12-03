import type { NextPage } from 'next';
import axios from 'axios';
import { Video } from '../types';
import { BASE_URL } from '../utils';
import { useRouter } from 'next/router';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import Sidebar from '../components/Sidebar';

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps ) => {

  const router = useRouter();
  const { topic } : any = router.query;

  let tags : any =[];
  videos.forEach((post)=>{
      tags.push(post.topic);
  })
  return (
    <div className="flex h-full gap-6 md:gap-8">
      <div className="h-full ">
        { !topic && <Sidebar tags={tags} />}
      </div>
      <div className="flex flex-col gap-10 overflow-y-auto overflow-x-hidden h-[88vh] videos flex-1 videos">
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard data={video} key={video._id} />
          ))
        ) : (
            <NoResults text={`No Videos`} />
        )}
      </div>
    </div>
  )
}

export  const getServerSideProps = async ({
    query: { topic },
  }: {
    query: { topic: string };
  }) => {
    
  var {data} = await axios.get(`${BASE_URL}/api/post`);

  if(topic) {
  var {data} = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: {
      videos: data
    }
  }

};


export default Home
