import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InfiniteScroll, Container, VideoList } from '../components'
import { getAllVideos, makeVideosNull } from '../store/Slices/videoSlice'
import HomeSkeleton from '../skeleton/HomeSkeleton'

function HomePage() {

    const dispatch = useDispatch()
    const loading = useSelector((state) => state.video?.loading)
    const videos = useSelector((state) => state.video?.videos?.docs)
    const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage)

    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(getAllVideos({ page: 1, limit: 10 }))

        return () => dispatch(makeVideosNull())
    }, [dispatch])

    const fetchMoreVideos = useCallback(() => {
        if (hasNextPage) {
            dispatch(getAllVideos({ page: page + 1 }))
            setPage(page + 1)
        }
    }, [dispatch, page, hasNextPage])

    if(loading){
        return <HomeSkeleton />
    }

    return (
        <>
            <Container>
                <InfiniteScroll
                    fetchMore={fetchMoreVideos}
                    hasNextPage={hasNextPage}
                >
                    <div className="text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1" style={{ overflow: 'overlay' }}>
                        {videos?.map((video) => (
                            <VideoList
                                key={video._id}
                                avatar={video.ownerDetails?.avatar.url}
                                duration={video.duration}
                                title={video.title}
                                thumbnail={video.thumbnail?.url}
                                createdAt={video.createdAt}
                                views={video.views}
                                channelName={video.ownerDetails?.username}
                                videoId={video._id}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </Container>
        </>
    )
}

export default HomePage
