import Link from 'next/link';
import SignInButton from './sign-in-button';

export default function Header() {
  return (
    <header className="flex justify-between items-center border-b-2 border-zinc-800 py-4 px-24">
      <nav className="flex items-center gap-20">
        <h1 className="text-2xl font-semibold">reading.news</h1>

        <div className="flex gap-8">
          <Link href="/">
            <span className="text-zinc-400 hover:text-zinc-50 hover:border-b-2 hover:border-yellow-500 hover:pb-6 transition">
              Home
            </span>
          </Link>
          <Link href="/posts">
            <span className="text-zinc-400 hover:text-zinc-50 hover:border-b-2 hover:border-yellow-500 hover:pb-6 transition">
              Posts
            </span>
          </Link>
        </div>
      </nav>

      <SignInButton />
    </header>
  );
}
