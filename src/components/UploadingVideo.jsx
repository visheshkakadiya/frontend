import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Button } from './index'
import { updateUploadStatus } from '../store/Slices/videoSlice'
import { faFilm, faCheck } from '@fortawesome/free-solid-svg-icons'

function UploadingVideo({
    videoFileName,
    setVideoPopUp,
    fileSize,
    uploaded,
}) {

    const dispatch = useDispatch();

    const handleCancelAndFinish = () => {
        setVideoPopUp((prev) => ({
            ...prev,
            uploadVideo: false,
        }))
        dispatch(updateUploadStatus())
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
            <div className="w-96 p-3 text-white border outline-none rounded-lg space-y-5 border-slate-700 bg-black">
                <div className="flex items-start justify-between">
                    <div>
                        {uploaded ? (
                            <h1 className='text-lg font-bold'>
                                Uploaded Video
                            </h1>
                        ) : (
                            <h1 className='text-lg font-bold'>
                                Uploading Video...
                            </h1>
                        )}
                        <span className="text-xs text-slate-400">
                            Track your video uploading process.
                        </span>
                    </div>

                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className='cursor-pointer'
                        onClick={handleCancelAndFinish}
                    />
                </div>
                <div className="border flex justify-start items-center p-1">
                    <div className='mr-2'>
                        <FontAwesomeIcon
                            icon={faFilm}
                            className='text-purple-500'
                        />
                    </div>
                    <div>
                        <h1 className='text-sm font-bold'>
                            {videoFileName}
                        </h1>
                        <p className='text-xs'>{fileSize} MB</p>
                        <div className="flex gap-2 items-center mt-2">
                            {uploaded ? (
                                <>
                                    <span className="text-xs flex items-center">
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="text-green-500"
                                        />
                                        Uploaded Successfully
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Spinner />
                                    <span className="text-xs">
                                        Loading ...
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        className="border flex-1 p-2"
                        onClick={handleCancelAndFinish}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 bg-purple-500 p-2"
                        textColor="text-black"
                        onClick={handleCancelAndFinish}
                    >
                        Finish
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UploadingVideo
