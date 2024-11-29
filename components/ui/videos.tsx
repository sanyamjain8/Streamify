import React, {useEffect, useState} from 'react';
import thumbnail from '@/public/images/thumbnail.png'
import Link from 'next/link'
import lighthouse from '@lighthouse-web3/sdk'
import SkeletonLoading from '../StudioPage/SkeletonLoading';
import { lighthouseAPI } from '@/utils/config';

const VideoSection = () => {
  const videos = [
    { id: 1, creator: 'Sam James' , time: '7 min', title: 'Basic how to get into web 2 ecosystem', views: '52 views' , timeAdded: '2 weeks ago' , thumbnail },
    { id: 2, creator: 'Sam James' , time: '7 min', title: 'Basic how to get into web 2 ecosystem', views: '52 views' , timeAdded: '2 weeks ago' , thumbnail },
    { id: 3, creator: 'Sam James' , time: '7 min', title: 'Basic how to get into web 2 ecosystem', views: '52 views' , timeAdded: '2 weeks ago' , thumbnail },
    { id: 4, creator: 'Sam James' , time: '7 min', title: 'Basic how to get into web 2 ecosystem', views: '52 views' , timeAdded: '2 weeks ago' , thumbnail },
    { id: 5, creator: 'Sam James' , time: '7 min', title: 'Basic how to get into web 2 ecosystem', views: '52 views' , timeAdded: '2 weeks ago' , thumbnail },
    { id: 6, creator: 'Sam James' , time: '7 min', title: 'Basic how to get into web 2 ecosystem', views: '52 views' , timeAdded: '2 weeks ago' , thumbnail },
    { id: 7, creator: 'Sam James' , time: '7 min', title: 'Basic how to get into web 2 ecosystem', views: '52 views' , timeAdded: '2 weeks ago' , thumbnail },
    { id: 8, creator: 'Sam James' , time: '7 min', title: 'Basic how to get into web 2 ecosystem', views: '52 views' , timeAdded: '2 weeks ago' , thumbnail },
    { id: 9, creator: 'Sam James' , time: '7 min', title: 'Basic how to get into web 2 ecosystem', views: '52 views' , timeAdded: '2 weeks ago' , thumbnail },
    { id: 10, creator: 'Sam James' , time: '7 min', title: 'Basic how to get into web 2 ecosystem', views: '52 views' , timeAdded: '2 weeks ago' , thumbnail },

  ];


  interface FileObject {
    publicKey: string;
    fileName: string;
    mimeType: string;
    txHash: string;
    status: string;
    createdAt: number;
    fileSizeInBytes: string;
    cid: string;
    id: string;
    lastUpdate: number;
    encryption: boolean;
  }
  
  const [allVideos, setAllVideos] = useState<FileObject[]>([]);
  const [isloading, setIsloading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await lighthouse.getUploads(lighthouseAPI);
        if (response.data && response.data.fileList) {
          const imageExtensions = [".jpg", ".jpeg", ".png"];
          const nonImageFiles = response.data.fileList.filter(file => {
            const extension = file.fileName.slice(file.fileName.lastIndexOf('.')).toLowerCase(); // Get the file extension
            return !imageExtensions.includes(extension); // Filter out files with image extensions
        });
          setAllVideos(nonImageFiles);
          console.log(allVideos);
          setIsloading(false)
          // console.log(response.data.fileList);
          
          
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching uploads:', error);
        // Handle error accordingly
      }
    };

    fetchData();
  }, []);



  const getTimeDifference = (timestamp: number): string => {
    const currentDate = new Date();
    const givenDate = new Date(timestamp);
    const timeDifference = currentDate.getTime() - givenDate.getTime();

    const minutes = Math.floor(timeDifference / (1000 * 60));
    if (minutes < 60) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }

    // If more than 7 days, return the date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return givenDate.toLocaleDateString('en-US');
};

  

  return (
    <div>

      {isloading ? (
        <SkeletonLoading/>
      ) : 
      (
        <div className="mx-auto ">
      <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {allVideos.map((video, index) => (
          <Link href={`/VideoPlayerPage?video=${encodeURIComponent(JSON.stringify(video))}`} key={index}>
            <div className='bg-gradient-to-b from-[#fff0] via-[#ffffff2d] to-cyan-400  p-[0.3vw] md:p-[0.1vw] rounded-[0.5vw]' >
                <div key={video.id} className="bg-black   text-white rounded-[0.5vw] overflow-hidden">
                  <div className='relative' style={{ width: '100%', maxWidth: '300px' }}>
                  <img src={`https://gateway.lighthouse.storage/ipfs/${video.fileName.substring(video.fileName.lastIndexOf(' ') + 1)}`} alt={video.fileName} className="w-full h-auto" style={{ aspectRatio: '3/2' }}  />
                  {/* <div className='absolute top-[1vw] px-[1vw] text-[2vw] md:text-[1.2vw] lg:text-[0.9vw] rounded-[0.5vw]  bg-[#0000002f] right-[1vw] ' >{video.time}</div> */}
                  </div>
                    <div className="p-[1vw]">
                        {/* <p className='  text-[3vw] md:text-[1vw] lg:text-[0.8vw] ' >{video.creator}</p> */}
                        <p className=" text-sm md:text-[1vw]  font-semibold mb-2">{video.fileName.substring(0, video.fileName.lastIndexOf(' '))}</p>
                        <div className='flex text-center text-[2.2vw] md:text-[0.8vw] text-[#808191] space-x-[0.5vw]' >
                            {/* {video.views} */}
                            <div className='text-center px-[1vw]' ><p>.</p></div>
                            {getTimeDifference(video.createdAt)}
                        </div>
                    </div>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
      )}
    
      



    </div>
    
  );
};

export default VideoSection;
