import Header from '@/components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto min-h-screen w-full max-w-[1600px]">
      <Header />
      {children}
    </section>
  );
}
