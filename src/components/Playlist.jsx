import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { timeAgo, formatDuration } from "../helper/Timeago";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeVideoFromPlaylist, getPlaylistById } from "../store/Slices/playlistSlice";

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
  playlistId
}) {
  const navigate = useNavigate();
  const authUsername = useSelector((state) => state.auth?.user?.username);
  const username = useSelector((state) => state.user?.profileData?.username);
  const dispatch = useDispatch();
  const [editPlaylist, setEditPlaylist] = useState({
    removing: false,
    isOpen: false,
  });

  const handleRemoveVideo = () => {
    setEditPlaylist((prevState) => ({ ...prevState, removing: true }));
    dispatch(removeVideoFromPlaylist({ playlistId, videoId }))
        .unwrap()
        .then(() => {
            // Re-fetch the updated playlist to reflect the changes
            dispatch(getPlaylistById(playlistId));
            setEditPlaylist((prevState) => ({ ...prevState, removing: false, isOpen: false }));
        })
};

  // console.log("playlistId: ", playlistId);
  // console.log("videoId: ", videoId);

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${channelName}`);
  };

  const handleVideoClick = () => {
    navigate(`/watch/${videoId}`);
  };

  const toggleOptions = (e) => {
    e.stopPropagation();
    setEditPlaylist((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
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

      {/* Options */}
      {authUsername === username && (
        <div className="relative">
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="text-white cursor-pointer w-6"
            onClick={toggleOptions}
          />

          {editPlaylist.isOpen && (
            <div className="absolute right-0 mt-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg p-2 z-10">
              <ul>
                <li
                  className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveVideo();
                  }}
                >
                  {editPlaylist.removing ? "Removing..." : "Remove"}
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Playlist;
