import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
interface IUser {
    _id: string;
    username: string;
    email: string;
    isVerify: boolean;
    type: string;
    role: string;
}
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: IUser
        access_token?: string;
        refresh_token?: string;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        access_token?: string;
        refresh_token?: string;
        user: IUser
    }
}