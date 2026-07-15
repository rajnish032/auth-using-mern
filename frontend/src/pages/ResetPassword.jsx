import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { FiLock, FiCheckCircle } from 'react-icons/fi';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import axiosInstance from '../utils/axios';
import { reset } from '../features/auth/authSlice';

const ResetPassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { resettoken } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.put(`/api/auth/resetpassword/${resettoken}`, {
                password: data.password
            });
            
            // On success, save user data (API returns user data and sets cookie)
            localStorage.setItem('user', JSON.stringify(response.data));
            
            toast.success('Password reset successfully!');
            
            // Redirect to dashboard
            setTimeout(() => {
                navigate('/dashboard');
                // We reload to let Redux catch the localstorage change, 
                // or we could dispatch a custom action to set credentials.
                window.location.reload(); 
            }, 1500);
            
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid or expired token');
        } finally {
            setIsLoading(false);
        }
    };

    const password = watch("password");

    return (
        <div className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 fade-in bg-void editorial-grid">
            <div className="max-w-lg w-full space-y-6 bg-surface p-8 border border-faint">
                <div className="text-center">
                    <div className="mx-auto w-10 h-10 border border-structure flex items-center justify-center mb-5">
                        <FiCheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <span className="block font-ui text-xs uppercase tracking-widest text-muted mb-2">
                        Security
                    </span>
                    <h2 className="font-display text-3xl text-bone mb-2">
                        Set new password
                    </h2>
                    <p className="text-sm text-muted">
                        Your new password must be different from previous used passwords.
                    </p>
                </div>
                
                <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            id="password"
                            type="password"
                            label="New Password"
                            icon={<FiLock />}
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register("password", { 
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                        <Input
                            id="confirmPassword"
                            type="password"
                            label="Confirm New Password"
                            icon={<FiLock />}
                            placeholder="••••••••"
                            error={errors.confirmPassword?.message}
                            {...register("confirmPassword", { 
                                required: "Please confirm password",
                                validate: value => value === password || "The passwords do not match"
                            })}
                        />
                    </div>

                    <div>
                        <Button type="submit" isLoading={isLoading}>
                            Reset Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
