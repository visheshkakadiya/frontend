import React from 'react';
import { formatDuration, timeAgo } from '../helper/Timeago';
import { useNavigate } from 'react-router-dom';

function VideoList({
    thumbnail,
    duration,
    title,
    views = 0,
    avatar,
    channelName,
    createdAt,
    videoId,
}) {
    const navigate = useNavigate();

    const handleAvatarClick = (e) => {
        e.stopPropagation();
        navigate(`/channel/${channelName}`);
    };

    return (
        <div className='group sm:p-3 p-2 cursor-pointer rounded-2xl hover:bg-white/5 hover:shadow-card-hover transition-all duration-300 ease-smooth'
            onClick={() => navigate(`/watch/${videoId}`)}
        >
            <div className='relative w-full sm:w-[360px] aspect-video overflow-hidden rounded-xl shadow-md'>
                <img src={thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                <span className='absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs py-1 px-2 rounded-md font-medium tracking-wide'>
                    {formatDuration(duration)}
                </span>
            </div>
            <div className='flex items-start py-3 gap-3'>
                {avatar && (
                    <div onClick={handleAvatarClick} className="shrink-0">
                        <img src={avatar}
                            className='w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary-500/50 shadow-sm transition-all duration-300' />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-white group-hover:text-primary-400 transition-colors duration-300 line-clamp-2 leading-snug mb-1">{title}</h2>
                    <h2 className="text-sm font-medium text-dark-300 hover:text-white transition-colors truncate">
                        {channelName}
                    </h2>
                    <div className="text-xs text-dark-400 mt-1 flex items-center gap-1.5 font-medium">
                        <span>{views} Views</span> 
                        <span className="w-1 h-1 rounded-full bg-dark-500 inline-block"></span>
                        <span>{timeAgo(createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoList;
