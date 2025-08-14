// src/pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// ...your other imports

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const { email, password } = credentials;

        // TODO: your real lookup
        const user = await findUserByEmail(email);
        if (!user) throw new Error("Invalid email or password");

        const ok = await verifyPassword(password, user.passwordHash);
        if (!ok) throw new Error("Invalid email or password");

        // Minimal user object
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],


  pages: {
    signIn: "/sign_in",
    error: "/sign_in",
  },

  // (optional) make errors less verbose in URL
  // theme: { colorScheme: "dark" },
});
