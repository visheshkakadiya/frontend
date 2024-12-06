import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubscription } from "../store/Slices/subscriptionSlice";
import { Like, Button } from "./index";
import { timeAgo } from "../helper/Timeago";
import { Link } from "react-router-dom";
import { addVideoToPlaylist, getPlaylistsByUser } from "../store/Slices/playlistSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Description({
    title,
    description,
    views,
    createdAt,
    avatar,
    isSubscribed,
    subscribersCount,
    isLiked,
    likesCount,
    channelName,
    channelId,
    videoId,
    userId
}) {
    const playlists = useSelector((state) => state.playlist?.playlists);
    const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
    const [localSubscribersCount, setLocalSubscribersCount] = useState(subscribersCount);
    const [listOpen, setListOpen] = useState(false);

    const dispatch = useDispatch();

    const handleSubscribe = () => {
        dispatch(toggleSubscription(channelId));
        setLocalIsSubscribed((prev) => !prev);
        setLocalSubscribersCount((prev) => (localIsSubscribed ? prev - 1 : prev + 1));
    };

    const handleAddVideo = (playlistId) => {
        dispatch(addVideoToPlaylist({ videoId, playlistId }));
        setListOpen(false); // Close the playlist dropdown after adding the video
    };

    useEffect(() => {
        if (userId) {
            dispatch(getPlaylistsByUser(userId));
        }
    }, [dispatch, userId]);

    return (
        <section className="sm:max-w-4xl w-full text-white sm:p-5 p-2 space-y-2">
            <div className="border-b border-slate-700">
                <div className="space-y-2 mb-2">
                    <h1 className="sm:text-2xl font-semibold">{title}</h1>
                    <div className="flex items-center justify-between sm:justify-start sm:gap-5">
                        <div>
                            <span className="text-sm text-slate-400">
                                {views} views · {timeAgo(createdAt)}
                            </span>
                        </div>
                        <div className="rounded-full w-24 flex justify-center bg-[#222222] py-1">
                            <Like
                                isLiked={isLiked}
                                videoId={videoId}
                                likesCount={likesCount}
                                size="1x"
                            />
                        </div>
                        <div className="relative">
                            <div
                                className="rounded-full w-24 flex justify-center bg-[#222222] py-1 cursor-pointer"
                                onClick={() => setListOpen((prev) => !prev)}
                            >
                                <FontAwesomeIcon icon={faPlus} className="pt-1 mr-2" />
                                <p>Save</p>
                            </div>
                            {listOpen && (
                                <div className="absolute left-0 bg-gray-800 rounded-lg shadow-md mt-2 z-10">
                                    <ul className="py-2">
                                        {playlists?.map((playlist) => (
                                            <li
                                                key={playlist?._id}
                                                className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
                                                onClick={() => handleAddVideo(playlist._id)}
                                            >
                                                {playlist?.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <Link to={`/channel/${channelName}/videos`} className="flex gap-2">
                            <img
                                src={avatar}
                                alt="Channel Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h1 className="font-semibold">{channelName}</h1>
                                <p className="text-xs text-slate-400">
                                    {localSubscribersCount} Subscribers
                                </p>
                            </div>
                        </Link>
                        <Button
                            onClick={handleSubscribe}
                            className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500"
                        >
                            {localIsSubscribed ? "Subscribed" : "Subscribe"}
                        </Button>
                    </div>
                </div>
            </div>
            <p className="text-xs bg-[#222222] rounded-lg p-2 outline-none">{description}</p>
        </section>
    );
}

export default Description;
