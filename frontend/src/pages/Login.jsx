import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { GoogleLogin } from '@react-oauth/google';
import { login, reset, googleLogin as googleLoginAction } from '../features/auth/authSlice';

const Login = () => {
    const { register: registerForm, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const emailValue = watch('email');

    useEffect(() => {
        if (isError) {
            toast.error(message);
            if (message === 'Please verify your email before logging in') {
                navigate('/register', { state: { verifyEmail: true, email: emailValue } });
            }
        }

        if (isSuccess || user) {
            navigate('/dashboard');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = (data) => {
        // Save email in case they need to verify
        dispatch({ type: 'auth/setRegisteredEmail', payload: data.email });
        dispatch(login(data));
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 fade-in bg-void editorial-grid">
            <div className="max-w-lg w-full space-y-6 bg-surface p-8 border border-faint">
                <div className="text-center">
                    <div className="mx-auto w-10 h-10 border border-structure flex items-center justify-center mb-5">
                        <FiLock className="w-4 h-4 text-accent" />
                    </div>
                    <span className="block font-ui text-xs uppercase tracking-widest text-muted mb-2">
                        Authentication
                    </span>
                    <h2 className="font-display text-3xl text-bone mb-2">
                        Welcome back
                    </h2>
                    <p className="text-sm text-muted">
                        Please enter your details to sign in.
                    </p>
                </div>

                    <div className="mt-6">
                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-2">
                                <div>
                                    <Input
                                        id="email"
                                        type="email"
                                        label="Email"
                                        icon={<FiMail />}
                                        placeholder="Enter your email"
                                        error={errors.email?.message}
                                        {...registerForm("email", { 
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        autoComplete="email"
                                    />
                                </div>
                                
                                <div>
                                    <Input
                                        id="password"
                                        type="password"
                                        label="Password"
                                        icon={<FiLock />}
                                        placeholder="••••••••"
                                        error={errors.password?.message}
                                        {...registerForm("password", { 
                                            required: "Password is required" 
                                        })}
                                        autoComplete="current-password"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-accent focus:ring-accent border-faint rounded-none bg-transparent"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block font-ui text-xs uppercase tracking-widest text-muted">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link to="/forgot-password" className="font-ui text-xs uppercase tracking-widest text-accent hover:text-accent-secondary transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" isLoading={isLoading}>
                                    Sign in <FiArrowRight className="ml-2" />
                                </Button>
                            </div>
                        </form>
                        
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-faint"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-surface font-ui text-[10px] uppercase tracking-widest text-muted">
                                        Or
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex justify-center w-full">
                                    <GoogleLogin
                                        onSuccess={credentialResponse => {
                                            dispatch(googleLoginAction(credentialResponse.credential));
                                        }}
                                        onError={() => {
                                            toast.error('Google Login Failed');
                                        }}
                                        theme="filled_black"
                                        text="continue_with"
                                    />
                                </div>
                                <Link to="/register" className="w-full flex justify-center items-center py-2.5 px-4 border border-faint font-ui text-xs uppercase tracking-widest text-bone hover:bg-surface transition-colors">
                                    Create new account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Login;
