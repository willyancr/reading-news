import GitHubProvider from 'next-auth/providers/github';
import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
});

export { handler as GET, handler as POST };
