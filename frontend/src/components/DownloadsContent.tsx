"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosinstance";
import { useUser } from "@/lib/AuthContext";

export default function DownloadsContent() {
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      loadDownloads();
    }
  }, [user]);

  const loadDownloads = async () => {
    try {
      const res = await axiosInstance.get(`/downloads/${user?._id}`);
      setDownloads(res.data);
    } catch (error) {
      console.error("Error loading downloads:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeDownload = async (id: string) => {
    setDownloads(downloads.filter((item) => item._id !== id));
  };

  if (loading) return <div>Loading downloads...</div>;

  if (!downloads.length) {
    return (
      <div className="text-center py-12">
        <Download className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No downloads yet</h2>
        <p className="text-gray-600">
          Videos you download will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">{downloads.length} videos</p>

      {downloads.map((item) => (
        <div key={item._id} className="flex gap-4 group">

          <Link href={`/watch/${item.videoid._id}`}>
            <div className="relative w-40 aspect-video bg-gray-100 rounded overflow-hidden">
              <video
                src={`${process.env.BACKEND_URL}/${item.videoid?.filepath}`}
                className="object-cover"
              />
            </div>
          </Link>

          <div className="flex-1">
            <Link href={`/watch/${item.videoid._id}`}>
              <h3 className="font-medium text-sm line-clamp-2 hover:text-blue-600">
                {item.videoid.videotitle}
              </h3>
            </Link>

            <p className="text-sm text-gray-600">
              {item.videoid.videochanel}
            </p>

            <p className="text-xs text-gray-500">
              Downloaded {formatDistanceToNow(new Date(item.createdAt))} ago
            </p>
          </div>

          <Button
            variant="ghost"
            onClick={() => removeDownload(item._id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>

        </div>
      ))}
    </div>
  );
}