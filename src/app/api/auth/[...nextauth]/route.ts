import GitHubProvider from 'next-auth/providers/github';
import { fauna } from '@/app/services/fauna';
import { NextAuthOptions } from 'next-auth';
import { query as q } from 'faunadb';
import NextAuth from 'next-auth';

export const authOptions: NextAuthOptions = {
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
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email as string),
                ),
              ),
            ),
            q.Create(q.Collection('users'), { data: { email } }),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email as string),
              ),
            ),
          ),
        );
        return true;
      } catch {
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
