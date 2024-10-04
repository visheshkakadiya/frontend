import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSubscription } from '../../store/Slices/subscriptionSlice'
import { EditAvatar, Button } from '../index'

function ChannelHeader({
    coverImage = "https://images.unsplash.com/photo-1597712903618-a9daae0496a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&w=1000&q=80",
    avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRyPsC-WOTRffoXvCe-VYnG_97c8b7qavsTA&s",
    username = "username",
    fullName = "fullName",
    subscribersCount,
    subsribedCount,
    isSubscribed,
    channelId,
    edit,
}) {
    const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed)
    const [localSubscribersCount, setLocalSubscribersCount] = useState(subscribersCount)

    const dispatch = useDispatch()
    const userProfile = useSelector((state) => state.user?.profileData?._id);
    const user = useSelector((state) => state.auth?.user?._id);

    useEffect(() => {
        setLocalIsSubscribed(isSubscribed)
        setLocalSubscribersCount(subscribersCount)
    }, [isSubscribed, subscribersCount])

    const handleSubscribe = async () => {
        dispatch(toggleSubscription(channelId))
        setLocalIsSubscribed((prev) => !prev)
        if (localIsSubscribed) {
            setLocalSubscribersCount((prev) => prev - 1)
        }
        else {
            setLocalSubscribersCount((prev) => prev + 1)
        }
    }

    return (
        <div className='w-full text-white'>
            {/* coverImage section */}
            <section className='w-full'>
                {coverImage ? (
                    <div className='relative'>
                        <img src={coverImage}
                            className='sm:h-40 h-28 w-full object-cover' />

                        {edit && (
                            <div className="absolute inset-0 flex justify-center items-center">
                                <EditAvatar
                                    cover={true}
                                    preImage={coverImage} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='sm:h-40 h-28 w-full border-slate-600 border-b bg-black'></div>
                )}
            </section>

            {/*channel details section  */}
            <section className=" w-full sm:px-5 p-2 flex sm:flex-row flex-col items-start sm:gap-4">
                <div className='h-12'>
                    <div className='relative sm:w-32 w-28 sm:h-32 h-28'>
                        <img src={avatar}
                            className="rounded-full sm:w-32 w-28 sm:h-32 h-28 object-cover absolute sm:bottom-10 bottom-20 outline-none" />

                        {edit && (
                            <div className="absolute inset-0 flex justify-center items-start">
                                <EditAvatar preImage={avatar} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full md:h-24 sm:h-20 flex justify-between items-start px-1">
                    <div>
                        <h1 className="text-xl font-bold">{fullName}</h1>
                        <h3 className="text-sm text-slate-400">@{username}</h3>
                        <div className='flex gap-1'>
                            <p className="text-xs text-slate-400">
                                {localSubscribersCount && localSubscribersCount}{" "}
                                Subscribers
                            </p>
                            <p className="text-xs text-slate-400">
                                {subsribedCount && subsribedCount}{" "}
                                Subscribed
                            </p>
                        </div>
                    </div>

                    {user == userProfile && !edit && (
                        <Link to={"/edit"}>
                            <button className='border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500'>
                                Edit
                            </button>
                        </Link>
                    )}
                    {user != userProfile && (
                        <button
                            onClick={handleSubscribe}
                            className='border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500'>
                                {localIsSubscribed ? "Subscribed" : "Subscribe"}
                        </button>
                    )}

                    {edit && (
                        <Link to={`/channel/${username}`}>
                            <button className='border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500'>
                                View Channel
                            </button>
                        </Link>
                    )}
                </div>
            </section>
        </div>
    )
}

export default ChannelHeader
