import NextAuth from "next-auth";
import { Octokit } from "octokit";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
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
            id: data.login,
            name: data.name,
            email: data.email,
            avatar: data.avatar_url,
          };
        } else {
          return null;
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
