import React, { useEffect } from 'react'
import { ChannelHeader, ChannelNavigate } from '../../components/'
import { useDispatch, useSelector } from 'react-redux'
import { userChannelProfile } from '../../store/Slices/userSlice.js'
import { Outlet, useParams } from 'react-router-dom'

function Channel() {

    const dispatch = useDispatch();
    const { username } = useParams();

    const channel = useSelector((state) => state.user?.profileData)

    useEffect(() => {
        dispatch(userChannelProfile(username))
    }, [dispatch, username]);

    return (
        <>
            {channel && (
                <ChannelHeader
                    username={username}
                    coverImage={channel?.coverImage.url}
                    avatar={channel?.avatar.url}
                    subsribedCount={channel?.channelsSubscribedToCount}
                    fullName={channel?.fullName}
                    subscribersCount={channel?.subcribersCount}
                    isSubscribed={channel?.isSubscribed}
                    channelId={channel?._id}
                />
            )}

            <ChannelNavigate username={username} />
            <div className="h-[32rem] sm:h-96 mb-20 sm:mb-0">
                <Outlet />
            </div>
        </>
    )
}

export default Channel
