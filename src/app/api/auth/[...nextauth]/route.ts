import { sendRequest } from "@/utils/api"
import NextAuth, { AuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    secret: process.env.NO_SECRET,
    // Configure one or more authentication providers
    providers: [
        // ...add more providers here
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Sign in",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: 'http://localhost:8000/api/v1/auth/login',
                    method: 'POST',
                    body: {
                        username: credentials?.username,
                        password: credentials?.password
                    }
                })
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                if (res && res.data) {
                    // Any object returned will be saved in `user` property of the JWT
                    return res.data as any
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    throw new Error(res?.message as string)

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            if (trigger === 'signIn' && account?.provider !== 'credentials') {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: 'http://localhost:8000/api/v1/auth/social-media',
                    method: 'POST',
                    body: {
                        type: account?.provider?.toUpperCase(),
                        username: user.email
                    }
                })
                if (res.data) {
                    token.access_token = res.data.access_token;
                    token.refresh_token = res.data.refresh_token;
                    token.user = res.data.user
                }
                return token
            }
            if (trigger === 'signIn' && account?.provider === 'credentials') {
                // @ts-ignore
                token.access_token = user.access_token;
                // @ts-ignore
                token.refresh_token = user.refresh_token;
                // @ts-ignore
                token.user = user.user
            }
            return token
        },
        async session({ session, user, token }) {
            if (token) {
                session.access_token = token.access_token;
                session.refresh_token = token.refresh_token;
                session.user = token.user;
            }
            return session
        }
    },

}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }