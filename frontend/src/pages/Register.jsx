import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiUser, FiUserPlus, FiCheckCircle } from 'react-icons/fi';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { GoogleLogin } from '@react-oauth/google';
import { register as registerUserAction, verifyEmail, reset, googleLogin as googleLoginAction } from '../features/auth/authSlice';
import axiosInstance from '../utils/axios';

const Register = () => {
    const { register: registerForm, handleSubmit, watch, formState: { errors } } = useForm();
    const { register: registerOTP, handleSubmit: handleOTPSubmit, formState: { errors: otpErrors } } = useForm();
    
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [showOTPForm, setShowOTPForm] = useState(location.state?.verifyEmail ? true : false);
    const [resendLoading, setResendLoading] = useState(false);

    const { user, isLoading, isError, isSuccess, message, registeredEmail } = useSelector(
        (state) => state.auth
    );

    // Get the email either from Redux state (if just registered) or location state (if redirected from login)
    const activeEmail = registeredEmail || location.state?.email || watch("email");

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess && !user && !showOTPForm) {
            // Registration successful but user is not logged in (OTP sent)
            toast.success(message || 'Check your email for OTP');
            setShowOTPForm(true);
        } else if ((isSuccess && user) || user) {
            if (showOTPForm) toast.success('Email verified successfully!');
            navigate('/dashboard');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch, showOTPForm]);

    const onSubmitRegister = (data) => {
        const { name, email, password } = data;
        dispatch({ type: 'auth/setRegisteredEmail', payload: email });
        dispatch(registerUserAction({ name, email, password }));
    };

    const onSubmitOTP = (data) => {
        dispatch(verifyEmail({ email: activeEmail, otp: data.otp }));
    };

    const handleResendOTP = async () => {
        if (!activeEmail) return;
        setResendLoading(true);
        try {
            const response = await axiosInstance.post('/api/auth/resend-otp', { email: activeEmail });
            toast.success(response.data.message || 'New OTP sent to your email');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setResendLoading(false);
        }
    };

    const password = watch("password");

    return (
        <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 fade-in bg-void editorial-grid">
            <div className="max-w-lg w-full space-y-4 bg-surface p-6 border border-faint">
                <div className="text-center">
                    <div className="mx-auto w-8 h-8 border border-structure flex items-center justify-center mb-3">
                        <FiUserPlus className="w-4 h-4 text-accent" />
                    </div>
                    <span className="block font-ui text-[10px] uppercase tracking-widest text-muted mb-1">
                        Registration
                    </span>
                    <h2 className="font-display text-2xl text-bone mb-1">
                        Create Account
                    </h2>
                    <p className="text-xs text-muted">
                        {showOTPForm ? `Enter the 6-digit OTP sent to ${activeEmail}` : 'Join us and experience the premium auth system.'}
                    </p>
                </div>

                    <div className="mt-4">
                        <form className="space-y-3" onSubmit={showOTPForm ? handleOTPSubmit(onSubmitOTP) : handleSubmit(onSubmitRegister)}>
                            
                            <div>
                                <Input
                                    id="name"
                                    type="text"
                                    label="Full Name"
                                    icon={<FiUser />}
                                    placeholder="John Doe"
                                    error={errors.name?.message}
                                    disabled={showOTPForm}
                                    {...registerForm("name", { 
                                        required: "Name is required"
                                    })}
                                />
                            </div>

                            <div>
                                <Input
                                    id="email"
                                    type="email"
                                    label="Email Address"
                                    icon={<FiMail />}
                                    placeholder="john@example.com"
                                    error={errors.email?.message}
                                    disabled={showOTPForm}
                                    {...registerForm("email", { 
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
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
                                    disabled={showOTPForm}
                                    {...registerForm("password", { 
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                />
                            </div>

                            <div>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    icon={<FiLock />}
                                    placeholder="••••••••"
                                    error={errors.confirmPassword?.message}
                                    disabled={showOTPForm}
                                    {...registerForm("confirmPassword", { 
                                        required: "Please confirm password",
                                        validate: value => value === password || "The passwords do not match"
                                    })}
                                />
                            </div>

                            {/* OTP Field */}
                            {showOTPForm && (
                                <div className="fade-in">
                                    <div>
                                        <Input
                                            id="otp"
                                            type="text"
                                            label="Enter OTP"
                                            icon={<FiCheckCircle />}
                                            placeholder="Enter 6-digit code"
                                            error={otpErrors.otp?.message}
                                            maxLength={6}
                                            {...registerOTP("otp", { 
                                                required: "OTP is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "OTP must be 6 digits"
                                                },
                                                maxLength: {
                                                    value: 6,
                                                    message: "OTP must be 6 digits"
                                                }
                                            })}
                                        />
                                    </div>
                                    <div className="text-right">
                                        <button 
                                            type="button"
                                            onClick={handleResendOTP}
                                            disabled={resendLoading}
                                            className="font-ui text-xs uppercase tracking-widest text-accent hover:text-accent-secondary transition-colors"
                                        >
                                            {resendLoading ? 'Sending...' : 'Resend OTP'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="pt-2">
                                <Button type="submit" isLoading={isLoading}>
                                    {showOTPForm ? 'Verify OTP' : 'Create Account'}
                                </Button>
                            </div>
                        </form>
                        
                        <div className="mt-4">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-faint"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-surface font-ui text-[10px] uppercase tracking-widest text-muted">
                                        Already have an account?
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 space-y-4">
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
                                        width="100%"
                                    />
                                </div>
                                <Link to="/login" className="w-full flex justify-center items-center py-2 px-4 border border-faint font-ui text-[10px] uppercase tracking-widest text-bone hover:bg-surface transition-colors">
                                    Sign in instead
                                </Link>
                            </div>
                            
                            {showOTPForm && (
                                <div className="mt-4 text-center">
                                    <button 
                                        onClick={() => setShowOTPForm(false)}
                                        className="font-ui text-[10px] uppercase tracking-widest text-muted hover:text-bone transition-colors"
                                    >
                                        Back to edit details
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Register;
