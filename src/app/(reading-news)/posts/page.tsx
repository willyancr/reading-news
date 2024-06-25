import Link from 'next/link';

export default function PostPage() {
  return (
    <div className="pt-32 pl-40 pr-40">
      <div className="border-b-2 border-zinc-800 pb-6 mb-8 max-w-[860px]">
        <Link href="/">
          <p className="text-zinc-400 text-sm mb-5">12 de março de 2022</p>
          <h2 className="text-3xl font-bold mb-2">
            React a nova ferramenta do momento
          </h2>
          <p className="text-zinc-400 text-sm mb-4 ">
            Aprenda tudo sobre React
          </p>
        </Link>
      </div>
      <div className="border-b-2 border-zinc-800 pb-6 mb-8 max-w-[860px]">
        <Link href="/">
          <p className="text-zinc-400 text-sm mb-5">12 de março de 2022</p>
          <h2 className="text-3xl font-bold mb-2">
            React a nova ferramenta do momento
          </h2>
          <p className="text-zinc-400 text-sm mb-4 ">
            Aprenda tudo sobre React
          </p>
        </Link>
      </div>
      <div className="border-b-2 border-zinc-800 pb-6 mb-8 max-w-[860px]">
        <Link href="/">
          <p className="text-zinc-400 text-sm mb-5">12 de março de 2022</p>
          <h2 className="text-3xl font-bold mb-2">
            React a nova ferramenta do momento
          </h2>
          <p className="text-zinc-400 text-sm mb-4 ">
            Aprenda tudo sobre React
          </p>
        </Link>
      </div>
    </div>
  );
}
