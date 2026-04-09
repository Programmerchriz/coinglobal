'use client';

import { useState } from 'react';
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
import Loading from '@/app/(auth)/loading';

const signInSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type SignInValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const searchParams = useSearchParams();
  let redirect = searchParams.get('redirect') ?? '/dashboard?welcome=signin';
  if (redirect?.startsWith("/sign")) redirect = "/dashboard?welcome=signin";
  
  const [googleLoading, setGoogleLoading] = useState(false);
  const { error, isLocked, handleAuth } = useAuthHandler(redirect);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const loading = form.formState.isSubmitting || isLocked || googleLoading;

  return loading ? (
    <Loading />
  ) : (
    <div className="min-h-screen py-16 bg-(--bg-app) text-(--text-primary) flex justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-50 -left-50 w-100 h-100 bg-(--bg-glass-indigo) rounded-full blur-3xl" />
      <div className="absolute -bottom-50 -right-50 w-100 h-100 bg-(--bg-glass-purple) rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-2xl p-8 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
            <p className="text-sm text-(--color-50) mt-2">
              Sign in to access your crypto dashboard
            </p>
          </div>

          {error && (
            <div
              className="mb-4 p-3 rounded-xl bg-(--color-error-10) border border-(--color-error-2
              0) text-(--text-error) text-sm"
            >
              {error}
            </div>
          )}

          {/* Google Login */}
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setGoogleLoading(true);

              handleAuth(() =>
                authClient.signIn.social({
                  provider: 'google',
                  callbackURL: redirect,
                })
              );
            }}
            className={`w-full flex items-center justify-center gap-3 bg-(--bg-sidebar) border border-(--color-10) rounded-xl py-3 text-sm transition ${
              loading ? 'opacity-30 cursor-not-allowed' : 'hover:cursor-pointer hover:opacity-90'
            }`}
          >
            {loading ? (
              'Signing in...'
            ) : (
              <>
                <GoogleIcon className="w-5 h-5" />
                Continue with Google
              </>
            )}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-(--color-10)" />
            </div>
            <div className="relative text-center text-xs text-(--color-40) bg-(--bg-surface) px-3 w-fit mx-auto">
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
                className={`w-full bg-(--color-primary) text-white rounded-xl py-3 text-sm font-medium transition ${
                  loading
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:cursor-pointer hover:bg-(--color-primary-hover)'
                }`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-(--color-50)">
            Already have an account?{' '}
            <Link
              href={`/signup?redirect=${redirect}`}
              className="text-(--color-primary) hover:text-(--color-primary-hover)"
            >
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
