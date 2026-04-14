import Comments from "@/components/Comments";
import RelatedVideos from "@/components/RelatedVideos";
import VideoInfo from "@/components/VideoInfo";
import Videopplayer from "@/components/Videoplayer";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();
  const { id } = router.query;

  const [videos, setvideo] = useState<any>(null);
  const [video, setvide] = useState<any>(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchvideo = async () => {
      if (!id || typeof id !== "string") return;

      try {
        const res = await axiosInstance.get("/video/getall");

        const video = res.data?.filter((vid: any) => vid._id === id);

        setvideo(video[0]);
        setvide(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };

    fetchvideo();
  }, [id]);

  if (loading) {
    return <div>Loading..</div>;
  }

  if (!videos) {
    return <div>Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-4">

            <Videopplayer video={videos} />

            <VideoInfo video={videos} />

            <div id="comments">
              <Comments videoId={id} />
            </div>

          </div>

          <div className="space-y-4">
            <RelatedVideos videos={video} />
          </div>

        </div>

        <div className="mt-4">
          <button
            onClick={() => router.push(`/call/${id}`)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            📞 Watch Together
          </button>
        </div>

      </div>
    </div>
  );
};

export default index;