import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleCommentLike, toggleTweetLike, toggleVideoLike } from '../store/Slices/likeSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'

function Like({
    isLiked,
    likesCount = 0,
    tweetId,
    videoId,
    commentId,
    size,
}) {

    const dispatch = useDispatch()
    const [localIsLiked, setLocalIsLiked] = useState(isLiked)
    const [localLikesCount, setLocalLikesCount] = useState(likesCount);

    const handleToggle = () => {
        if(localIsLiked){
            setLocalLikesCount((prev) => prev - 1)
        } else {
            setLocalLikesCount((prev) => prev + 1)
        }

        setLocalIsLiked((prev) => !prev)

        if(tweetId){
            dispatch(toggleTweetLike(tweetId))
        }

        if(videoId){
            dispatch(toggleVideoLike(videoId))
        }

        if(commentId){
            dispatch(toggleCommentLike(commentId))
        }
    }

    useEffect(() => {
        setLocalIsLiked(isLiked)
        setLocalLikesCount(likesCount)
    }, [isLiked, likesCount])

    return (
        <div className="flex items-center gap-1">
            <FontAwesomeIcon
                icon={faThumbsUp}
                size={size}
                className={`cursor-pointer ${
                    localIsLiked ? "text-purple-500" : ""
                }`}
                onClick={handleToggle}
            />
            <span className="text-xs mr-3">{localLikesCount}</span>
            <FontAwesomeIcon
                icon={faThumbsDown}
                size='1x'
            />
        </div>
    )
}

export default Like
