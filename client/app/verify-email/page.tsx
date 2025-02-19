'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { userService } from '@/services/api';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        try {
          await userService.verifyEmail(token);
          toast.success('Email verified successfully.');
          setMessage('Email verified successfully. You can now log in.');
          router.push('/login');
        } catch (error) {
          console.error('Verification error:', error);
          toast.error('Invalid or expired verification link.');
          setMessage('Invalid or expired verification link.');
        }
      }
    };

    verifyEmail();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gunmetal">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-olive">{message}</h2>
        <div className="flex justify-center">
          <svg
            className="h-16 w-16 text-olive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m0 0a9 9 0 11-8.485-8.485A9 9 0 0112 3v0z"
            />
          </svg>
        </div>
        <p className="text-center text-charcoal">
          Please check your email for further instructions.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => router.push('/login')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-olive hover:bg-olive/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive">
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}
