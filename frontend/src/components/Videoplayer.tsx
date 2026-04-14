"use client";

import { useRef, useState } from "react";

interface VideoPlayerProps {
  video: {
    _id: string;
    videotitle: string;
    filepath: string;
  };
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [tapCount, setTapCount] = useState(0);
  const [tapTimer, setTapTimer] = useState<any>(null);

  const handleTap = (position: "left" | "center" | "right") => {
    if (tapTimer) clearTimeout(tapTimer);

    const newCount = tapCount + 1;
    setTapCount(newCount);

    const timer = setTimeout(() => {
      performAction(newCount, position);
      setTapCount(0);
    }, 300);

    setTapTimer(timer);
  };

  const performAction = (count: number, position: string) => {
    const video = videoRef.current;
    if (!video) return;

    if (count === 2) {
      if (position === "right") {
        video.currentTime += 10;
      }

      if (position === "left") {
        video.currentTime -= 10;
      }
    }

    if (count === 1 && position === "center") {
      if (video.paused) video.play();
      else video.pause();
    }

    if (count === 3) {
      if (position === "center") {
        window.location.href = "/next"; // next video
      }

      if (position === "right") {
        window.close(); // close site
      }

      if (position === "left") {
        document
          .getElementById("comments")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
      >
        <source
          src={`${process.env.BACKEND_URL}/${video?.filepath}`}
          type="video/mp4"
        />
      </video>

      <div
        className="absolute left-0 top-0 w-1/3 h-full"
        onClick={() => handleTap("left")}
      />

      <div
        className="absolute left-1/3 top-0 w-1/3 h-full"
        onClick={() => handleTap("center")}
      />

      <div
        className="absolute right-0 top-0 w-1/3 h-full"
        onClick={() => handleTap("right")}
      />
    </div>
  );
}