import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex justify-between items-center border-b-2 border-zinc-800 py-4 px-24">
      <div className="flex items-center gap-20">
        <h1 className="text-2xl font-semibold">reading.news</h1>

        <div className="flex gap-8">
          <Link href="/">
            <span className="text-zinc-400 hover:text-zinc-50 hover:border-b-2 hover:border-yellow-500 hover:pb-6 ">
              Home
            </span>
          </Link>
          <Link href="/posts">
            <span className="text-zinc-400 hover:text-zinc-50 hover:border-b-2 hover:border-yellow-500 hover:pb-6 ">
              Posts
            </span>
          </Link>
        </div>
      </div>

      <Link
        href="/api/auth/signin"
        className="flex items-center gap-4 bg-zinc-800 px-4 py-2 rounded-full"
      >
        <Github />
        <span className="text-sm">Sing in with Github</span>
      </Link>
    </div>
  );
}
