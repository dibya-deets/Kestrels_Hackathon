// pages/_app.js
import "@/styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import ChatBot from '@/components/ChatBot';

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
      <ChatBot /> {/* ✅ This makes the chatbot available on every page */}
    </SessionProvider>
  );
}
