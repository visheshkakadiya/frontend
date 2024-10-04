import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faEye, faCircleUser, faHeart } from '@fortawesome/free-regular-svg-icons'

function StatsSection({dashboard}) {
    return (
        <>
            <section className='grid sm:grid-cols-4 grid-cols-2 justify-evenly items-center gap-2 text-white'>
                <div className='border border-slate-500 sm:p-3 p-2'>
                    <FontAwesomeIcon
                        icon={faCirclePlay}
                        className='text-4xl text-purple-500'
                    />
                    <p>Totoal Videos</p>
                    <span className="font-bold text-2xl">
                        {dashboard?.totalVideos}
                    </span>
                </div>
                <div className='border border-slate-500 sm:p-3 p-2'>
                    <FontAwesomeIcon
                        icon={faEye}
                        className='text-4xl text-purple-500'
                    />
                    <p>Total Views</p>
                    <span className="font-bold text-2xl">
                        {dashboard?.totalViews}
                    </span>
                </div>
                <div className='border border-slate-500 sm:p-3 p-2'>
                    <FontAwesomeIcon
                        icon={faCircleUser}
                        className='text-4xl text-purple-500'
                    />
                    <p>Total Subscribers</p>
                    <span className="font-bold text-2xl">
                        {dashboard?.totalSubscribers}
                    </span>
                </div>
                <div className='border border-slate-500 sm:p-3 p-2'>
                    <FontAwesomeIcon
                        icon={faHeart}
                        className='text-4xl text-purple-500'
                    />
                    <p>Total Likes</p>
                    <span className="font-bold text-2xl">
                        {dashboard?.totalLikes}
                    </span>
                </div>
            </section>
        </>
    )
}

export default StatsSection
