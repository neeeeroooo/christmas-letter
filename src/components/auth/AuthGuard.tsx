'use client';

import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push('/login');
      } else {
        setUser(u);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading) return <div className="p-4">Loading...</div>;

  return <>{user && children}</>;
}
