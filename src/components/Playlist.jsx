import React from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo, formatDuration } from "../helper/Timeago";

function Playlist({
  title,
  description,
  views = 0,
  createdAt,
  channelName,
  thumbnail,
  videoId,
  avatar,
  duration,
}) {
  const navigate = useNavigate();

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${channelName}`);
  };

  const handleVideoClick = () => {
    navigate(`/watch/${videoId}`);
  };

  return (
    <div
      className="flex items-start bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer mt-2"
      onClick={handleVideoClick}
    >
      {/* Video Thumbnail */}
      <div className="relative w-48 h-28 flex-shrink-0">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-sm text-white px-2 rounded">
          {formatDuration(duration)}
        </span>
      </div>

      {/* Video Details */}
      <div className="ml-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-purple-400 truncate">{title}</h3>
        <span className="text-md text-gray-400 mt-1">
          {views} Views • {timeAgo(createdAt)}
        </span>
        <p className="text-md text-gray-300 mt-2 line-clamp-3">{description}</p>
        <div className="flex items-center mt-3">
          <img
            src={avatar}
            alt={channelName}
            className="w-10 h-10 rounded-full cursor-pointer mr-3"
            onClick={handleAvatarClick}
          />
          <span className="text-md text-gray-400 font-medium">{channelName}</span>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
