
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { motion } from "framer-motion";
import { zodResolver } from '@hookform/resolvers/zod';

import { authClient } from '@/lib/auth-client';
import { passwordSchema } from '@/lib/validation';
import { LoadingButton } from '@/components/auth/LoadingButton';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/auth/Form';
import { Input } from '@/components/ui/input';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

const signUpSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Enter a valid email'),
    password: passwordSchema,
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') ?? '/dashboard';

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  async function onSubmit(values: SignUpValues) {
    setError(null);
    if (isLocked) return;
    setIsLocked(true);

    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      callbackURL: redirect,
    });

    if (error) {
      setError(error.message || 'Invalid Email or Password');
      setIsLocked(false);
    } else {
      router.replace(redirect);
      toast.success('Account created 🎉');
    }
  };

  const loading = form.formState.isSubmitting || isLocked;

  return (
    <div className="min-h-screen py-16 bg-[#0B0F19] text-white flex justify-center px-4 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#111827] border border-white/5 rounded-2xl shadow-2xl p-8 backdrop-blur-xl">

          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <p className="text-sm text-white/50 mt-2">
              Join Coin Global and start trading
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Google Auth */}
          <button
            type="button"
            disabled={loading}
            onClick={async () => {
              if (isLocked) return;
              setIsLocked(true);

              try {
                await authClient.signIn.social({
                  provider: "google",
                  callbackURL: redirect,
                });
              } catch (err) {
                console.error(err);
                setIsLocked(false);
              }
            }}
            className={`w-full flex items-center justify-center gap-3 bg-[#0F1623] border border-white/10 rounded-xl py-3 text-sm hover:border-white/20 transition ${loading ? "opacity-30 hover:cursor-not-allowed" : "hover:cursor-pointer hover:opacity-90"}`}
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <GoogleIcon className="w-5 h-5" />
                Continue with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative text-center text-xs text-white/40 bg-[#111827] px-3 w-fit mx-auto">
              Or continue with email
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        className="bg-[#0F1623] border-white/10 focus:ring-2 focus:ring-indigo-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        className="bg-[#0F1623] border-white/10 focus:ring-2 focus:ring-indigo-600"
                        {...field}
                      />
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
                      <PasswordInput
                        disabled={loading}
                        className="bg-[#0F1623] border-white/10 focus:ring-2 focus:ring-indigo-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={loading}
                        className="bg-[#0F1623] border-white/10 focus:ring-2 focus:ring-indigo-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl py-3 text-sm font-medium transition ${loading ? "opacity-30 hover:cursor-not-allowed" : "hover:cursor-pointer"}`}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/50">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-indigo-400 hover:text-indigo-300"
              >
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
);
}
