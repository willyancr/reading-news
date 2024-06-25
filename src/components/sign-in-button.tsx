import { FaGithub } from 'react-icons/fa6';
import { FiX } from 'react-icons/fi';

export default function SignInButton() {
  const isUserLoggedIn = true;
  return isUserLoggedIn ? (
    <button className="flex items-center gap-3 bg-zinc-800 px-4 py-2 rounded-full hover:brightness-75 transition-all">
      <FaGithub className="text-green-600" />
      <span className="text-sm">Willyan Costa Ribeiro</span>
      <FiX className="text-zinc-500" />
    </button>
  ) : (
    <button className="flex items-center gap-3 bg-zinc-800 px-4 py-2 rounded-full hover:brightness-75 transition-all">
      <FaGithub className="text-yellow-500" />
      <span className="text-sm">Sing in with Github</span>
    </button>
  );
}
