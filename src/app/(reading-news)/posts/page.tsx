import { PrismicRichText } from '@prismicio/react';
import { RichTextField } from '@prismicio/types';
import { RTTextNode } from '@prismicio/client';
import { createClient } from '@/prismicio';
import Link from 'next/link';
import { Metadata } from 'next';

interface PostData {
  title: RichTextField;
  content: RichTextField;
}

export interface Posts {
  data: PostData;
  uid: string;
  first_publication_date: string;
}

export const metadata: Metadata = {
  title: 'Posts',
};

export default async function PostPage() {
  const posts = await getPrismic();

  return (
    <div className="pt-32 pl-40 pr-40 ">
      {posts.map((post) => (
        <div
          className="border-b-2 border-zinc-800 pb-6 mb-8 max-w-[860px]"
          key={post.uid}
        >
          <p className="text-zinc-400 text-sm mb-5">
            {post.first_publication_date}
          </p>
          <Link href={`/posts/${post.uid}`}>
            <h2 className="text-3xl font-bold mb-2 hover:text-yellow-500 transition">
              {post.title}
            </h2>
          </Link>
          <p className="text-zinc-400 text-sm mb-4">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
export const getPrismic = async () => {
  const prismic = createClient();
  const response: Posts[] = await prismic.getAllByType('post');

  const posts = response.map((post) => ({
    uid: post.uid,
    title: <PrismicRichText field={post.data.title} />,
    content: (post.data.content[0] as RTTextNode).text,
    first_publication_date: new Date(
      post.first_publication_date,
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));
  return posts;
};
