interface SubscribeButtonProps {
  priceId: string;
}

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
  return (
    <button className="bg-yellow-500 text-black w-48 font-bold py-2 rounded-full hover:brightness-75 transition-all">
      Subscribe now
    </button>
  );
}
