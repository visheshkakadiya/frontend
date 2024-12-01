import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import ImagePreview from './ImagePreview'
import { useForm } from 'react-hook-form'
import { updateUserAvatar, updateUserCoverImage } from '../store/Slices/authSlice'
import { faCloudArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons'

function EditAvatar({ cover, preImage }) {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const { control, handleSubmit, formState: { errors } } = useForm()

    const upload = async (data) => {
        setIsOpen(false);
        const formData = new FormData();

        // Use the correct field based on whether we're uploading cover or avatar
        if (cover) {
            formData.append("coverImage", data.coverImage[0]);
        } else {
            formData.append("avatar", data.avatar[0]);
        }

        if (data) {
            if (cover) {
                dispatch(updateUserCoverImage(formData));
            } else {
                dispatch(updateUserAvatar(formData));
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(upload)} className="relative">
                {/* Popup */}
                <FontAwesomeIcon icon={faCloudArrowUp}
                    className='hover:text-gray-200 text-black rounded-md bg-white opacity-80 hover:opacity-100 p-1 cursor-pointer'
                    onClick={() => setIsOpen((prev) => !prev)} />

                {isOpen && (
                    <div className='fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70'>
                        <div className='bg-black p-8 relative border shadow-lg w-full max-w-md'>
                            {/* Close button */}
                            <button className='absolute top-5 right-5 text-white hover:text-gray-200'
                                onClick={() => setIsOpen((prev) => !prev)}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>

                            {/*content*/}
                            <h2 className='text-lg font-bold text-white mb-4'>
                                Change {cover ? "Cover Image" : "Profile"} Picture
                            </h2>
                            <div>
                                <ImagePreview
                                    name={cover ? "coverImage" : "avatar"}
                                    control={control}
                                    preImage={preImage}
                                    showIcon={true}
                                    cover={cover}
                                    className={"w-full h-full object-contain min-h-20 max-h-60 bg-[#222222]"}
                                    image={preImage} />

                                <button className='text-white bg-purple-500 rounded w-full py-2 mt-4'>
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </>
    )
}

export default EditAvatar
