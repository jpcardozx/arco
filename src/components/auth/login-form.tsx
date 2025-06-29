'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Route } from 'next';
import {
    Github,
    Mail,
    AlertCircle,
    Loader2,
    Lock,
    AtSign,
    Check,
    Eye,
    EyeOff,
    ShieldAlert,
    ShieldCheck,
    X,
    ArrowRight
} from 'lucide-react';

// Improved validation schema with better error messages
const loginSchema = z.object({
    email: z.string()
        .min(1, 'Por favor, informe seu email')
        .email('Formato de email inválido'),
    password: z.string()
        .min(1, 'Por favor, informe sua senha')
        .min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    // Form state
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Animation controls
    const formControls = useAnimation();
    const successControls = useAnimation();
    const errorControls = useAnimation();

    // References
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // Router
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isValid },
        watch,
        trigger,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    // Watch form inputs for real-time validation and effects
    const watchEmail = watch("email");
    const watchPassword = watch("password");
    const isFormValid = watchEmail && watchPassword && !errors.email && !errors.password;

    // Clear error messages when user starts typing again
    useEffect(() => {
        if (error) {
            setError(null);
            errorControls.start({
                opacity: 0,
                y: -10,
                transition: { duration: 0.3 }
            });
        }
    }, [watchEmail, watchPassword, error, errorControls]);

    // Focus email field on mount
    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }

        // Initial animation of the form
        formControls.start({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
            }
        });
    }, [formControls]);

    // Password strength indicator
    const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong', message: string } => {
        if (!password) return { strength: 'weak', message: 'Digite sua senha' };

        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < 8) {
            return { strength: 'weak', message: 'Senha muito curta' };
        }

        if (hasLetters && hasNumbers && hasSpecialChars && password.length >= 12) {
            return { strength: 'strong', message: 'Senha forte' };
        }

        if ((hasLetters && hasNumbers) || (hasLetters && hasSpecialChars) || (hasNumbers && hasSpecialChars)) {
            return { strength: 'medium', message: 'Senha média' };
        }

        return { strength: 'weak', message: 'Senha fraca' };
    };

    const passwordStrength = getPasswordStrength(watchPassword);

    // Handle login form submission
    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Elegant loading state animations
            await formControls.start({
                scale: 0.99,
                transition: { duration: 0.2 }
            });

            // Attempt login
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                // Handle error with animation
                formControls.start({
                    scale: 1,
                    transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 15
                    }
                });

                errorControls.start({
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4 }
                });

                // More descriptive, user-friendly error messages
                if (result.error.includes('credentials')) {
                    setError('Email ou senha incorretos. Por favor verifique suas credenciais.');
                } else if (result.error.includes('tentativas')) {
                    setError('Muitas tentativas de login. Tente novamente mais tarde ou recupere sua senha.');
                } else {
                    setError('Não foi possível realizar login: ' + result.error);
                }

                setIsLoading(false);
                return;
            }

            // Success animation and message
            setSuccessMessage('Login realizado com sucesso!');

            // Hide form and show success message
            await formControls.start({
                opacity: 0,
                y: -20,
                transition: { duration: 0.4 }
            });

            await successControls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
            });

            // Redirect after success animation completes
            setTimeout(() => {
                router.push('/dashboard' as Route);
                router.refresh();
            }, 800);
        } catch (err) {
            setError('Ocorreu um erro ao processar seu login. Por favor, tente novamente.');
            setIsLoading(false);

            formControls.start({
                scale: 1,
                transition: { duration: 0.2 }
            });
        }
    };

    // OAuth sign in with elegant animations
    const handleOAuthSignIn = async (provider: string) => {
        setIsLoading(true);
        setError(null);

        try {
            // User feedback with provider-specific messages
            setSuccessMessage(
                provider === 'github'
                    ? 'Conectando com GitHub...'
                    : 'Conectando com Google...'
            );

            // Animation for redirect
            await formControls.start({
                opacity: 0.8,
                scale: 0.98,
                transition: { duration: 0.3 }
            });

            // Brief delay for UX
            setTimeout(async () => {
                await signIn(provider, {
                    callbackUrl: '/dashboard',
                    redirect: true,
                });
            }, 500);
        } catch (err) {
            setError(`Falha na conexão com ${provider}. Tente novamente ou use outro método de login.`);
            setIsLoading(false);

            formControls.start({
                opacity: 1,
                scale: 1,
                transition: { duration: 0.3 }
            });
        }
    };

    return (
        <div className="w-full max-w-md relative">
            {/* Success message overlay */}
            <AnimatePresence>
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={successControls}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                        >
                            <ShieldCheck className="w-8 h-8 text-green-600" />
                        </motion.div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{successMessage}</h3>
                        <p className="text-gray-600 text-center mb-4">
                            Você será redirecionado para seu dashboard em instantes
                        </p>

                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.3, duration: 1.5 }}
                            className="h-1 bg-green-500 rounded-full w-full mt-2"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main login form */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={formControls}
                className="w-full space-y-6 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100"
            >
                {/* Header with logo and title */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <Image
                            src="/logo-v2.svg"
                            alt="ARCO"
                            width={120}
                            height={40}
                            className="h-10 w-auto mb-4"
                        />
                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Entre no seu Dashboard
                    </h2>
                    <p className="text-sm text-gray-500 max-w-[85%] mx-auto">
                        Acesso seguro à plataforma ARCO
                    </p>
                </div>

                {/* Error message with animation */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={errorControls}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-red-50 border-l-4 border-red-500 rounded-md p-4"
                        >
                            <div className="flex items-start">
                                <ShieldAlert className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-red-800">{error}</p>
                                </div>
                                <button
                                    onClick={() => setError(null)}
                                    className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Login form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email field with animated label */}
                    <div className="space-y-1.5">
                        <div className="relative">
                            <label
                                htmlFor="email"
                                className={`absolute left-3 transition-all duration-200 ${emailFocused || watchEmail
                                        ? 'transform -translate-y-[24px] text-xs font-medium text-blue-600'
                                        : 'transform translate-y-0 text-sm text-gray-500'
                                    }`}
                            >
                                Email
                            </label>

                            <div className="mt-1 relative">
                                <div className={`absolute left-3.5 top-3 transition-opacity duration-200 ${emailFocused || watchEmail ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                    <AtSign className="h-5 w-5 text-gray-400" />
                                </div>

                                <input
                                    {...register('email')}
                                    id="email"
                                    ref={emailRef}
                                    type="email"
                                    autoComplete="email"
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => {
                                        setEmailFocused(false);
                                        trigger('email');
                                    }}
                                    className={`block w-full rounded-xl border ${errors.email
                                            ? 'border-red-300 pr-10 focus:border-red-500 focus:ring-red-500'
                                            : emailFocused
                                                ? 'border-blue-400 shadow-[0_0_0_1px_rgba(59,130,246,0.5)] focus:border-blue-500 focus:ring-blue-500'
                                                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                                        } py-3 pl-12 pr-4 shadow-sm text-gray-900 placeholder-gray-400 transition-all duration-200`}
                                    placeholder={emailFocused ? "seu@email.com" : ""}
                                />

                                {errors.email && (
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                    </div>
                                )}

                                {watchEmail && !errors.email && (
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <Check className="h-5 w-5 text-green-500" />
                                    </div>
                                )}
                            </div>

                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1.5 text-xs font-medium text-red-600 flex items-center"
                                >
                                    <AlertCircle className="w-3 h-3 mr-1.5" />
                                    {errors.email.message}
                                </motion.p>
                            )}
                        </div>
                    </div>

                    {/* Password field with animated label and toggle */}
                    <div className="space-y-1.5">
                        <div className="relative">
                            <label
                                htmlFor="password"
                                className={`absolute left-3 transition-all duration-200 ${passwordFocused || watchPassword
                                        ? 'transform -translate-y-[24px] text-xs font-medium text-blue-600'
                                        : 'transform translate-y-0 text-sm text-gray-500'
                                    }`}
                            >
                                Senha
                            </label>

                            <div className="mt-1 relative">
                                <div className={`absolute left-3.5 top-3 transition-opacity duration-200 ${passwordFocused || watchPassword ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>

                                <input
                                    {...register('password')}
                                    id="password"
                                    ref={passwordRef}
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => {
                                        setPasswordFocused(false);
                                        trigger('password');
                                    }}
                                    className={`block w-full rounded-xl border ${errors.password
                                            ? 'border-red-300 pr-10 focus:border-red-500 focus:ring-red-500'
                                            : passwordFocused
                                                ? 'border-blue-400 shadow-[0_0_0_1px_rgba(59,130,246,0.5)] focus:border-blue-500 focus:ring-blue-500'
                                                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                                        } py-3 pl-12 pr-10 shadow-sm text-gray-900 placeholder-gray-400 transition-all duration-200`}
                                    placeholder={passwordFocused ? "••••••••" : ""}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1.5 text-xs font-medium text-red-600 flex items-center"
                                >
                                    <AlertCircle className="w-3 h-3 mr-1.5" />
                                    {errors.password.message}
                                </motion.p>
                            )}

                            {/* Password strength indicator */}
                            {watchPassword && !errors.password && (
                                <div className="mt-1.5">
                                    <div className="flex justify-between items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className={`h-1.5 rounded-full ${passwordStrength.strength === 'weak'
                                                        ? 'bg-red-500 w-1/3'
                                                        : passwordStrength.strength === 'medium'
                                                            ? 'bg-yellow-500 w-2/3'
                                                            : 'bg-green-500 w-full'
                                                    } transition-all duration-300`}
                                            />
                                        </div>
                                        <span className={`ml-2 text-xs ${passwordStrength.strength === 'weak'
                                                ? 'text-red-600'
                                                : passwordStrength.strength === 'medium'
                                                    ? 'text-yellow-600'
                                                    : 'text-green-600'
                                            }`}>
                                            {passwordStrength.message}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Remember me and forgot password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition duration-150"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-600">
                                Lembrar-me
                            </label>
                        </div>

                        <div className="text-xs">
                            <a href="/auth/reset-password" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                Esqueceu sua senha?
                            </a>
                        </div>
                    </div>

                    {/* Submit button with animations */}
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative w-full overflow-hidden rounded-xl flex justify-center items-center px-4 py-3 text-sm font-medium shadow-lg
              ${isFormValid
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                                : 'bg-gray-100 text-gray-500 cursor-not-allowed'}
              transition-all duration-200 group`}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <span>Autenticando...</span>
                            </span>
                        ) : (
                            <>
                                <span className="mr-2">Entrar</span>
                                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                                    <ArrowRight className="w-4 h-4" />
                                </span>

                                {/* Elegant ripple effect */}
                                <motion.span
                                    initial={{ scale: 0, x: "-50%", y: "-50%" }}
                                    whileTap={{ scale: 5 }}
                                    className="absolute left-[50%] top-[50%] aspect-square w-5 rounded-full bg-white/20 opacity-60 pointer-events-none"
                                />
                            </>
                        )}
                    </motion.button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-4 text-gray-500">ou continue com</span>
                    </div>
                </div>

                {/* OAuth providers */}
                <div className="grid grid-cols-2 gap-3">
                    <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={() => handleOAuthSignIn('github')}
                        disabled={isLoading}
                        className="group relative flex w-full items-center justify-center rounded-xl bg-black py-3 px-4 text-sm font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        <Github className="w-5 h-5 mr-2 relative z-10" />
                        <span className="relative z-10">GitHub</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={() => handleOAuthSignIn('google')}
                        disabled={isLoading}
                        className="group relative flex w-full items-center justify-center rounded-xl bg-white py-3 px-4 text-sm font-medium text-gray-700 shadow-md transition-all duration-200 hover:shadow-lg border border-gray-200 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        <svg className="w-5 h-5 mr-2 relative z-10" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span className="relative z-10">Google</span>
                    </motion.button>
                </div>

                {/* Registration link */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-600">
                        Não tem uma conta?{' '}
                        <a href="/auth/register" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                            Registre-se
                        </a>
                    </p>
                </div>

                {/* Security badge */}
                <div className="flex items-center justify-center mt-4">
                    <div className="flex items-center text-xs text-gray-400">
                        <Lock className="w-3 h-3 mr-1.5" />
                        <span>Conexão segura via HTTPS</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
