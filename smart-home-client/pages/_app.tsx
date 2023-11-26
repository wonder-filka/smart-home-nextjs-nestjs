import type { AppProps } from "next/app";
import "../styles/globals.scss";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

import { Montserrat, Rubik } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });
const rubik = Rubik({ subsets: ["latin", "cyrillic"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ThemeProvider>
        <style jsx global>{`
          html {
            --montserrat-font: ${montserrat.style.fontFamily};
            --rubik-font: ${rubik.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
