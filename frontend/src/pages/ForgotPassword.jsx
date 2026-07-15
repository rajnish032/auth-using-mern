import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail, FiArrowLeft, FiKey } from 'react-icons/fi';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import axiosInstance from '../utils/axios';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/api/auth/forgotpassword', data);
            toast.success(response.data.message || 'Reset link sent to your email');
            setEmailSent(true);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 fade-in bg-void editorial-grid">
            <div className="max-w-lg w-full space-y-6 bg-surface p-8 border border-faint">
                <div className="text-center">
                    <div className="mx-auto w-10 h-10 border border-structure flex items-center justify-center mb-5">
                        <FiKey className="w-4 h-4 text-accent" />
                    </div>
                    <span className="block font-ui text-xs uppercase tracking-widest text-muted mb-2">
                        Recovery
                    </span>
                    <h2 className="font-display text-3xl text-bone mb-2">
                        Forgot Password?
                    </h2>
                    <p className="text-sm text-muted">
                        {emailSent 
                            ? "Check your email for the reset link." 
                            : "No worries, we'll send you reset instructions."}
                    </p>
                </div>
                
                {!emailSent ? (
                    <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            id="email"
                            type="email"
                            label="Email Address"
                            icon={<FiMail />}
                            placeholder="Enter your email"
                            error={errors.email?.message}
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />

                        <div>
                            <Button type="submit" isLoading={isLoading}>
                                Send Reset Link
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="mt-6">
                        <Button 
                            variant="secondary"
                            onClick={() => window.open('https://mail.google.com', '_blank')}
                        >
                            Open Email App
                        </Button>
                    </div>
                )}
                
                <div className="text-center mt-6 pt-6 border-t border-faint">
                    <Link to="/login" className="inline-flex items-center font-ui text-xs uppercase tracking-widest text-muted hover:text-bone transition-colors">
                        <FiArrowLeft className="mr-2" />
                        Back to log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
