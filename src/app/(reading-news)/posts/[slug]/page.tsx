import { PrismicRichText } from '@prismicio/react';
import { createClient } from '@/prismicio';
import { Posts } from '../page';

interface Params {
  params: {
    slug: string;
  };
}

export default async function ContentPostPage({ params }: Params) {
  const post = await getPrismic({ params });

  return (
    <div className="pt-32 pl-40 pr-40 ">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <p className="text-zinc-400 text-sm mb-6">
        {post.first_publication_date}
      </p>
      <p className='leading-7'>{post.content}</p>
    </div>
  );
}
export const getPrismic = async ({ params }: Params) => {
  const prismic = createClient();
  const response = await prismic.getByUID('post', params.slug);

  return formatPost(response);
};

export const formatPost = (post: Posts) => ({
  title: <PrismicRichText field={post.data.title} />,
  content: <PrismicRichText field={post.data.content} />,
  first_publication_date: new Date(
    post.first_publication_date,
  ).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }),
});
