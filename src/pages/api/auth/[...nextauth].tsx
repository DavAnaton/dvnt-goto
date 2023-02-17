import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import { OAuthConfig } from "next-auth/providers";

export const authOptions = {
  providers: [] as OAuthConfig<any>[],
  secret: process.env.NEXTAUTH_SECRET,
}

if(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET){
	authOptions.providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }));
}
if(process.env.GITHUB_ID && process.env.GITHUB_SECRET){
	authOptions.providers.push(
    GoogleProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }));
}

export default NextAuth(authOptions);

