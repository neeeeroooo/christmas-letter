'use client';

import { auth } from '@/lib/auth';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="flex items-center gap-3 text-sm text-gray-700">
      <span className="max-w-[200px] truncate">{user?.email}</span>

      <span className="text-gray-300">|</span>

      <button
        onClick={logout}
        className="text-red-600 hover:text-red-700 font-medium cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
