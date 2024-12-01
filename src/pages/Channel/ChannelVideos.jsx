import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NoVideosFound, VideoList } from '../../components'
import { getAllVideos, makeVideosNull } from '../../store/Slices/videoSlice'

function ChannelVideos() {

    const dispatch = useDispatch()
    const videos = useSelector(state => state.video?.videos?.docs)
    const userId = useSelector(state => state.user?.profileData?._id)
    const [searchParams, setSearchParams] = useState();
    const [activeButton, setActiveButton] = useState('latest')

    useEffect(() => {
        const sortBy = searchParams?.sortBy;
        const sortType = searchParams?.sortType;
        dispatch(getAllVideos({ userId, sortBy, sortType }))

        return () => dispatch(makeVideosNull())
    }, [userId, dispatch, searchParams])

    if (videos?.length === 0) {
        return <NoVideosFound />
    }

    const handleSort = (sortBy, sortType = "asc", buttonType) => {
        setSearchParams({ sortBy, sortType })
        setActiveButton(buttonType)
    }

    return (
        <>
            {/* For sorting latest, popular and oldest videos */}
            <div className="w-full p-2 text-white flex gap-4">
                <button
                    onClick={() => {
                        handleSort("createdAt", "desc", "latest");
                    }}
                    className={`group py-1 px-2 rounded-md ${activeButton === "latest"
                            ? "bg-purple-500"
                            : "bg-[#222222]"
                        }`}
                >
                    Latest
                </button>
                <button
                    onClick={() => {
                        handleSort("views", "desc", "popular");
                    }}
                    className={`group py-1 px-2 rounded-md ${activeButton === "popular"
                            ? "bg-purple-500"
                            : "bg-[#222222]"
                        }`}
                >
                    Popluar
                </button>
                <button
                    onClick={() => {
                        handleSort("createdAt", "asc", "oldest");
                    }}
                    className={`group py-1 px-2 rounded-md ${activeButton === "oldest"
                            ? "bg-purple-500"
                            : "bg-[#222222]"
                        }`}
                >
                    Oldest
                </button>
            </div>
            {/* Video listing */}
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 text-white">
                {videos?.map((video) => (
                    <VideoList
                        key={video._id}
                        avatar={video.avatar?.url}
                        duration={video.duration}
                        title={video.title}
                        thumbnail={video.thumbnail?.url}
                        createdAt={video.createdAt}
                        views={video.views}
                        videoId={video._id}
                    />
                ))}
            </div>
        </>
    )
}

export default ChannelVideos
