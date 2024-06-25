import SubscribeButton from '@/components/subscribe-button';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex px-24 pt-32">
      <section className="flex flex-col gap-6">
        <p>🖐️ Hey, welcome</p>
        <h1 className="text-5xl font-semibold">
          News about the <span className="text-blue-300">React</span> ecosystem
        </h1>
        <div>
          <p>Get acess to all the publications</p>
          <p className="text-blue-300">for $9.90 month</p>
        </div>
        <SubscribeButton />
      </section>
      <section>
        <Image
          src="/animation-home.png"
          className="max-w-[460px]"
          width={860}
          height={860}
          quality={100}
          alt=""
        />
      </section>
    </main>
  );
}
