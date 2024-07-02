'use client';

import { signIn, useSession } from 'next-auth/react';

interface SubscribeButtonProps {
  priceId: string;
}

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }
  }
  return (
    <button
      onClick={handleSubscribe}
      className="bg-yellow-500 text-black w-48 font-bold py-2 rounded-full hover:brightness-75 transition-all"
    >
      Subscribe now
    </button>
  );
}
