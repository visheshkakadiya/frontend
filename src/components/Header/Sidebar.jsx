import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../store/Slices/authSlice.js';
import { useNavigate, NavLink } from 'react-router-dom';
import { faHouse, faClockRotateLeft, faVideo, faUserCheck, faRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faFolder } from '@fortawesome/free-regular-svg-icons';


function Sidebar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const username = useSelector((state) => state.auth?.user?.username)

    const sidebarTopItems = [
        {
            icon: <FontAwesomeIcon icon={faHouse} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <FontAwesomeIcon icon={faThumbsUp} />,
            title: "Liked Videos",
            url: "/liked-videos",
        },
        {
            icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
            title: "History",
            url: "/history",
        },
        {
            icon: <FontAwesomeIcon icon={faVideo} />,
            title: "My Content",
            url: `/channel/${username}`
        },
        {
            icon: <FontAwesomeIcon icon={faFolder} />,
            title: "Collections",
            url: "/collections",
        },
        {
            icon: <FontAwesomeIcon icon={faUserCheck} />,
            title: "Subscriptions",
            url: "/subscriptions",
        }
    ]

    const BottomBarsItems = [
        {
            icon: <FontAwesomeIcon icon={faHouse} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
            title: "History",
            url: "/history",
        },
        {
            icon: <FontAwesomeIcon icon={faFolder} />,
            title: "Collections",
            url: "/collections",
        },
        {
            icon: <FontAwesomeIcon icon={faUserCheck} />,
            title: "Subscriptions",
            url: "/subscriptions",
        }
    ]

    const logout = async () => {
        await dispatch(userLogout())
        navigate('/')
    }

    return (
        <>
            <div className='sm:block hidden'>
                <div className='text-white lg:w-56 md:w-44 w-16 sm:p-3 p-2 border-slate-600 border-r h-screen flex flex-col justify-between'>
                    <div className='flex flex-col gap-3 mt-5'>
                        {sidebarTopItems.map((item) => (
                            <NavLink
                                to={item.url}
                                key={item.title}
                                className={({ isActive }) => isActive ? "bg-purple-500" : " "}
                            >
                                <div className='flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600'>
                                    {item.icon}
                                    <span className='text-base hidden md:block'>
                                        {item.title}
                                    </span>
                                </div>
                            </NavLink>
                        ))}
                    </div>

                    <div>
                        {username && (
                            <div className='flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600'
                            onClick={logout}>
                                <FontAwesomeIcon icon={faRightFromBracket} className='text-white'/>
                                <span className='text-base hidden md:block'>Logout</span>
                            </div>
                        )}
                        <div className='flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600'>
                            <FontAwesomeIcon icon={faGear} className='text-white'/>
                            <span className='text-base hidden md:block'>Settings</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* for mobile sidebar is bottom bar*/}
            <div className='border-t-2 text-white h-16 sm:hidden z-20 p-1 w-full flex justify-around fixed bottom-0 bg-[#0E0F0F]'>
                {BottomBarsItems.map((item) => (
                    <NavLink
                        to={item.url}
                        key={item.title}
                        className={({ isActive }) => isActive ? "text-purple-500" : " "}
                    >
                        <div className='flex flex-col items-center gap-1 cursor-pointer p-1'>
                            {item.icon}
                            <span className='text-sm'>{item.title}</span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    )
}

export default Sidebar
