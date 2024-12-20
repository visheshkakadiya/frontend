import React from 'react'
import { Button, Logo } from "./index.js"
import { Link } from 'react-router-dom'

function LoginPopup() {
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50'>
            <div className='bg-black border border-slate-800 rounded-lg p-5 text-white text-center'>
                <div className='flex flex-col gap-2 mb-5 items-center'>
                    <Logo />
                </div>
                <p className='text-xl mb-5'>
                    Login or Signup to continue
                </p>
                <Link to="/login">
                    <Button
                        className="bg-purple-500 rounded text-lg w-full py-2 px-4 font-bold"
                        textColor="text-black"
                    >
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default LoginPopup
