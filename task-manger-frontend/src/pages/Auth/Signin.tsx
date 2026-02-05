import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const signinSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

type SigninFormData = z.infer<typeof signinSchema>;

export const Signin: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SigninFormData>({
        resolver: zodResolver(signinSchema),
    });

    const onSubmit = async (data: SigninFormData) => {
        try {
            setError('');
            await login(data.email, data.password);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-blue-600 rounded-2xl mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Stay productive. Sign in to your workspace.</p>
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
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <p className="text-center text-gray-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-medium">
                            Create Account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
