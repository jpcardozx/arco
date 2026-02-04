'use client'


import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

import { MainLayout } from '@/components/layout/MainLayout'
import { signUp } from '@/lib/supabase/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { ref: cardRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)

    try {
      const result = await signUp({
        email: data.email,
        password: data.password,
        full_name: data.name,
      })

      if (result.user) {
        toast.success('Conta criada com sucesso!', {
          description: 'Verifique seu email para confirmar a conta.',
          icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
        })

        setTimeout(() => {
          router.push('/login')
        }, 1500)
      }
    } catch (error: any) {
      console.error('[SignupPage] Error:', error)

      const message = error.message?.includes('already registered')
        ? 'Este email já está cadastrado'
        : error.message || 'Erro ao criar conta'

      toast.error('Erro no cadastro', {
        description: message,
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout  showFooter={true}>
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-16 px-4">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/login.png"
            alt="Signup Background"
            fill
            className="object-cover"
            quality={95}
            priority
          />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>

        {/* Animated glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform, opacity' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500 rounded-full blur-3xl pointer-events-none"
        />

        {/* Main Card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 w-full max-w-4xl mx-auto py-4 sm:py-6 md:py-8 px-4"
        >
          <Card className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl hover:bg-white/[0.06] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/[0.02] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="grid md:grid-cols-2 gap-0 relative">
              {/* LEFT - Form */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16 relative order-2 md:order-1 md:border-r border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-center w-full max-w-md mx-auto">
                  <CardHeader className="space-y-4 px-0 pt-0 pb-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="space-y-3"
                    >
                      <CardTitle className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Criar Conta
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-base leading-relaxed">
                        Comece a gerenciar seus funnels gratuitamente
                      </CardDescription>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="space-y-6 px-0 pb-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                          {/* Name */}
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200 text-sm font-medium">Nome Completo</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                                    <Input
                                      {...field}
                                      placeholder="João Silva"
                                      className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm text-base"
                                      disabled={isLoading}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-400 text-xs" />
                              </FormItem>
                            )}
                          />

                          {/* Email */}
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200 text-sm font-medium">Email</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                                    <Input
                                      {...field}
                                      type="email"
                                      placeholder="seu@email.com"
                                      className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm text-base"
                                      disabled={isLoading}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-400 text-xs" />
                              </FormItem>
                            )}
                          />

                          {/* Password */}
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200 text-sm font-medium">Senha</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                                    <Input
                                      {...field}
                                      type={showPassword ? 'text' : 'password'}
                                      placeholder="••••••••"
                                      className="pl-11 pr-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm text-base"
                                      disabled={isLoading}
                                    />
                                    <motion.button
                                      type="button"
                                      onClick={() => setShowPassword(!showPassword)}
                                      whileTap={{ scale: 0.95 }}
                                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                      tabIndex={-1}
                                    >
                                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </motion.button>
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-400 text-xs" />
                              </FormItem>
                            )}
                          />

                          {/* Confirm Password */}
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200 text-sm font-medium">Confirmar Senha</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                                    <Input
                                      {...field}
                                      type={showConfirmPassword ? 'text' : 'password'}
                                      placeholder="••••••••"
                                      className="pl-11 pr-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm text-base"
                                      disabled={isLoading}
                                    />
                                    <motion.button
                                      type="button"
                                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                      whileTap={{ scale: 0.95 }}
                                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                      tabIndex={-1}
                                    >
                                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </motion.button>
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-400 text-xs" />
                              </FormItem>
                            )}
                          />

                          {/* Submit */}
                          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2">
                            <Button
                              type="submit"
                              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 group text-base"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <>
                                  <span>Criar Conta</span>
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
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-center text-sm text-slate-400 leading-relaxed"
                    >
                      Já tem uma conta?{' '}
                      <Link
                        href="/login"
                        className="text-purple-400 hover:text-purple-300 font-semibold transition-colors underline decoration-purple-400/30 underline-offset-4 hover:decoration-purple-300"
                      >
                        Fazer login
                      </Link>
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="text-center text-xs text-slate-500 leading-relaxed"
                    >
                      Ao criar uma conta, você concorda com os{' '}
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

              {/* RIGHT - Branding */}
              <div className="relative p-8 md:p-16 flex flex-col justify-center order-1 md:order-2 bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04]">
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/[0.03] via-transparent to-blue-500/[0.03] pointer-events-none" />

                <div className="relative z-10 space-y-12">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex justify-center"
                  >
                    <Image
                      src="/logos/vertical/black.png"
                      alt="ARCO"
                      width={200}
                      height={200}
                      className="h-36 w-auto"
                      priority
                      quality={95}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="space-y-5 text-center max-w-sm mx-auto"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                      Comece grátis.<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                        Cresça rápido.
                      </span>
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-base">
                      Junte-se a milhares de profissionais que já otimizaram seus funnels com ARCO.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="flex justify-center"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100/50">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-slate-700">
                        Sem cartão de crédito
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
  )
}
