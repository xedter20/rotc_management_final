'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userService } from '@/services/api';
import { toast } from 'sonner';
import { useStore } from '@/lib/mock-data'; // Import the Zustand store
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
});

export default function LoginPage() {
  const setCurrentUser = useStore(state => state.setCurrentUser); // Get the setCurrentUser function from the store
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    localStorage.removeItem('user'); // Check for user in localStorage
    let user = localStorage.getItem('user'); // Check for user in localStorage

    console.log({ user });
    try {
      user = JSON.parse(user);
      if (user.id) {
        router.push('/dashboard'); // Redirect to dashboard if user exists
      }
    } catch (error) {}
    console.log({ user });
  }, [router]); // Add router as a dependency

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await userService.login(values);

      // Store the token and user data
      localStorage.setItem('token', response.token);

      console.log({ DEx: response.user });
      setCurrentUser(response.user);

      localStorage.setItem('user', JSON.stringify(response.user));

      // Show success message
      toast.success('Login successful!');

      // Redirect to dashboard
      // router.push('/dashboard');
    } catch (err) {
      // Show error message
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to login';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h2 className="text-olive mt-6 text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className={
                        form.formState.errors.email ? 'border-red-500' : ''
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
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
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className={
                        form.formState.errors.password ? 'border-red-500' : ''
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-olive hover:bg-olive"
              disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <Link
            href="/forgot-password"
            className="text-sm font-bold text-gunmetal hover:underline">
            Forgot your password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-bold text-coyote hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
