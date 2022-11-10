import type { NextPage } from 'next';
import axios from 'axios';
import { Video } from '../types';
import { BASE_URL } from '../utils';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps ) => {

  return (
    <div className="flex flex-col h-full gap-10 videos">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard data={video} key={video._id} />
        ))
      ) : (
          <NoResults />
      )}
    </div>
  )
}

export  const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: data
    }
  }

};


export default Home
