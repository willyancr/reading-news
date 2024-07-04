import GitHubProvider from 'next-auth/providers/github';
import { fauna } from '@/app/services/fauna';
import { NextAuthOptions } from 'next-auth';
import { query as q } from 'faunadb';
import NextAuth from 'next-auth';

/**
 * Configurações do NextAuth para autenticação com o GitHub.
 */
export const authOptions: NextAuthOptions = {
  // Definição dos provedores de autenticação
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      // Escopos de permissão requeridos pelo aplicativo
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  // Callbacks para manipulação de eventos durante o processo de autenticação
  callbacks: {
    /**
     * Callback chamado quando o usuário é autenticado.
     * Cria um novo usuário no banco de dados FaunaDB se não existir.
     */
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        // Verifica se o usuário já existe no banco de dados
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
            // Se o usuário não existir, cria um novo no banco de dados
            q.Create(q.Collection('users'), { data: { email } }),
            // Se o usuário já existir, busca-o no banco de dados
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
  // Chave secreta usada para assinar os tokens de autenticação
  secret: process.env.NEXTAUTH_SECRET,
};

// Cria um handler para lidar com as requisições de autenticação
const handler = NextAuth(authOptions);

// Exporta o handler para as requisições GET e POST
export { handler as GET, handler as POST };
