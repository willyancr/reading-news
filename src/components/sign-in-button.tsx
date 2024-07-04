'use client';

import { FaGithub } from 'react-icons/fa6';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignInButton() {
   // Aqui estamos pegando a sessão do usuário
   // e armazenando o resultado em uma constante chamada session.
   const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className="flex items-center gap-3 bg-green-600/10 px-4 py-2 rounded-full hover:brightness-75 transition-all"
    >
      <FaGithub className="text-green-600" />
      <span className="text-sm">{session.user?.name}</span>
      <FiX className="text-zinc-500" />
    </button>
  ) : (
    <button
      onClick={() => signIn('github')}
      className="flex items-center gap-3 bg-zinc-800 px-4 py-2 rounded-full hover:brightness-75 transition-all"
    >
      <FaGithub className="text-yellow-500" />
      <span className="text-sm">Sing in with Github</span>
    </button>
  );
}
