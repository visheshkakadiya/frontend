import React, { useState } from 'react'
import { Search, Button, Logo, SearchforSmallScreen } from '../index.js'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { userLogout } from '../../store/Slices/authSlice.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faVideo, faMagnifyingGlass, faBars, faArrowRightFromBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [OpenSearch, setOpenSearch] = useState(false)

    const authStatus = useSelector((state) => state.auth?.status)
    const username = useSelector((state) => state.auth?.user?.username)
    const avatar = useSelector((state) => state.auth?.user?.avatar?.url)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = async () => {
        await dispatch(userLogout())
        navigate('/')
    }

    const sidePanelItems = [
        {
            icon: <FontAwesomeIcon icon={faThumbsUp} />,
            title: "Liked Videos",
            url: "/liked-videos",
        },
        {
            icon: <FontAwesomeIcon icon={faVideo} />,
            title: "My Content",
            url: `/channel/${username}`
        }
    ];

    return (
        <>
            <nav className='w-full bg-[#0E0F0F] flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50'>
                <div className='flex items-center justify-center gap-2 cursor-pointer'>
                    <Logo />
                </div>

                {/* search for large screens */}
                <div className='w-full sm:w-1/3 hidden sm:block'>
                    <Search />
                </div>

                {/* search for small screens */}
                <div className='text-white w-full inline-flex justify-end sm:hidden pr-4'>
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        onClick={() => setOpenSearch((prev) => !prev)} />
                    {OpenSearch && (
                        <SearchforSmallScreen
                            open={open}
                            setOpenSearch={setOpenSearch} />
                    )}
                </div>

                {/* login and signup butons for larger screens */}
                {authStatus ? (
                    <div>
                        <img src={avatar}
                            alt='Profile-Img'
                            className='rounded-full w-10 h-10 object-cover' />
                    </div>
                ) : (
                    <div className='space-x-2 sm:block hidden'>
                        <Link to={"/login"}>
                            <Button className="bg-[#222222] border hover:bg-black border-slate-500 sm:px-4 sm:py-2 p-2 ">
                                Login
                            </Button>
                        </Link>
                        <Link to={"/signup"}>
                            <Button className="font-semibold border hover:bg-[#222222] border-slate-500 sm:px-4 sm:py-2">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                )}

                {/* hamburger for smaller screens */}
                <div className='block sm:hidden'>
                    <div className='text-white'>
                        <FontAwesomeIcon icon={faBars} size='1x'
                            onClick={() => setToggleMenu((prev) => !prev)} />
                    </div>
                </div>

                {/* Side bar for smaller screens */}
                {toggleMenu && (
                    <div className='fixed right-0 top-0 text-white flex flex-col border-l h-screen w-[70%] bg-[#0F0F0F] sm:hidden rounded-lg outline-none'>
                        <div className='w-full border-b h-20 flex items-center mb-2 justify-between px-3'>
                            <div className='flex items-center gap-2'>
                                <Logo />
                            </div>
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className='text-white '
                                onClick={() => setToggleMenu((prev) => !prev)}
                                size='1x' />
                        </div>

                        <div>
                            <div>
                                {sidePanelItems.map((item) => (
                                    <NavLink
                                        to={item.url}
                                        key={item.title}
                                        className={({ isActive }) => isActive ? 'text-purple-500' : 'text-white'}
                                        onClick={() => setToggleMenu((prev) => !prev)}
                                    >
                                        <div className='flex items-center gap-2 p-2 m-3 border border-slate-500'>
                                            <div>{item.icon}</div>
                                            <span className='text-lg'>
                                                {item.title}
                                            </span>
                                        </div>
                                    </NavLink>
                                ))}
                            </div>

                            <div className='flex flex-col justify-between min-h-[63vh]'>
                                {!authStatus ? (
                                    <div className="flex flex-col space-y-5 mb-3 mt-auto">
                                        <Link to={"/login"}>
                                            <Button className="w-full bg-[#222222] border hover:bg-white hover:text-black border-slate-500 py-1 px-3">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link to={"/signup"}>
                                            <Button className=" w-full font-semibold border border-slate-500 hover:bg-white hover:text-black py-1 px-3">
                                                Sign up
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div
                                        className="flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border border-slate-600 mt-[550px]"
                                        onClick={() => logout()}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faRightFromBracket}
                                        />
                                        <span className="text-base">Logout</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar
