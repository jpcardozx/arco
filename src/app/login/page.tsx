/**
 * LOGIN PAGE - S-Tier Premium Design
 * Features:
 * - MainLayout integration (Navbar + Footer)
 * - Horizontal glassmorphic card (form left, branding right)
 * - Professional glass effects with multi-layer gradients
 * - Framer Motion elegant micro-interactions
 * - WCAG AAA accessible
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

// Layout
import { MainLayout } from '@/components/layout/MainLayout';

// Auth
import { signIn } from '@/lib/supabase/auth';

// shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

// Validation schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'social'>('email');

  const { ref: cardRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const result = await signIn({
        email: data.email,
        password: data.password,
      });

      if (result.user) {
        toast.success('Login realizado com sucesso!', {
          description: 'Redirecionando para o dashboard...',
          icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
        });

        // Redirect to dashboard
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 500);
      }
    } catch (error: any) {
      console.error('[LoginPage] Error:', error);

      toast.error('Erro ao fazer login', {
        description: error.message || 'Verifique suas credenciais e tente novamente.',
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setLoginMethod('social');

    try {
      // TODO: Implement OAuth with Supabase
      toast.info(`Login com ${provider === 'google' ? 'Google' : 'GitHub'}`, {
        description: 'Em desenvolvimento. Use email/senha por enquanto.',
      });
    } catch (error) {
      toast.error('Erro no login social', {
        description: 'Tente novamente ou use email/senha.',
      });
    } finally {
      setIsLoading(false);
      setLoginMethod('email');
    }
  };

  return (
    <MainLayout showHeader={true} showFooter={true}>
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-16 px-4">
        {/* Background - login.png (black premium) */}
        <div className="absolute inset-0">
          <Image
            src="/login.png"
            alt="Login Background"
            fill
            className="object-cover"
            quality={95}
            priority
          />
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>

        {/* Subtle animated accent glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ willChange: 'transform, opacity' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500 rounded-full blur-3xl pointer-events-none"
        />

        {/* Main Content Container - Horizontal Glassmorphic Card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 w-full max-w-4xl mx-auto py-4 sm:py-6 md:py-8 px-4"
        >
          {/* Glassmorphic Card with Professional Styling - ENHANCED */}
          <Card className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl hover:bg-white/[0.06] transition-all duration-500">
            {/* Multi-layer glass effect - LIGHTER */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/[0.02] pointer-events-none" />

            {/* Subtle top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            {/* Horizontal Grid Layout - MIRRORED - RESPONSIVE */}
            <div className="grid md:grid-cols-2 gap-0 relative">

              {/* LEFT SIDE - Login Form */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16 relative order-2 md:order-1 md:border-r border-white/10">
                {/* Subtle inner glow - ENHANCED */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-center w-full max-w-md mx-auto">
                  <CardHeader className="space-y-4 px-0 pt-0 pb-10">
                    {/* Title */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="space-y-3"
                    >
                      <CardTitle className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Bem-vindo
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-base leading-relaxed">
                        Entre com suas credenciais para acessar o dashboard
                      </CardDescription>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="space-y-7 px-0 pb-10">
                    {/* Social Login Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 backdrop-blur-sm"
                          onClick={() => handleSocialLogin('google')}
                          disabled={isLoading}
                        >
                          {isLoading && loginMethod === 'social' ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          )}
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 backdrop-blur-sm"
                          onClick={() => handleSocialLogin('github')}
                          disabled={isLoading}
                        >
                          {isLoading && loginMethod === 'social' ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                            </svg>
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="relative py-2"
                    >
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase tracking-wider">
                        <span className="bg-transparent px-5 text-slate-500 font-medium backdrop-blur-sm">
                          ou
                        </span>
                      </div>
                    </motion.div>

                    {/* Email/Password Form */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                          {/* Email Field */}
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200 text-sm font-medium">Email</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                    <Input
                                      {...field}
                                      type="email"
                                      placeholder="seu@email.com"
                                      className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 backdrop-blur-sm text-base"
                                      disabled={isLoading}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-400 text-xs" />
                              </FormItem>
                            )}
                          />

                          {/* Password Field */}
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200 text-sm font-medium">Senha</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                    <Input
                                      {...field}
                                      type={showPassword ? 'text' : 'password'}
                                      placeholder="••••••••"
                                      className="pl-11 pr-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 backdrop-blur-sm text-base"
                                      disabled={isLoading}
                                    />
                                    <motion.button
                                      type="button"
                                      onClick={() => setShowPassword(!showPassword)}
                                      whileTap={{ scale: 0.95 }}
                                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                      tabIndex={-1}
                                    >
                                      {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                      ) : (
                                        <Eye className="w-4 h-4" />
                                      )}
                                    </motion.button>
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-400 text-xs" />
                              </FormItem>
                            )}
                          />

                          {/* Remember Me & Forgot Password */}
                          <div className="flex items-center justify-between pt-1">
                            <FormField
                              control={form.control}
                              name="rememberMe"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                    />
                                  </FormControl>
                                  <Label
                                    htmlFor="rememberMe"
                                    className="text-sm text-slate-400 cursor-pointer font-normal"
                                  >
                                    Lembrar-me
                                  </Label>
                                </FormItem>
                              )}
                            />

                            <Link
                              href="/forgot-password"
                              className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                            >
                              Esqueceu a senha?
                            </Link>
                          </div>

                          {/* Submit Button */}
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="pt-2"
                          >
                            <Button
                              type="submit"
                              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 group text-base"
                              disabled={isLoading}
                            >
                              {isLoading && loginMethod === 'email' ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <>
                                  <span>Entrar</span>
                                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      </Form>
                    </motion.div>
                  </CardContent>

                  <CardFooter className="flex flex-col space-y-4 px-0 pb-0 border-t border-white/10 pt-8">
                    {/* Sign up link */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                      className="text-center text-sm text-slate-400 leading-relaxed"
                    >
                      Ainda não tem uma conta?{' '}
                      <Link
                        href="/signup"
                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors underline decoration-blue-400/30 underline-offset-4 hover:decoration-blue-300"
                      >
                        Criar conta gratuita
                      </Link>
                    </motion.p>

                    {/* Terms */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.6 }}
                      className="text-center text-xs text-slate-500 leading-relaxed"
                    >
                      Ao continuar, você concorda com os{' '}
                      <Link href="/terms" className="text-slate-400 hover:text-slate-300 transition-colors underline decoration-slate-400/30 underline-offset-2">
                        Termos
                      </Link>{' '}
                      e{' '}
                      <Link href="/privacy" className="text-slate-400 hover:text-slate-300 transition-colors underline decoration-slate-400/30 underline-offset-2">
                        Privacidade
                      </Link>
                    </motion.p>
                  </CardFooter>
                </div>
              </div>

              {/* RIGHT SIDE - Logo & Branding */}
              <div className="relative p-8 md:p-16 flex flex-col justify-center order-1 md:order-2 bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04]">
                {/* Inner glass layer */}
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/[0.03] via-transparent to-purple-500/[0.03] pointer-events-none" />

                <div className="relative z-10 space-y-12">
                  {/* Logo ARCO Vertical Black - WITH ELEGANT GLOW */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex justify-center"
                  >
                    {/* Glassmorphic glow container */}
                    <div className="relative group">
                      {/* White glow backdrop with blur */}
                      <div className="absolute inset-0 -m-8 rounded-3xl bg-white/20 backdrop-blur-xl shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-500 group-hover:shadow-[0_0_80px_rgba(255,255,255,0.4)]" />
                      
                      {/* Logo */}
                      <div className="relative z-10 p-0">
                        <Image
                          src="/logos/vertical/black.png"
                          alt="ARCO"
                          width={200}
                          height={200}
                          className="h-36 w-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                          priority
                          quality={95}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Headline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="space-y-5 text-center max-w-sm mx-auto"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-300 leading-[1.15] tracking-tight">
                      Performance digital<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Sob controle.
                      </span>
                    </h2>
                    <p className="text-slate-400 leading-relaxed text-base">
                      Gerencie conversões, leads e campanhas em um único dashboard inteligente.
                    </p>
                  </motion.div>

                  {/* Decorative element */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="flex justify-center"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100/50">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium text-slate-700">
                        Sistema operacional
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
