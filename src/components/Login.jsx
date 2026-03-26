import React from 'react'
import { Logo, Button, Input } from './index';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin, getCurrentUser } from '../store/Slices/authSlice';
import LoginSkeleton from '../skeleton/loginSkeleton';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Login() {

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch()
    const loading = useSelector((state) => state.auth?.isLoading)
    const navigate = useNavigate();

    const submit = async (data) => {
        const isEmail = data.username.includes("@");
        const loginData = isEmail
            ? { email: data.username, password: data.password }
            : data;

        const response = await dispatch(userLogin(loginData));
        const user = await dispatch(getCurrentUser());
        if (user && response?.payload) {
            navigate("/");
        }
    };

    if (loading) {
        return <LoginSkeleton />
    }

    return (
        <div className='w-full min-h-screen flex justify-center items-center px-4 py-12 bg-dark-900'>
            {/* Ambient Background Glows */}
            <div className='absolute top-[20%] left-[30%] w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] pointer-events-none'></div>
            <div className='absolute bottom-[20%] right-[30%] w-96 h-96 bg-secondary-500/20 rounded-full blur-[100px] pointer-events-none'></div>
            
            <div className='relative z-10 flex w-full max-w-md flex-col justify-center items-center border border-white/10 bg-dark-800/40 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-card'>
                <div className='flex items-center gap-2 mb-2'>
                    <Logo />
                </div>
                <p className='text-dark-300 font-medium mb-6 text-sm text-center'>Sign in to continue to YouTube</p>

                <form
                    className='space-y-5 w-full'
                    onSubmit={handleSubmit(submit)}>

                    <Input
                        label="Username / email : "
                        type="text"
                        placeholder="example@gmail.com"
                        {...register("username", {
                            required: "username/email is required",
                        })}
                    />
                    {errors.username && (
                        <span className="text-red-500">
                            {errors.username.message}
                        </span>
                    )}
                    <Input
                        label="Password: "
                        type="password"
                        placeholder="1kd074fjw0"
                        {...register("password", {
                            required: "password is required",
                        })}
                    />
                    {errors.password && (
                        <span>{errors.password.message}</span>
                    )}

                    <Button
                        type="submit"
                        bgColor="bg-purple-500"
                        className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
                    >
                        Login
                    </Button>

                    <p className="text-center text-sm text-white">
                        Don't have an account?{" "}
                        <Link
                            to={"/signup"}
                            className="text-purple-600 cursor-pointer hover:opacity-70"
                        >
                            SignUp
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
