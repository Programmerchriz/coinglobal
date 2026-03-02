
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

import { authClient } from '@/lib/auth-client';
import { useAuthHandler } from '../auth-client';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { PasswordInput } from '@/components/auth/PasswordInput';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/auth/Form';
import { Input } from '@/components/ui/input';
import Loading from '../loading';

const signInSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type SignInValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/dashboard';

  const { error, isLocked, handleAuth } = useAuthHandler(
    'Welcome back 🚀',
    redirect
  );

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const loading = form.formState.isSubmitting || isLocked;

  return (
      loading
        ?
      <Loading />
        :
      <div className="min-h-screen pt-16 bg-[#0B0F19] text-white flex justify-center px-4 relative overflow-hidden">
        <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-[#111827] border border-white/5 rounded-2xl shadow-2xl p-8 backdrop-blur-xl">

            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold">Welcome Back</h1>
              <p className="text-sm text-white/50 mt-2">
                Sign in to access your crypto dashboard
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Google Login */}
            <button
              type="button"
              disabled={loading}
              onClick={() =>
                handleAuth(() =>
                  authClient.signIn.social({
                    provider: 'google',
                    callbackURL: redirect,
                  })
                )
              }
              className={`w-full flex items-center justify-center gap-3 bg-[#0F1623] border border-white/10 rounded-xl py-3 text-sm transition ${
                loading ? 'opacity-30 cursor-not-allowed' : 'hover:cursor-pointer hover:opacity-90'
              }`}
            >
              {loading ? 'Signing in...' : (
                <>
                  <GoogleIcon className="w-5 h-5" />
                  Continue with Google
                </>
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative text-center text-xs text-white/40 bg-[#111827] px-3 w-fit mx-auto">
                Or continue with email
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) =>
                  handleAuth(() =>
                    authClient.signIn.email({
                      email: values.email,
                      password: values.password,
                      rememberMe: values.rememberMe,
                      callbackURL: redirect,
                    })
                  )
                )}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-indigo-600 rounded-xl py-3 text-sm font-medium transition ${
                    loading ? 'opacity-30 cursor-not-allowed' : 'hover:cursor-pointer hover:bg-indigo-500'
                  }`}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm text-white/50">
              Don’t have an account?{' '}
              <Link href="/sign-up" className="text-indigo-400 hover:text-indigo-300">
                Sign up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
};
