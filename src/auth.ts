import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Google from "next-auth/providers/google"
import Email from "next-auth/providers/email"
import type { Provider } from "next-auth/providers"

const providers: Provider[] = [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
]

// Only add Email provider if EMAIL_SERVER is configured
if (process.env.EMAIL_SERVER) {
    providers.push(
        Email({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        })
    )
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers,
    secret: process.env.AUTH_SECRET,
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id
            return session
        },
    },
})
