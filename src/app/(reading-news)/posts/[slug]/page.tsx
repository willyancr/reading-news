import { PrismicRichText } from '@prismicio/react';
import { createClient } from '@/prismicio';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { RichTextField } from '@prismicio/client';

interface Params {
  params: {
    slug: string;
  };
}
interface PostProps {
  post: {
    title: string;
    content: string;
    first_publication_date: string;
  };
}
export const metadata: Metadata = {
  title: 'Content Post',
};

export default async function ContentPostPage({ params }: Params) {
  const post = await getPrismic({ params });
  return (
    <article className="pt-32 pl-40 pr-40 ">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <time className="text-zinc-400 text-sm ">
        {post.first_publication_date}
      </time>
      <p className="leading-7 mt-6">{post.content}</p>
    </article>
  );
}
export const getPrismic = async ({ params }: Params) => {
  const prismic = createClient();
  const response = await prismic.getByUID('post', params.slug);

  const post = {
    title: <PrismicRichText field={response.data.title} />,
    content: <PrismicRichText field={response.data.content} />,
    first_publication_date: new Date(
      response.first_publication_date,
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };

  return post;
};
