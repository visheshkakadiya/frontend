import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleSubscription } from '../store/Slices/subscriptionSlice'
import {Like, Button} from './index'
import {timeAgo} from '../helper/Timeago'
import { Link } from 'react-router-dom'

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
}) {

    const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed)
    const [loacalSubscribersCount, setLocalSubscribersCount] = useState(subscribersCount)

    const dispatch = useDispatch()

    const handleSubscribe = async () => {
        dispatch(toggleSubscription(channelId))
        setLocalIsSubscribed((prev) => !prev)
        if (localIsSubscribed) {
            setLocalSubscribersCount((prev) => prev - 1)
        } else {
            setLocalSubscribersCount((prev) => prev + 1)
        }
    }

    return (
        <section className="sm:max-w-4xl w-full text-white sm:p-5 p-2 space-y-2">
                <div className="border-b border-slate-700">
                    <div className="space-y-2 mb-2">
                        <h1 className="sm:text-2xl font-semibold">{title}</h1>
                        <div className="flex items-center justify-between sm:justify-start sm:gap-5">
                            <div>
                                <span className="text-sm text-slate-400">
                                    {views} views .{" "}
                                </span>
                                <span className="text-sm text-slate-400">
                                    {timeAgo(createdAt)}
                                </span>
                            </div>
                            <div className=" rounded-full w-24 flex justify-center bg-[#222222] py-1">
                                <Like
                                    isLiked={isLiked}
                                    videoId={videoId}
                                    likesCount={likesCount}
                                    size='1x'
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Link
                                to={`/channel/${channelName}/videos`}
                                className="flex gap-2"
                            >
                                <img
                                    src={avatar}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h1 className="font-semibold">
                                        {channelName}
                                    </h1>
                                    <p className="text-xs text-slate-400">
                                        {loacalSubscribersCount} Subscribers
                                    </p>
                                </div>
                            </Link>
                                <Button
                                    onClick={handleSubscribe}
                                    className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500"
                                >
                                    {localIsSubscribed
                                        ? "Subscribed"
                                        : "Subscribe"}
                                </Button>
                        </div>
                    </div>
                </div>
                <p className="text-xs bg-[#222222] rounded-lg p-2 outline-none">
                    {description}
                </p>
            </section>
    )
}

export default Description
