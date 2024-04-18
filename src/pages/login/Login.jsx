import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DCLogo from '@assets/drone-center-logo.png';
import { cn } from '@lib/utils';
import DRONE_VIDEO from '@assets/drone-video.mp4';
import withSplashScreen from '@components/SplashScreen';

const initialValues = {
    email: '',
    password: '',
};

const Login = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Start playing the video when the component mounts
        videoRef.current.play().catch(error => {
            // Autoplay was prevented
            console.log('Autoplay was prevented:', error);
        });
    }, []);

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
    } = useFormik({
        initialValues,
        validationSchema: Yup.object({
            email: Yup.string().email().required('Please enter your email'),
            password: Yup.string()
                .min(6)
                .required('Please enter your password'),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
                resetForm();
            }, 4000);
        },
    });

    return (
        <>
            <video
                ref={videoRef}
                className="absolute backdrop-blur-md rounded-lg -z-10 object-cover h-screen w-screen"
                autoPlay
                muted
                loop
            >
                <source src={DRONE_VIDEO} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="flex h-screen w-screen items-center justify-center bg-slate-600/65">
                <div className="flex min-w-[300px] flex-col rounded-2xl border-2 border-slate-100 p-5 md:p-10 shadow-lg bg-white m-5">
                    <img
                        src={DCLogo}
                        alt="drone center"
                        className="w-[200px] md:w-[300px] mx-auto"
                    />
                    <div className="my-3">
                        <h3 className="font-bold text-gray-500">
                            Welcome to Drone Center
                        </h3>
                        <p className="text-sm text-gray-400">
                            Please sign-in to your account and start the
                            adventure
                        </p>
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-1">
                                <div className="text-[12px] font-medium text-gray-600">
                                    EMAIL OR USERNAME
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your email or username"
                                    className={cn(
                                        'w-full rounded-md p-2 text-sm border border-gray-200 text-black focus:outline-none focus:ring-[#6db474]/40 focus:ring-1',
                                        {
                                            'border-red-300 focus:ring-0':
                                                errors.email && touched.email,
                                        }
                                    )}
                                    name="email"
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email && touched.email ? (
                                    <p className="form-error text-red-500 text-[12px] font-bold m-0">
                                        {errors.email}
                                    </p>
                                ) : (
                                    <p className="text-[12px] font-bold m-0">
                                        &nbsp;
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-[12px] font-medium text-gray-600 mt-1">
                                    PASSWORD
                                </div>
                                <input
                                    type="password"
                                    placeholder="Enter your email or username"
                                    className={cn(
                                        'w-full rounded-md p-2 text-sm border border-gray-200 text-black focus:outline-none focus:ring-[#6db474]/40 focus:ring-1',
                                        {
                                            'border-red-300 focus:ring-0':
                                                errors.password &&
                                                touched.password,
                                        }
                                    )}
                                    name="password"
                                    id="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password ? (
                                    <p className="form-error text-red-500 text-[12px] font-bold m-0">
                                        {errors.password}
                                    </p>
                                ) : (
                                    <p className="text-[12px] font-bold m-0">
                                        &nbsp;
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className={cn(
                                    'rounded-lg bg-[#6db474] py-2 font-medium text-white mt-3 active:scale-95 w-full disabled:bg-gray-500',
                                    { 'cursor-wait': isSubmitting }
                                )}
                                disabled={isSubmitting}
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default withSplashScreen(Login);
