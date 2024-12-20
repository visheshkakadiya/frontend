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
        <div className='w-full  text-white p-3 flex justify-center items-start'>
            <div className='flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20'>
                <div className='flex items-center gap-2 mt-5 '>
                    <Logo />
                </div>

                <form
                    className='space-y-5 p-2'
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
