'use client';

import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      router.push('/editor');
    } catch (err) {
      setError('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-[320px] space-y-4 text-center">
      <h1 className="text-xl font-bold">🎄 Christmas Card</h1>

      <button
        onClick={login}
        disabled={loading}
        className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100 disabled:opacity-50"
      >
        <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
        {loading ? 'Signing in...' : 'Continue with Google'}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
