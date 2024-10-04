import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'

function NoVideosFound({text}) {
    return (
        <div className='flex flex-col pb-20 items-center justify-center text-white h-screen'>
            <FontAwesomeIcon icon={faCirclePlay} 
            size="3x"
            className='text-purple-500'
            />
            <p className='mt-4 text-lg'>There are no videos available here.</p>
            <p className="">{text && text}</p>
        </div>
    )
}

export default NoVideosFound
