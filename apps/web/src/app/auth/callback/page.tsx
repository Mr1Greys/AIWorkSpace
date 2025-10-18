'use client';

'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const provider = searchParams.get('provider');
      const error = searchParams.get('error');

      if (error) {
        console.error('OAuth error:', error);
        router.push('/auth/signin?error=oauth_failed');
        return;
      }

      if (code && provider) {
        // TODO: Exchange code for token
        console.log('OAuth callback:', { code, provider });
        
        // Simulate API call
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        router.push('/auth/signin');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Авторизация...</h2>
        <p className="mt-2 text-gray-600">Пожалуйста, подождите</p>
      </div>
    </div>
  );
}
