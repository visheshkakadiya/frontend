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
                <div className='text-white lg:w-64 md:w-56 w-20 p-3 lg:px-4 border-white/5 border-r h-screen flex flex-col justify-between bg-dark-900/50 backdrop-blur-sm'>
                    <div className='flex flex-col gap-3 mt-5'>
                        {sidebarTopItems.map((item) => (
                            <NavLink
                                to={item.url}
                                key={item.title}
                                className={({ isActive }) => isActive ? "text-white" : "text-dark-300"}
                            >
                                <div className={`flex items-center gap-3 justify-center sm:justify-start py-3 px-4 rounded-xl border border-transparent transition-all duration-300 ease-smooth 
                                    ${window.location.pathname === item.url ? 'bg-primary-500/20 text-primary-400 border-primary-500/30 shadow-glow' : 'hover:bg-white/5 hover:text-white hover:border-white/10'}`}>
                                    <div className='text-lg'>{item.icon}</div>
                                    <span className='text-base font-medium hidden md:block'>
                                        {item.title}
                                    </span>
                                </div>
                            </NavLink>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2'>
                        {username && (
                            <div className='flex items-center gap-3 justify-center sm:justify-start hover:bg-red-500/10 hover:text-red-400 cursor-pointer py-3 px-4 rounded-xl border border-transparent hover:border-red-500/30 transition-all duration-300'
                            onClick={logout}>
                                <div className='text-lg'><FontAwesomeIcon icon={faRightFromBracket} className='text-current'/></div>
                                <span className='text-base font-medium hidden md:block'>Logout</span>
                            </div>
                        )}
                        <div className='flex items-center gap-3 justify-center sm:justify-start hover:bg-white/5 hover:text-white text-dark-300 cursor-pointer py-3 px-4 rounded-xl border border-transparent hover:border-white/10 transition-all duration-300'>
                            <div className='text-lg'><FontAwesomeIcon icon={faGear} className='text-current'/></div>
                            <span className='text-base font-medium hidden md:block'>Settings</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* for mobile sidebar is bottom bar*/}
            <div className='border-t border-white/10 text-white h-16 sm:hidden z-20 p-1 w-full flex justify-around fixed bottom-0 bg-dark-900/90 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]'>
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
