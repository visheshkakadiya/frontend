import React from 'react'
import Navbar from './components/Header/Navbar'
import Sidebar from './components/Header/Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <Navbar />
            <div className="sm:flex flex-none">
                <div className="">
                    <Sidebar />
                </div>
                <div className="sm:flex-1">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout
