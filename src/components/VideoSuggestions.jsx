import React from "react";
import { formatDuration, timeAgo } from "../helper/Timeago";
import { useNavigate } from "react-router-dom";

function VideoSuggestions({
  title,
  thumbnail,
  duration,
  views,
  channelName,
  createdAt,
  videoId
})
 {

    const navigate = useNavigate();

    const handleVideoClick = () => {
        navigate(`/watch/${videoId}`);
    }

  return (
    <div className="relative flex space-x-4 p-3 rounded-lg bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300 hover:scale-105 transform transition duration-300 shadow-lg cursor-pointer" 
        onClick={handleVideoClick}
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-40 h-24 object-cover rounded-lg"
        />
        {/* Duration */}
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-xs text-white px-2 py-0.5 rounded">
          {formatDuration(duration)}
        </span>
      </div>

      {/* Video Info */}
      <div className="flex flex-col justify-between">
        <h3 className="text-md font-bold text-white line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-200">{channelName}</p>
        <p className="text-xs text-gray-300">
          {views} views • {timeAgo(createdAt)}
        </p>
      </div>
    </div>
  );
}

export default VideoSuggestions;
