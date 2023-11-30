import NextAuth, { AuthOptions } from "next-auth";
import { Octokit } from "octokit";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialProvider({
      name: "Credentials",
      id: "git-pat",
      credentials: {
        personalAccessToken: { label: "personalAccessToken", type: "text" },
      },
      async authorize(credentials) {
        const octokit = new Octokit({ auth: credentials!.personalAccessToken });
        const { data } = await octokit.rest.users.getAuthenticated();
        if (data) {
          return {
            ...data,
            personalAccessToken: credentials?.personalAccessToken,
            id: data.login,
            name: data.name,
            email: data.email,
            image: data.avatar_url,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // TODO: Find a Typesafe way to this.
      const userInfo = user as any;
      if(account) {
        token.accessToken = userInfo.personalAccessToken
      }
      return token
    }
  },
  pages: {
    signIn: '/login',
    error: '/error'
  }

};
export default NextAuth(authOptions);
