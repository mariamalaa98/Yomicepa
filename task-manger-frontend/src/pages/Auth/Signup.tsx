import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Mail, User, Lock, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    fullName: z.string().min(2, 'Full name is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Za-z]/, 'Password must contain at least one letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

type SignupFormData = z.infer<typeof signupSchema>;

export const Signup: React.FC = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            setError('');
            await signup(data.email, data.fullName, data.password);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to sign up');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-blue-600 rounded-2xl mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p className="text-gray-400">Join us and start managing your tasks</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Email"
                        type="email"
                        placeholder="name@example.com"
                        icon={<Mail className="w-5 h-5" />}
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                        icon={<User className="w-5 h-5" />}
                        error={errors.fullName?.message}
                        {...register('fullName')}
                    />

                    <div className="relative">
                        <Input
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            icon={<Lock className="w-5 h-5" />}
                            error={errors.password?.message}
                            {...register('password')}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-[42px] text-gray-400 hover:text-white"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating account...' : 'Sign Up'}
                    </Button>

                    <p className="text-center text-gray-400 text-sm">
                        Already have an account?{' '}
                        <Link to="/signin" className="text-blue-500 hover:text-blue-400 font-medium">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
