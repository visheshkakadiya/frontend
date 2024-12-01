import React, { useEffect } from 'react'
import { TweetsList, TweetAndComment } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getUserTweets } from '../../store/Slices/tweetSlice'

function ChannelTweets() {
    const dispatch = useDispatch()
    const authId = useSelector((state) => state.auth.user?._id)
    const userId = useSelector((state) => state.user.profileData?._id)
    const tweets = useSelector((state) => state.tweet?.tweets);

    useEffect(() => {
        if (userId) {
            dispatch(getUserTweets(userId))
        }
    }, [dispatch, userId])

    return (
        <>
            {authId === userId && <TweetAndComment tweet={true} />}

            {tweets?.map((tweet) => (
                <TweetsList
                    key={tweet?._id}
                    avatar={tweet?.ownerDetails?.avatar?.url}
                    content={tweet?.content}
                    createdAt={tweet?.createdAt}
                    likesCount={tweet?.likesCount}
                    tweetId={tweet?._id}
                    username={tweet?.ownerDetails?.username}
                    isLiked={tweet?.isLiked}
                />
            ))}
        </>
    )
}

export default ChannelTweets
