import React from 'react';
import { Input, Button, Logo } from './index';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, userLogin } from '../store/Slices/authSlice.js';
import LoginSkeleton from '../skeleton/loginSkeleton.jsx';
import ImagePreview from './ImagePreview';

function SignUp() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.auth?.isLoading);

    const submit = async (data) => {
        const response = await dispatch(registerUser(data));

        if (response?.payload?.success) {
            const username = data?.username;
            const password = data?.password;
            const loginResult = await dispatch(userLogin({ username, password }));

            if (loginResult?.type === "login/fulfilled") {
                navigate("/terms&conditions");
            } else {
                navigate("/login");
            }
        }
    };

    if (loading) {
        return <LoginSkeleton />;
    }

    return (
        <>
            <div className="w-full min-h-screen flex justify-center items-center px-4 py-12 bg-dark-900">
                {/* Ambient Background Glows */}
                <div className='absolute top-[20%] right-[30%] w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] pointer-events-none'></div>
                <div className='absolute bottom-[20%] left-[30%] w-96 h-96 bg-accent-500/20 rounded-full blur-[100px] pointer-events-none'></div>
                
                <div className="relative z-10 flex w-full max-w-lg flex-col justify-center items-center border border-white/10 bg-dark-800/40 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-card">
                    <div className="flex items-center gap-2 mb-2">
                        <Logo />
                    </div>
                    <p className='text-dark-300 font-medium mb-6 text-sm text-center'>Create your YouTube account</p>
                    
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="space-y-5 w-full"
                    >
                        <div className="w-full relative h-28 bg-[#222222]">
                            <div className="w-full h-full">
                                <ImagePreview
                                    name="coverImage"
                                    control={control}
                                    className="w-full h-28 object-cover border-none border-slate-900"
                                    cameraSize="3x"
                                    showIcon={true}
                                />
                                <div className="text-sm absolute right-2 bottom-2 hover:text-purple-500 cursor-default">
                                    cover Image
                                </div>
                            </div>
                            <div className="absolute left-2 bottom-2 rounded-full border-2">
                                <ImagePreview
                                    name="avatar"
                                    control={control}
                                    className="object-cover rounded-full h-20 w-20 outline-none"
                                    showIcon={true}
                                    cameraSize="2x"
                                />
                            </div>
                        </div>
                        {errors.avatar && (
                            <div className="text-red-500">
                                {errors.avatar.message}
                            </div>
                        )}
                        <Input
                            label="Username: "
                            type="text"
                            placeholder="Enter username"
                            {...register("username", {
                                required: "username is required",
                            })}
                            className="h-8"
                        />
                        {errors.username && (
                            <span className="text-red-500">
                                {errors.username.message}
                            </span>
                        )}
                        <Input
                            label="Email: "
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: "email is required",
                            })}
                            className="h-8"
                        />
                        {errors.email && (
                            <span className="text-red-500">
                                {errors.email.message}
                            </span>
                        )}
                        <Input
                            label="Fullname: "
                            type="text"
                            placeholder="Enter fullname"
                            {...register("fullName", {
                                required: "fullName is required",
                            })}
                            className="h-8"
                        />
                        {errors.fullName && (
                            <span className="text-red-500">
                                {errors.fullName.message}
                            </span>
                        )}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: "password is required",
                            })}
                            className="h-8"
                        />
                        {errors.password && (
                            <span className="text-red-500">
                                {errors.password.message}
                            </span>
                        )}

                        <Button
                            type="submit"
                            bgColor="bg-purple-500"
                            className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
                        >
                            Signup
                        </Button>

                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                to={"/login"}
                                className="text-purple-600 cursor-pointer hover:opacity-70"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
