import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex px-24 pt-32">
      <div className="flex flex-col gap-6">
        <p>🖐️ Hey, welcome</p>
        <h1 className="text-5xl font-semibold">
          News about the <span className="text-blue-300">React</span> ecosystem
        </h1>
        <div>
          <p>Get acess to all the publications</p>
          <p className="text-blue-300">for $9.90 month</p>
        </div>
        <button className="bg-yellow-500 text-black w-48 font-bold py-2 rounded-full">
          Subscribe now
        </button>
      </div>
      <div>
        <Image
          src="/animation-home.png"
          className="group-hover:scale-105 transition-transform duration-150 ease-in"
          width={860}
          height={860}
          quality={100}
          alt=""
        />
      </div>
    </div>
  );
}
