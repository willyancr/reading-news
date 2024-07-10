import SubscribeButton from '@/components/subscribe-button';
import { stripe } from '@/app/services/stripe';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Home',
};

export async function getPriceStripe() {
  const price = await stripe.prices.retrieve('price_1PVX1ARrH3ggrWH5BujbYNY2');
  const product = {
    priceId: price.id,
    amount: (price.unit_amount ?? 0) / 100,
  };
  return product;
}

export default async function HomePage() {
  const product = await getPriceStripe();

  return (
    <main className="flex px-24 pt-32">
      <section className="flex flex-col gap-6">
        <p>🖐️ Hey, welcome</p>
        <h1 className="text-5xl font-semibold">
          News about the <span className="text-blue-300">React</span> ecosystem
        </h1>
        <div>
          <p>Get acess to all the publications</p>
          <p className="text-blue-300">
            for{' '}
            {product.amount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}{' '}
            month
          </p>
        </div>
        <SubscribeButton priceId={product.priceId} />
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
