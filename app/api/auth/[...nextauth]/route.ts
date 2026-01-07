import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "mock-google-id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-google-secret",
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || "mock-facebook-id",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "mock-facebook-secret",
        }),
        CredentialsProvider({
            name: 'Demo Login',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "demo" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Demo user for testing
                if (credentials?.username) {
                    return { id: "1", name: credentials.username, email: `${credentials.username}@example.com`, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async session({ session }) {
            return session
        },
    },
})

export { handler as GET, handler as POST }
