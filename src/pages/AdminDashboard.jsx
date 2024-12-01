import React, { useEffect, useState } from 'react'
import {
    HeaderSection,
    StatsSection,
    VideoTable,
    EditVideo,
    DeleteConfirmation,
    UploadVideo,
    Container,
    Navbar,
    Spinner
} from '../components'
import { useDispatch, useSelector } from 'react-redux'
import {getChannelStats, getChannelVideos} from '../store/Slices/dashboard.js'
import { deleteAVideo } from '../store/Slices/videoSlice.js'

function AdminDashboard() {

    const dispatch = useDispatch()
    const username = useSelector((state) => state.auth.user?.username)
    const dashboard = useSelector((state) => state.dashboard.channelStats)
    const videos = useSelector((state) => state.dashboard.channelVideos)
    const deleting = useSelector((state) => state.video.loading)
    const uploaded = useSelector((state) => state.video.uploaded)
    const publishToggled = useSelector((state) => state.video.publishToggled);

    const [videoDetails, setVideoDetails] = useState(null)
    const [popUp, setPopUp] = useState({
        uploadVideo: false,
        deleteVideo: false,
        editVideo: false,
    })

    const handleDeleteVideo = async () => {
        dispatch(deleteAVideo(videoDetails?._id))
        setPopUp((prev) => ({
            ...prev,
            deleteVideo: !prev.deleteVideo,
        }));
    }

    useEffect(() => {
        dispatch(getChannelStats())
    }, [dispatch])

    useEffect(() => {
        dispatch(getChannelVideos())
    }, [dispatch, deleting, uploaded, publishToggled])

    window.scrollTo(0, 0);

    return (
        <>
            <Navbar />
            <Container>
                <div className=" w-full relative h-screen text-white space-y-5 z-10 py-4 px-1">

                    {/* uploadVideoPopup */}
                    {popUp.uploadVideo && (
                        <UploadVideo setUploadVideoPopUp={setPopUp} />
                    )}

                    {/* editVideoPopup */}
                    {popUp.editVideo && (
                        <div className='w-full flex justify-center top-24 fixed z-20'>
                            <EditVideo
                                videoId={videoDetails?._id}
                                title={videoDetails?.title}
                                description={videoDetails?.description}
                                setEditVideoPopup={setPopUp}
                                thumbnail={videoDetails?.thumbnail?.url}
                            />
                        </div>
                    )}

                    {/* deleteVideoPopup */}
                    {popUp.deleteVideo && (
                        <div className="w-full fixed top-52 flex justify-center z-20">
                            <DeleteConfirmation
                                video={true}
                                onCancel={() => 
                                    setPopUp((prev) => ({
                                        ...prev,
                                        deleteVideo: !prev.deleteVideo,
                                    }))
                                }
                                onDelete={handleDeleteVideo}
                            />
                        </div>
                    )}

                    {/* Dashboard Header */}
                    <HeaderSection
                        username={username}
                        setPopUp={setPopUp}
                    />

                    {/* channel stats section */}
                    <StatsSection
                        dashboard={dashboard}
                    />

                    {/* Video Table */}
                    <VideoTable
                        videos={videos}
                        setPopUp={setPopUp}
                        setVideoDetails={setVideoDetails}
                    />
                </div>
            </Container>
        </>
    )
}

export default AdminDashboard
